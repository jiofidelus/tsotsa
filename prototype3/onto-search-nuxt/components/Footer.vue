<template>
  <div class="flex flex-col justify-center h-10 bg-gray-300 ">
    <div class="flex items-center justify-between w-full px-8 mx-auto ">
      <div id="logo" class="text-sm">
        Based on <i>Better food ontology</i>
      </div>

      <div id="links" class="flex gap-4 text-sm font-gray-800">
        <nuxt-link to="/explore" class="text-blue-700 underline">
          Explore ontology
        </nuxt-link>

         <nuxt-link to="/explore" class="text-blue-700 underline">
          Sparql
        </nuxt-link>
        <nuxt-link to="#" class="text-blue-700 underline">
          Learn more
        </nuxt-link>
        <nuxt-link to="#" class="text-blue-700 underline">
          License
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
