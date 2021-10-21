<template>
  <div class="container p-8 mx-auto">
    <div class="flex flex-col items-stretch">
      <h3 class="mb-4 font-semibold text-gray-700">
        Ecrivez votre requete SPARQL
      </h3>
      <textarea
        id="query_sparql"
        v-model="query"
        name="query"
        class="rounded-lg ring-1 ring-gray-300"
        cols="100"
        rows="10"
      />
      <div class="flex justify-end mt-8">
        <button id="execute" class="px-2 py-1 text-sm text-white bg-blue-700 rounded-lg" @click="doRequest">
          Executer
        </button>
      </div>

      <table v-if="result" class="w-full mt-8">
        <thead class="justify-between">
          <tr class="bg-gray-800">
            <th class="px-16 py-2">
              <span class="text-gray-300" />
            </th>
            <th v-for="head of result.head.vars" :key="head" class="w-1/3 px-16 py-2">
              <span class="text-gray-300">{{ head }}</span>
            </th>
          </tr>
        </thead>
        <tbody class="w-full bg-gray-200">
          <tr v-for="(_result, index) of result.results.bindings" :key="index" :class="{'bg-gray-200': index%2==0}" class="bg-white border-4 border-gray-200">
            <td class="flex flex-row items-center px-16 py-2">
              {{ index+1 }}
            </td>
            <td v-for="id of result.head.vars" :key="id" class="w-1/3">
              <nuxt-link :to="`/wiki/${_result[id].value.split('#')[1]}`" class="ml-2 text-center">
                {{ _result[id].value }}
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ingre: <http://www.semanticweb.org/tong/ontologies/2021/4/food#Contient_ingrédient>

    SELECT * WHERE {  ?sub ?pred ?obj .}
    LIMIT 10`,
      result: undefined
    }
  },

  methods: {
    async doRequest () {
      this.result = await this.$axios.$get('/sparql/', { params: { query: this.query } })
      console.log(this.result)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
