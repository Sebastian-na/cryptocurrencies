<template>
  <div class="flex items-center gap-4 justify-between w-full mx-auto">
    <div>
      <div class="flex items-center">
        <span
          aria-hidden="true"
          v-if="tooltip"
          v-tooltip="{ text: tooltip, position: 'right' }"
          class="mr-1 cursor-pointer"
          ><img src="../assets/question-mark.png" alt=""
        /></span>
        <h3>{{ dataName }}:</h3>
      </div>
    </div>
    <h4 class="bg-gray-100 w-fit-content p-3 rounded-xl">
      {{ dataValue }}
    </h4>
  </div>
</template>

<script>
export default {
  name: "PxData",
  props: {
    dataName: String,
    dataValue: String,
    tooltip: {
      type: String,
      default: "",
    },
  },
}
</script>
