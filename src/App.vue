<template>
  <px-header />
  <main class="p-8 lg:p-16 overflow-hidden">
    <router-view />
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader"
export default {
  name: "App",
  components: {
    PxHeader,
  },
}
</script>
