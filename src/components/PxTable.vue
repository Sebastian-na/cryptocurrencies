<template>
  <div class="table min-w-table w-full">
    <div class="table-row bg-gray-50 font-bold">
      <div class="table-cell py-4 px-4">#</div>
      <div class="table-cell py-4">Name</div>
      <div class="table-cell py-4">Price</div>
      <div class="table-cell py-4">
        Market Cap
      </div>
      <div class="table-cell py-4">
        24Hr%
      </div>
    </div>

    <router-link
      v-for="coin in coinsFiltered"
      :key="coin.id"
      :to="{ name: 'Coin', params: { id: coin.id } }"
      class="table-row hover:bg-gray-100 cursor-pointer focus:bg-gray-200 active:bg-gray-200 text-sm"
    >
      <div class="table-cell align-middle p-4">{{ coin.rank }}</div>
      <div class="table-cell align-middle font-semibold">
        <div class="inline-table text-white align-middle text-sm">
          <img
            class="w-6"
            :src="
              `https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
            "
            :alt="coin.name"
          />
        </div>
        <span class="mx-2">{{ capitalizeFirstLetter(coin.id) }}</span>
        <span class="text-gray-400 ">({{ coin.symbol }})</span>
      </div>

      <div class="table-cell align-middle font-semibold">
        {{ format(coin.priceUsd) }}
      </div>
      <div class="table-cell align-middle font-semibold">
        {{ format(coin.marketCapUsd) }}
      </div>

      <div
        class="table-cell align-middle"
        :class="
          coin.changePercent24Hr.includes('-')
            ? 'text-red-400 font-semibold'
            : 'text-green-400 font-semibold'
        "
      >
        {{ parseFloat(coin.changePercent24Hr).toFixed(2) }} %
      </div>
    </router-link>
  </div>
</template>

<script>
import numeral from "numeral"
export default {
  name: "PxTable",
  props: {
    coins: Array,
    filter: String,
  },

  computed: {
    coinsFiltered() {
      return this.coins.filter((coin) =>
        coin.name.toLowerCase().includes(this.filter.toLowerCase())
      )
    },
  },

  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    format(string) {
      return numeral(parseFloat(string)).format("$0,0.00")
    },
  },
}
</script>
