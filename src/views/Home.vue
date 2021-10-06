<template>
  <section
    class="mx-auto flex flex-col lg:items-center lg:justify-center lg:w-fit-content"
  >
    <input
      type="text"
      class="my-10 w-full border-2 border-gray-300 outline-none focus:shadow-md p-2 transition-all"
      placeholder="Search by crypto name"
      v-model="filter"
      @compositionupdate="compositionUpdate($event)"
    />
    <div class="overflow-x-auto">
      <px-table :coins="coins" :filter="filter" />
    </div>

    <px-button :text="'View more'" @click="getCoins" class="my-10" />
  </section>
</template>

<script>
import PxTable from "@/components/PxTable"
import PxButton from "@/components/PxButton"
import { getAssets } from "@/api/index"

export default {
  name: "Home",
  data() {
    return {
      coins: [],
      offset: 0,
      filter: "",
    }
  },
  components: {
    PxTable,
    PxButton,
  },
  methods: {
    async getCoins() {
      const newAssets = await getAssets(100, this.offset)
      this.coins = [...this.coins, ...newAssets]
      this.offset += 100
    },
    compositionUpdate(event) {
      console.log(event)
      this.filter = event.data
    },
  },

  created() {
    this.getCoins()
  },
}
</script>
