<template>
  <div
    class="flex items-center gap-4 justify-center cursor-pointer w-fit-content mx-auto"
  >
    <span class="font-bold">{{ dataName }}:</span>
    <h3 class="bg-gray-100 w-fit-content p-3 rounded-xl">
      {{ dataValue }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "PxData",
  props: {
    dataName: String,
    dataValue: String,
  },
}
</script>
