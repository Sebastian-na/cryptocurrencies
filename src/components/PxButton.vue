<template>
  <button class="bg-gray-900 text-white px-10 py-2 hover:bg-gray-800">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "PxButton",
  props: {
    text: String,
  },
}
</script>
