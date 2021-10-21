<template>
  <div class="flex flex-col h-screen">
    <NavBar :logo="false" />
    <Nuxt class="flex-1 mb-10" />
    <div class="fixed bottom-0 w-full">
      <Footer />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
