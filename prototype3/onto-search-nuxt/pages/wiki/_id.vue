<template>
  <div class="flex flex-wrap gap-8">
    <div id="left-panel" class="flex-col items-stretch hidden w-40 gap-1 p-4 text-sm text-blue-700 md:flex bg-gray-50">
      <div class="font-semibold text-black border-b">
        Camerpedia
      </div>
      <nuxt-link to="#">
        Acceuil
      </nuxt-link>
      <nuxt-link to="#">
        Article aleatoire
      </nuxt-link>
      <nuxt-link to="#">
        Telecharger (PDF)
      </nuxt-link>
      <nuxt-link to="#">
        Nous contacter
      </nuxt-link>
      <div class="mt-4 font-semibold text-black border-b">
        Contribution
      </div>
      <nuxt-link to="#">
        Modifier
      </nuxt-link>
      <nuxt-link to="#">
        Partager
      </nuxt-link>
      <nuxt-link to="#">
        Comment contribuer
      </nuxt-link>
      <nuxt-link to="#">
        Explorer l'ontologie
      </nuxt-link>
    </div>
    <div id="main-content" class="flex flex-col flex-1 gap-4 p-4 ">
      <div>
        <h1 class="text-2xl border-b">
          {{ title }}
        </h1>
        <p class="mt-1 text-xs text-gray-600">
          From Camerpedia, Better Food Ontology
        </p>
        <template v-if="description && description.length">
          <p v-for="(desc, index) of description" :key="index" class="mt-4">
            {{ desc }}
          </p>
        </template>

        <p v-else class="mt-4">
          Aucune description
        </p>
      </div>

      <div v-if="parents && parents.length" class="mt-8">
        <p class="text-2xl border-b">
          Parents
        </p>
        <div v-for="(parent, index) in parents" :key="index" class="mt-4">
          <nuxt-link :to="'/wiki/' + parent.data.split('#')[1]" class="text-lg font-bold tracking-tight text-blue-700">
            {{ parent.dataLabel }}
          </nuxt-link>
          <template v-if="parent.dataDescription && parent.dataDescription.length">
            <p v-for="(desc, _index) in parent.dataDescription" :key="_index" class="mt-1">
              {{ desc }}
            </p>
          </template>
        </div>
      </div>

      <div v-for="(property, index) in properties" :key="index" class="mt-8">
        <div v-for="(value, key) of property" :key="key">
          <div class="w-full border-b">
            <nuxt-link :to="'/wiki/' + key.split('#')[1]" class="w-full text-2xl text-blue-700 capitalize">
              {{ value[0].linkLabel || key.split('#')[1] }}
            </nuxt-link>
          </div>

          <div v-for="(parent, index) in value" :key="index" class="mt-4">
            <nuxt-link :to="'/wiki/' + parent.data.split('#')[1]" class="text-lg font-bold tracking-tight text-blue-700">
              {{ parent.dataLabel }}
            </nuxt-link>
            <template v-if="parent.dataDescription && parent.dataDescription.length">
              <p v-for="(desc, _index) in parent.dataDescription" :key="_index" class="mt-1">
                {{ desc }}
              </p>
            </template>
          </div>
        </div>
      </div>

      <div v-if="false">
        <div v-for="(value, key) of objectData" :key="key" class="mt-8">
          <div class="w-full border-b">
            <nuxt-link :to="'/wiki/' + key.split('#')[1]" class="w-full text-2xl text-blue-700 capitalize">
              {{ value[0].linkLabel || key.split('#')[1] }}
            </nuxt-link>
          </div>

          <div v-for="(parent, _index) in value" :key="_index" class="mt-4">
            <nuxt-link :to="'/wiki/' + parent.data.split('#')[1]" class="text-lg font-bold tracking-tight text-blue-700">
              {{ parent.dataLabel }}
            </nuxt-link>
            <template v-if="parent.dataDescription && parent.dataDescription.length">
              <p v-for="(desc, __index) in parent.dataDescription" :key="__index" class="mt-1">
                {{ desc }}
              </p>
            </template>
          </div>
        </div>
      </div>

      <div v-if="derivatives && derivatives.length" class="mt-8">
        <p class="text-2xl border-b">
          Dérivées a partir de {{ title }}
        </p>
        <div v-for="(derivative, index) in derivatives" :key="index" class="mt-4">
          <nuxt-link :to="'/wiki/' + derivative.data.split('#')[1]" class="text-lg font-bold tracking-tight text-blue-700">
            {{ derivative.dataLabel }}
          </nuxt-link>
          <template v-if="derivative.dataDescription && derivative.dataDescription.length">
            <p v-for="(desc, _index) in derivative.dataDescription" :key="_index" class="mt-1">
              {{ desc }}
            </p>
          </template>
        </div>
      </div>

      <div v-if="instances && instances.length" class="mt-8">
        <p class="text-2xl border-b">
          Exemples de {{ title }}
        </p>
        <div v-for="(instance, index) in instances" :key="index" class="mt-4">
          <nuxt-link :to="'/wiki/' + instance.data.split('#')[1]" class="text-lg font-bold tracking-tight text-blue-700">
            {{ instance.dataLabel }}
          </nuxt-link>
          <template v-if="instance.dataDescription && instance.dataDescription.length">
            <p v-for="(desc, _index) in instance.dataDescription" :key="_index" class="mt-1">
              {{ desc }}
            </p>
          </template>
        </div>
      </div>
    </div>
    <div id="right-panel" class="max-w-screen-sm pt-8 md:w-[30rem] w-full p-2">
      <p class="text-lg">
        Images
      </p>

      <template v-if="images && images.length">
        <div v-for="(image, index) in images" :key="index" class="mt-4">
          <img :src="image" alt="" class="object-fill">
          <legend class="mt-1 text-xs text-gray-600">
            Une image de {{ title }}
          </legend>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {

  async asyncData ({ $axios, route }) {
    return {
      wiki: await $axios.$get('/wiki/' + route.params.id)
    }
  },
  data () {
    return {
      wiki: undefined
    }
  },
  head () {
    return { title: this.title + ' - ' + 'Camerpedia' }
  },

  computed: {
    reserved () {
      return [
        'http://www.w3.org/2000/01/rdf-schema#label',
        'http://www.w3.org/2000/01/rdf-schema#comment',
        'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image',
        'http://www.w3.org/2000/01/rdf-schema#subClassOf',
        'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
      ]
    },
    title () {
      const label = this.wiki.response.objectProperty['http://www.w3.org/2000/01/rdf-schema#label']
      return label ? label['0'].dataLabel : this.wiki.id
    },
    description () {
      return this.wiki.response.objectProperty['http://www.w3.org/2000/01/rdf-schema#comment']?.map(x => x.dataLabel)
    },
    images () {
      return this.wiki.response.objectProperty['http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image']?.map(x => x.dataLabel)
    },
    parents () {
      return this.wiki.response.objectProperty['http://www.w3.org/2000/01/rdf-schema#subClassOf'] ?? this.wiki.response.objectProperty['http://www.w3.org/1999/02/22-rdf-syntax-ns#type']
    },
    instances () {
      return this.wiki.response.objectData['http://www.w3.org/1999/02/22-rdf-syntax-ns#type']
    },
    derivatives () {
      return this.wiki.response.objectData['http://www.w3.org/2000/01/rdf-schema#subClassOf']
    },
    properties () {
      return Object.keys(this.wiki.response.objectProperty)
        .filter(key => !this.reserved.includes(key))
        .map((key) => {
          const data = {}
          data[key] = this.wiki.response.objectProperty[key]
          return data
        })
    },
    objectData () {
      return this.wiki.response.objectData
    }
  },
  mounted () {
    console.log(this.wiki.response)
  },
  methods: {
    async getWiki () {
      this.wiki = await this.$axios.$get('/wiki/' + this.$route.params.id)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
