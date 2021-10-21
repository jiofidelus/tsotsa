<template>
  <div class="flex flex-col mt-8">
    <nuxt-link :to="`/wiki/${result.key.split('#')[1]}`" class="text-xl font-medium text-blue-600 capitalize">
      {{ label }}
    </nuxt-link>
    <p class="text-xs text-gray-400">
      {{ result.key }}
    </p>
    <p
      class="max-w-xl mt-1 text-base text-gray-800"
      style="display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;"
    >
      {{ comment }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    label () {
      return this.result.value.find(x => x.link === 'http://www.w3.org/2000/01/rdf-schema#label')?.data ?? this.result.key.split('#')[1]
    },
    comment () {
      return this.result.value.find(x => x.link === 'http://www.w3.org/2000/01/rdf-schema#comment')?.data ?? 'Aucune description'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
