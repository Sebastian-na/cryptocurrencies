<template>
  <section>
    <div>
      <div class="flex gap-4 mx-auto items-center justify-center">
        <img class="w-16 h-16" :src="imgSrc" :alt="coin.name" />
        <h1 class="font-bold text-4xl text-center">
          {{ coin.name }}
          <span class="font-normal text-gray-600">({{ coin.symbol }})</span>
        </h1>
      </div>
    </div>
    <hr class="my-4" />
    <div>
      <div>
        <h4 class="text-sm mb-4">{{ convertUnixToDate(Date.now(), true) }}</h4>
        <div
          class="grid grid-cols-1 gap-y-4 gap-x-12 justify-center sm:grid-cols-2 lg:grid-cols-3"
        >
          <px-data
            dataName="Rank"
            :dataValue="coin.rank"
            tooltip="this number is directly associated with the marketcap whereas the highest marketcap receives rank 1"
          />
          <px-data
            dataName="Price"
            :dataValue="formatPriceWithLetter(coin.priceUsd)"
            tooltip="
              Volume-weighted price based on real-time market data, translated to USD
            "
          />
          <px-data
            dataName="Supply"
            :dataValue="formatPriceWithLetter(coin.supply)"
            tooltip="Available supply for trading"
          />
          <px-data
            dataName="Market cap"
            :dataValue="formatPriceWithLetter(coin.marketCapUsd)"
            tooltip="Supply x price"
          />
          <px-data
            dataName="Trading volume"
            :dataValue="formatPriceWithLetter(coin.volumeUsd24Hr)"
            tooltip="Quantity of trading volume represented in USD over the last 24 hours"
          />
          <px-data
            dataName="Change percent 24 hr"
            :dataValue="parseFloat(coin.changePercent24Hr).toFixed(2) + '%'"
            tooltip="The direction and value change in the last 24 hours"
          />
        </div>
      </div>
      <h2 class="font-bold text-2xl mt-10">
        History
        <span class="font-normal text-gray-600 text-xl">{{
          mode === "day" ? "(last 24 hours)" : "(last year)"
        }}</span>
      </h2>
      <form @change="modeChanged($event)" class="flex gap-4">
        <div class="flex gap-1 items-center">
          <input type="radio" id="dayMode" name="modeOption" checked />
          <label for="dayMode">Day</label>
        </div>
        <div class="flex gap-1 items-center">
          <input type="radio" id="yearMode" name="modeOption" />
          <label for="yearMode">Year</label>
        </div>
      </form>

      <line-chart
        v-if="mode === 'year'"
        class="mt-4"
        :data="yearHistory"
        prefix="$"
        :min="getMinRounded(yearHistory)"
        :max="getMaxRounded(yearHistory)"
        :colors="colors(yearHistory)"
        :round="2"
        :zeros="false"
        thousands=","
        :discrete="true"
        :library="{
          elements: { point: { radius: '0' } },
          animation: createProgressiveLineAnimation(dayHistory),
          plugins: {
            legend: false,
          },
          scales: {
            x: {
              type: 'linear',
            },
          },
        }"
      />
      <line-chart
        v-else
        class="mt-4"
        :data="dayHistory"
        prefix="$"
        :colors="colors(dayHistory)"
        :round="2"
        :min="getMinRounded(dayHistory)"
        :max="getMaxRounded(dayHistory)"
        :zeros="false"
        thousands=","
        :discrete="true"
        :library="{
          elements: { point: { radius: '0' } },
          animation: createProgressiveLineAnimation(dayHistory),
          plugins: {
            legend: false,
          },
          scales: {
            x: {
              duration: 5000,
              from: 0,
            },
            y: {
              duration: 3000,
              from: 500,
            },
          },
        }"
      />

      <h2 class="font-bold text-2xl mt-10">
        Main markets
      </h2>
      <div class="overflow-x-auto">
        <px-markets-table :markets="markets" class="mt-4" />
      </div>
    </div>
  </section>
</template>

<script>
import { getAsset, getAssetHistory, getMarkets } from "@/api/index"
import { createProgressiveLineAnimation } from "@/utils/chartsAnimations.js"

import numeral from "numeral"
import PxData from "@/components/PxData"
import PxMarketsTable from "@/components/PxMarketsTable"
export default {
  name: "Coin",
  data() {
    return {
      coin: {},
      yearHistory: {},
      markets: {},
      isLoading: false,
      mode: "day",
      imgSrc: "",
    }
  },
  components: {
    PxData,
    PxMarketsTable,
  },

  methods: {
    async getCoin() {
      this.isLoading = true
      const id = this.$route.params.id
      let [coin, yearHistory, dayHistory, markets] = await Promise.all([
        getAsset(id),
        getAssetHistory(id, 365, "d1"),
        getAssetHistory(id, 1, "h1"),
        getMarkets(id),
      ])
      this.coin = coin
      this.imgSrc = `https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
      this.markets = markets
      console.log(markets)
      this.yearHistory = yearHistory.reduce((acum, item) => {
        acum[this.convertUnixToDate(item.time)] = parseFloat(
          item.priceUsd
        ).toFixed(2)
        return acum
      }, {})
      this.dayHistory = dayHistory.reduce((acum, item) => {
        acum[this.convertUnixToHour(item.time)] = parseFloat(
          item.priceUsd
        ).toFixed(2)
        return acum
      }, {})
    },
    createProgressiveLineAnimation(data) {
      return createProgressiveLineAnimation(data)
    },
    modeChanged(e) {
      if (e.target.id === "yearMode") {
        this.mode = "year"
      } else {
        this.mode = "day"
      }
    },
    convertUnixToDate(unixTimestamp, string) {
      const date = new Date(unixTimestamp)
      if (string) {
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })
      }
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const formatted = `${year}-${month}-${day}`
      return formatted
    },
    convertUnixToHour(unixTimestamp) {
      const date = new Date(unixTimestamp)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const formatted = `${hours}:${minutes}0`
      return formatted
    },
    formatPriceWithLetter(price) {
      return numeral(parseFloat(price)).format("$0a.00")
    },
    colors(history) {
      const values = Object.values(history)
      if (parseFloat(values[values.length - 1]) < parseFloat(values[0]))
        return ["#f52011", "#666"]
      return ["#1edb0d", "#666"]
    },
    getMinRounded(history) {
      const min = Math.min(...Object.values(history).map((n) => parseInt(n)))
      const lenght = min.toString().length
      let divider = 1
      for (let i = 1; i < lenght; i++) {
        divider *= 10
      }
      return Math.floor(min / divider) * divider - 1
    },
    getMaxRounded(history) {
      const max = Math.max(...Object.values(history).map((n) => parseInt(n)))
      const lenght = max.toString().length
      let divider = 1
      for (let i = 1; i < lenght; i++) {
        divider *= 10
      }
      return Math.ceil(max / divider) * divider + 1
    },
  },
  created() {
    this.getCoin()
  },
}
</script>
