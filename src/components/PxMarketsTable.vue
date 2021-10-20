<template>
  <div class="table min-w-table w-full">
    <div class="table-row bg-gray-50 font-bold">
      <div class="table-cell py-4 px-4">#</div>
      <div class="table-cell py-4">Source</div>
      <div class="table-cell py-4">Pairs</div>
      <div class="table-cell py-4">Price</div>
      <div class="table-cell py-4">
        Volume
      </div>
      <div class="table-cell py-4">
        Volume %
      </div>
    </div>

    <div
      v-for="(market, index) in markets"
      :key="market.exchangeId"
      class="table-row hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-200 text-sm"
    >
      <div class="table-cell align-middle p-4">{{ index + 1 }}</div>
      <div class="table-cell align-middle font-semibold">
        {{ capitalizeFirstLetter(market.exchangeId) }}
      </div>
      <div class="table-cell align-middle font-semibold text-blue-700">
        {{ market.baseSymbol }} / {{ market.quoteSymbol }}
      </div>
      <div class="table-cell align-middle font-semibold">
        {{ format(market.priceUsd) }}
      </div>
      <div class="table-cell align-middle font-semibold">
        {{ format(market.volumeUsd24Hr) }}
      </div>

      <div class="table-cell align-middle">
        {{ parseFloat(market.volumePercent).toFixed(2) }} %
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral"
export default {
  name: "PxMarketsTable",
  props: {
    markets: Array,
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
