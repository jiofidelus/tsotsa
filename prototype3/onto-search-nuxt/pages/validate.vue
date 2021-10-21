<template>
  <div>
    <h2 class="my-2 text-3xl font-bold tracking-wide text-center text-gray-800 uppercase">
      Validation
    </h2>

    <div v-show="message" class="container p-4 mx-auto mt-4 font-bold text-center bg-blue-600">
      {{ message }}
    </div>
    <div class="flex items-center justify-center ">
      <div class="col-span-12">
        <div class="overflow-auto lg:overflow-visible ">
          <table class="table space-y-6 text-sm text-gray-400 border-separate">
            <thead class="text-gray-500 bg-gray-800">
              <tr>
                <th class="p-3">
                  Numero
                </th>
                <th class="p-3 text-left">
                  Subject
                </th>
                <th class="p-3 text-left">
                  Predicate
                </th>
                <th class="p-3 text-left">
                  Object
                </th>
                <th class="p-3 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fact, index) of facts" :key="index" class="bg-gray-800">
                <td class="p-3">
                  <div class="flex align-items-center">
                    <span>{{ index + 1 }}</span>
                  </div>
                </td>
                <td class="p-3">
                  {{ fact.subject.split('#')[1] }}
                </td>
                <td class="p-3 font-bold">
                  {{ fact.property.split('#')[1] }}
                </td>
                <td class="p-3">
                  {{ fact.object }}
                </td>
                <td class="p-3 ">
                  <button class="p-2 text-xs text-white bg-red-600 rounded-lg" @click="deleteFact(index)">
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-center mt-4">
            <button v-if="!loading" class="p-4 font-bold text-gray-200 bg-blue-800 rounded-lg " @click="validateFacts">
              Valider les faits et indexer
            </button>
            <i v-else class="text-4xl text-blue-800 fa fa-spinner animate-spin" aria-hidden="true" />
          </div>

          <div class="flex justify-center mt-4">
            <button v-if="!loading" class="p-4 font-bold text-gray-200 bg-blue-800 rounded-lg " @click="reindex">
              Refaire la base d'indexe
            </button>
            <i v-else class="text-4xl text-blue-800 fa fa-spinner animate-spin" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  async asyncData ({ $axios }) {
    return { facts: await $axios.$get('facts') }
  },
  data () {
    return {
      facts: [],
      loading: false,
      message: null
    }
  },

  methods: {
    async deleteFact (id) {
      this.message = null
      this.loading = true
      await this.$axios.$delete('/facts/' + id)
      this.facts = await this.$axios.$get('/facts/')
      this.loading = false
      this.message = 'Fact deleted successfully'
    },

    async validateFacts () {
      this.message = null
      this.loading = true
      this.message = await this.$axios.$get('/facts/validate')
      this.facts = await this.$axios.$get('/facts/')

      this.loading = false
    },

    async reindex () {
      this.message = null
      this.loading = true

      this.message = await this.$axios.$get('/re-index/')

      this.loading = false
    }
  }
}
</script>

<style lang="css" scoped>
.table {
    border-spacing: 0 15px;
  }

  i {
    font-size: 1rem !important;
  }

  .table tr {
    border-radius: 20px;
  }

  tr td:nth-child(n+5),
  tr th:nth-child(n+5) {
    border-radius: 0 .625rem .625rem 0;
  }

  tr td:nth-child(1),
  tr th:nth-child(1) {
    border-radius: .625rem 0 0 .625rem;
  }
</style>
