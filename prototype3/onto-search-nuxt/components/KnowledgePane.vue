<template>
  <div class="flex-1 max-w-lg mt-4 rounded-lg ring-1 ring-gray-200">
    <div v-if="boite.detail && boite.detail['http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image']" class="flex mt-2">
      <div class="flex flex-col flex-wrap ">
        <img
          :src="boite.detail['http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image'][0].subject.value"

          class="object-cover w-full h-72"
        >
      </div>
    </div>
    <div class="p-4">
      <p class="mb-4 text-4xl font-bold text-blue">
        {{ boite.subject }}
      </p>

      <template v-if="boite.detail">
        <div v-for="([key, value]) in Object.entries(boite.detail)" :key="key">
          <div v-if="key==='http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image'" />
          <div v-else-if="key==='http://www.w3.org/2000/01/rdf-schema#comment'" class="flex mt-2">
            <div class="flex flex-col flex-wrap ">
              <p
                v-for="element in value"
                :key="element.subject.value"
                class="text-sm"
              >
                {{ element.subject.value }}
              </p>
            </div>
          </div>
          <div v-else-if="key==='http://www.w3.org/2000/01/rdf-schema#subClassOf'" class="flex mt-2">
            <p class="font-medium">
              Famille :
            </p>
            <div class="flex flex-wrap flex-1 text-blue-700">
              <nuxt-link
                v-for="element in value"
                :key="element.label.value"
                class="ml-2 hover:underline"
                :to="`/search/?query=${element.label.value}`"
              >
                {{ element.label.value }}
              </nuxt-link>
            </div>
          </div>

          <div v-else-if="key==='http://www.w3.org/1999/02/22-rdf-syntax-ns#type'" class="flex mt-2">
            <p class="font-medium">
              Type :
            </p>
            <div class="flex flex-wrap text-blue-700">
              <nuxt-link
                v-for="element in value"
                :key="element.label.value"
                class="ml-2 hover:underline"
                :to="`/search/?query=${element.label.value}`"
              >
                {{ element.label.value }}
              </nuxt-link>
            </div>
          </div>

          <div v-else-if="key==='http://www.w3.org/2000/01/rdf-schema#label'" class="flex mt-2">
            <p class="font-medium">
              Dénomination :
            </p>
            <div class="flex flex-wrap ">
              <p
                v-for="element in value"
                :key="element.subject.value"
                class="ml-2 "
              >
                {{ element.subject.value }}
                <sup class="text-blue-700">{{ element.subject['xml:lang'] }}</sup>
              </p>
            </div>
          </div>

          <div v-else class="flex mt-2">
            <p v-if="value[0].linkLabel" class="font-medium capitalize">
              {{ value[0].linkLabel.value }} :
            </p>
            <p v-else class="font-medium capitalize">
              {{ value[0].link.value.split('#')[1] }}
            </p>
            <div class="flex flex-wrap text-blue-700">
              <nuxt-link
                v-for="element in value"
                :key="element.label.value"
                class="ml-2 hover:underline"
                :to="`/search/?query=${element.label.value}`"
              >
                {{ element.label.value }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </template>

      <template v-if="boite.relations">
        <hr>

        <div v-for="([key, value], index) in Object.entries(boite.relations)" :key="index">
          <div v-if="key==='http://www.w3.org/1999/02/22-rdf-syntax-ns#type'" class="flex flex-col mt-2">
            <p class="font-medium">
              Examples :
            </p>
            <div class="flex flex-wrap text-blue-700">
              <nuxt-link
                v-for="(element, _index) in value"
                :key="_index"
                class="ml-2 hover:underline"
                :to="`/search/?query=${element.label.value}`"
              >
                {{ element.label.value }}
              </nuxt-link>
            </div>
          </div>

          <div v-else-if="key==='http://www.w3.org/2000/01/rdf-schema#subClassOf'" class="flex flex-col mt-2">
            <p class="font-medium">
              Dans la meme famille :
            </p>
            <div class="flex flex-wrap">
              <nuxt-link
                v-for="(element, _index) in value"
                :key="_index"
                class="p-1 px-2 mt-2 ml-2 text-center transition-colors bg-gray-300 rounded-full hover:bg-blue-400"
                :to="`/search/?query=${element.label.value}`"
              >
                {{ element.label.value }}
              </nuxt-link>
            </div>
          </div>

          <div v-else class="flex mt-2">
            <p v-if="value.linkLabel" class="font-medium capitalize">
              {{ value.linkLabel.value }}
            </p>
            <p v-else class="font-medium capitalize">
              {{ value.link.value }}
            </p>
            <div class="flex flex-wrap text-blue-700">
              <nuxt-link
                v-for="(element, _index) in value"
                :key="_index"
                class="ml-2 hover:underline"
                :to="`/search/?query=${element.label}`"
              >
                {{ element.label.value }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boite: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
