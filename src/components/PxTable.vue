<template>
  <div class="table min-w-table">
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
      <div class="table-cellr align-middle p-4">{{ coin.rank }}</div>
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
import { formatter } from "../utils/usdFormatter"
export default {
  name: "PxTable",
  props: {
    coins: Array,
    filter: String,
  },

  computed: {
    coinsFiltered() {
      return this.coins.filter((coin) =>
        coin.name.toLowerCase().includes(this.filter)
      )
    },
  },

  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    format(string) {
      return formatter.format(parseFloat(string))
    },
  },
}
</script>

<style scoped>
td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
