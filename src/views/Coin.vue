<template>
  <div>
    <h1>{{ coin.name }}</h1>
    <img class="w-12" :src="imgSrc" :alt="coin.name" />
    <area-chart
      :data="history"
      prefix="$"
      :min="null"
      :max="null"
      :colors="colors"
      :round="2"
      :zeros="false"
      xtitle="Time"
      ytitle="Price"
      thousands=","
      :discrete="true"
      :library="{ elements: { point: { radius: '1' } } }"
    ></area-chart>
  </div>
</template>

<script>
import { getAsset, getAssetHistory, getMarkets } from "@/api/index"
export default {
  name: "Coin",
  data() {
    return {
      coin: {},
      history: {},
      markets: {},
      isLoading: false,
      mode: "hours",
      imgSrc: "",
    }
  },

  methods: {
    async getCoin() {
      this.isLoading = true
      const id = this.$route.params.id
      let [coin, history, markets] = await Promise.all([
        getAsset(id),
        getAssetHistory(id, 365, "d1"),
        getMarkets(id),
      ])
      this.coin = coin
      this.imgSrc = `https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
      this.markets = markets
      this.history = history.reduce((acum, item) => {
        acum[this.convertUnixToDate(item.time)] = parseFloat(
          item.priceUsd
        ).toFixed(2)
        return acum
      }, {})
    },
    convertUnixToDate(unixTimestamp) {
      const date = new Date(unixTimestamp)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const formatted = `${year}-${month}-${day}`
      return formatted
    },
  },
  computed: {
    colors() {
      const values = Object.values(this.history)
      if (parseFloat(values[values.length - 1]) < parseFloat(values[0]))
        return ["#f52011", "#666"]
      return ["#1edb0d", "#666"]
    },
  },
  created() {
    this.getCoin()
  },
}
</script>
