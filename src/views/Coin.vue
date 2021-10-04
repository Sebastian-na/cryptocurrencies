<template>
  <div>
    <line-chart :data="dayHistory"></line-chart>
  </div>
</template>

<script>
import { getAsset, getAssetHistory, getMarkets } from "@/api/index"
export default {
  name: "Coin",
  data() {
    return {
      coin: {},
      dayHistory: null,
      yearHistory: {},
      markets: {},
      isLoading: false,
      mode: "hours",
    }
  },

  methods: {
    async getCoin() {
      this.isLoading = true
      const id = this.$route.params.id
      let [coin, dayHistory, yearHistory, markets] = await Promise.all([
        getAsset(id),
        getAssetHistory(id, 1, "h1"),
        getAssetHistory(id, 365, "d1"),
        getMarkets(id),
      ])
      // 2017 - 05 - 13
      this.coin = coin
      console.log(dayHistory)

      this.dayHistory = dayHistory.reduce((acum, item) => {
        acum[item.time] = parseFloat(item.priceUsd).toFixed(2)
        return acum
      }, {})
      this.dayHistory = {}
      this.yearHistory = yearHistory
      this.markets = markets
    },
  },
  created() {
    this.getCoin()
  },
  convertUnixToDate(unixTimestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unixTimestamp * 1000)
    // Hours part from the timestamp
    const hours = date.getHours()
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes()
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds()

    // Will display time in 10-30-23 format
    const formattedTime =
      hours + "-" + minutes.substr(-2) + "-" + seconds.substr(-2)

    return formattedTime
  },
}
</script>
