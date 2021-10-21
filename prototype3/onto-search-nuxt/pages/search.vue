<template>
  <div>
    <div v-if="searching" class="flex flex-col items-center justify-center max-w-7xl">
      <i class="mt-8 text-4xl text-blue-700 fa fa-spinner animate-spin" aria-hidden="true" />
      <p class="text-sm text-gray-600">
        Veuillez patienter, Nous cherchons des resultats pertinents
      </p>
    </div>
    <!--Body Content-->
    <div v-if="results" class="flex flex-col-reverse flex-1 w-full px-8 pb-8 md:flex-row">
      <!--Result Pane-->
      <div class=" md:w-1/2 lg:w-3/5 md:pr-12">
        <!--Actual Result Content-->
        <div class="flex flex-col py-4 lg:ml-32">
          <!--Result summary-->
          <div class="text-sm text-gray-600">
            {{ results.count }} resultats trouvés en {{ results.time }}ms
          </div>

          <!--Results-->
          <div class="">
            <!--Result 1-->
            <ResultItem v-for="(value, key) in results.documents" :key="key" :result="{key, value}" />
          </div>
        </div>

        <!--Results suggestion-->
        <div class="mt-8 lg:ml-32">
          <p class="text-2xl">
            Ceci peut vous intérreser
          </p>
          <div class="w-full h-px my-4 bg-gray-300" />
          <div class="flex flex-wrap">
            <!--Suggestion-->
            <div class="w-1/2 mt-2">
              <div class="w-5/6 px-6 py-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-400">
                Tomate
              </div>
            </div>

            <!--Suggestion-->
            <div class="w-1/2 mt-2">
              <div class="w-5/6 px-6 py-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-400">
                Maïs
              </div>
            </div>

            <!--Suggestion-->
            <div class="w-1/2 mt-2">
              <div class="w-5/6 px-6 py-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-400">
                Farine
              </div>
            </div>

            <!--Suggestion-->
            <div class="w-1/2 mt-2">
              <div class="w-5/6 px-6 py-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-400">
                Blé
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Knowledge Pane-->
      <KnowledgePane v-if="results.boite" :boite="results.boite" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ route, redirect, $axios }) {
    if (!route.query.query?.trim()) {
      redirect({
        path: '/'
      })
    }

    return {
      query: route.query.query,
      results: await $axios.$get(`/search/?query=${route.query.query}`)
    }
  },

  data () {
    return {
      query: '',
      results: undefined,
      searching: false
    }
  },
  head (ctx) {
    return {
      title: `${ctx.$route.query.query ?? ''} - Camerpedia Search`
    }
  },
  watch: {
    '$route.query' (query) {
      this.query = query.query
      this.doSearch()
    }
  },
  methods: {
    async doSearch () {
      this.results = null
      this.searching = true
      this.results = await this.$axios.$get(`/search/?query=${this.$route.query.query}`)
      console.log(this.results.documents)
      this.searching = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
