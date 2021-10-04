<template>
  <header
    class=" flex justify-between items-center text-white px-9 py-3 bg-gray-900 "
  >
    <router-link to="/">
      <img class="w-12" alt="Vue logo" src="../assets/logo.png"
    /></router-link>

    <nav>
      <ul>
        <li>
          <router-link class="hover:text-gray-300" to="/about"
            >About</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PxHeader",
}
</script>
<style scoped>
img {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
    brightness(102%) contrast(102%);
}
</style>
