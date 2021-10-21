<template>
  <div>
    <div class="container flex flex-col px-8 mx-auto mt-8 lg:flex-row items">
      <div class="flex flex-row flex-1 max-w-5xl bg-white rounded-lg ring-1 ring-gray-200">
        <div class="hidden w-2/5 overflow-hidden bg-center bg-cover md:block" style="background-image: url('https://i.ibb.co/L5fvcfn/pixiz-15-06-2021-12-17-26.jpg');" />
        <div class="flex flex-col flex-1 ">
          <div class="flex justify-center pt-4 text-base font-bold tracking-wide text-center text-blue-700 lg:text-lg">
            <div class="flex-1 mx-4 tab-inner">
              <button
                id="defaultOpen"
                :class="{'border-b-2 border-blue-400': tab==='triplet'}"
                class="pb-4 tablinks focus:outline-none"
                @click="tab='triplet'"
              >
                Nouveau Triplet
              </button>
            </div>
            <div class="flex-1 mx-4 border-none tab-inner">
              <button :class="{'border-b-2 border-blue-400': tab==='object'}" class="pb-4 tablinks focus:outline-none" @click="tab='object'">
                Nouvel objet
              </button>
            </div>

            <div class="flex-1 mx-4 tab-inner">
              <button :class="{'border-b-2 border-blue-400': tab==='fact'}" class="pb-4 tablinks focus:outline-none" @click="tab='fact'">
                Nouveau fait
              </button>
            </div>
          </div>

          <div class="flex-1 p-8">
            <div v-show="tab==='triplet'" class="form-detail" action="#" method="post">
              <div id="triplet" class="tabcontent">
                <label for="sujet">
                  Selectionner le sujet
                  <select
                    id="URI"
                    v-model="selectedObject"
                    type=""
                    name="sujet"
                    class="w-full p-2 text-black bg-white rounded shadow appearance-none focus:outline-none ring-1 ring-gray-200 input-text bg-purple-white"
                    placeholder="Predicat"
                    required
                  >
                    <option v-for="cl of classes" :key="cl.class" :value="cl.class">{{ cl.label }}</option>
                    <option v-for="cl of instances" :key="cl.instance" :value="cl.instance">{{ cl.label }}</option>
                  </select>
                </label>

                <div v-show="details">
                  <div v-for="(detail, index) in details" :key="index" class="mt-4">
                    <p class="px-1 font-semibold bg-white">
                      {{ getRelationName(detail) }}
                    </p>

                    <div v-if="updateIndex === index" class="w-full">
                      <textarea v-if="!detail.isObject" v-model="updatedObject" class="w-full ring-1 ring-gray-300" cols="30" rows="5" />
                      <select
                        v-if="detail.isObject && addRange"
                        v-model="updatedObject"
                        class="p-2 mt-2 text-black bg-white rounded shadow appearance-none focus:outline-none ring-1 ring-gray-200 input-text bg-purple-white"
                      >
                        <option v-for="cl of addRange" :key="cl.id" :value="cl.id">
                          {{ cl.label }}
                        </option>
                      </select>
                    </div>
                    <div v-else>
                      <p v-if="!detail.isObject" class="px-1 text-sm text-gray-700">
                        {{ detail.target.label }}
                      </p>

                      <a v-else target="_blank" :href="`/wiki/${detail.target.id.split('#')[1]}`" class="px-1 text-sm text-blue-600">
                        {{ detail.target.label }}
                      </a>
                    </div>

                    <div class="flex justify-end w-full">
                      <div v-if="updateIndex != index">
                        <button class="p-1 px-2 text-xs text-white bg-blue-700 rounded-lg" @click.prevent.stop="openUpdate(index, detail)">
                          Mettre a jour
                        </button><button class="p-1 px-2 ml-1 text-xs text-white bg-red-700 rounded-lg" @click.prevent.stop="doDelete(detail)">
                          Supprimer
                        </button>
                      </div>

                      <div v-else>
                        <button class="p-1 px-2 text-xs text-white bg-red-700 rounded-lg" @click.prevent.stop="updateIndex=-1">
                          Annuler
                        </button>

                        <button class="p-1 px-2 ml-1 text-xs text-white bg-blue-600 rounded-lg" @click.prevent.stop="doUpdate(detail)">
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="addProperty" class="relative flex flex-col p-4 mt-4 border-2 border-gray-300 rounded-lg">
                  <p class="absolute px-1 text-sm text-gray-500 bg-white -top-3">
                    Nouvelle propriétés
                  </p>
                  <select
                    id="URI"
                    v-model="newProperty"
                    type=""
                    name="URI"
                    placeholder="Predicat"
                    class="p-2 text-black bg-white rounded shadow appearance-none focus:outline-none ring-1 ring-gray-200 input-text bg-purple-white"
                    required
                  >
                    <option v-for="(item, id) in domain" :key="id" :value="item">
                      {{ item.label }}
                    </option>
                  </select>
                  <textarea
                    v-if="newProperty&& !newProperty.isObjectProperty"
                    id="URI"
                    v-model="newTarget"
                    type="text"
                    name="URI"
                    placeholder="Entrez la valeur"
                    class="p-2 mt-2 rounded shadow ring-1 ring-gray-200 input-text bg-purple-white"
                    required
                  />

                  <select
                    v-if="newProperty && newProperty.isObjectProperty && addRange"
                    v-model="newTarget"
                    class="p-2 mt-2 text-black bg-white rounded shadow appearance-none focus:outline-none ring-1 ring-gray-200 input-text bg-purple-white"
                  >
                    <option v-for="cl of addRange" :key="cl.id" :value="cl.id">
                      {{ cl.label }}
                    </option>
                  </select>
                  <div class="flex w-full mt-4 flex-end">
                    <button class="px-2 py-1 text-sm text-white bg-blue-700 rounded-lg" @click.prevent.stop="doInsert">
                      Sauvegarder
                    </button>
                    <button class="px-2 py-1 ml-2 text-sm text-white bg-red-700 rounded-lg" @click.prevent.stop="cancelAddition">
                      Annuler
                    </button>
                  </div>
                </div>

                <div v-if="details" class="flex justify-end mt-8 text-white">
                  <button v-if="!newProperty" class="p-2 ml-2 text-sm bg-blue-500 rounded-lg" @click.prevent.stop="addDataProperty()">
                    Nouvelle proprietés
                  </button>
                </div>
              </div>
            </div>

            <div v-show="tab==='object'" class="form-detail" action="#" method="post">
              <div id="Ajouter" class="tabcontent">
                <div class="mt-1 form-row">
                  <label class="flex flex-col form-row-inner">
                    <span class="label">Label (Denomination) <sup class="text-red-500">*</sup></span>
                    <input
                      id="URI"
                      v-model="newObject.label"
                      type="text"
                      name="URI"
                      class="p-3 rounded shadow ring-1 ring-gray-200 input-text bg-purple-white"
                      required
                    >

                  </label>
                </div>

                <div class="mt-1 form-row">
                  <label class="flex flex-col form-row-inner">
                    <span class="label">Description <sup class="text-red-500">*</sup></span>
                    <textarea
                      id="URI"
                      v-model="newObject.comment"
                      type="text"
                      name="URI"
                      class="p-3 rounded shadow ring-1 ring-gray-200 input-text bg-purple-white"
                      required
                    />

                  </label>
                </div>

                <div class="mt-2">
                  <label for="sujet">
                    Selectionner le type de l'objet
                    <select
                      id="URI"
                      v-model="newObject.type"
                      type=""
                      name="sujet"
                      class="w-full p-2 text-black bg-white rounded shadow appearance-none focus:outline-none ring-1 ring-gray-200 input-text bg-purple-white"
                      placeholder="Predicat"
                      required
                    >
                      <option v-for="cl of classes" :key="cl.class" :value="cl.class">{{ cl.label }}</option>

                    </select>
                  </label>
                </div>

                <div class="mt-8 form-row-last">
                  <button name="Ajouter" class="p-4 px-8 text-blue-700 bg-gray-300 rounded-lg register" @click="insertObject">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            <div v-show="tab=='fact'">
              <p class="my-1">Entrez un nouveau fait</p>
              <input type="text" class="w-full p-2 rounded-lg ring-1 ring-gray-300">
            </div>
          </div>
        </div>
      </div>

      <div class="self-stretch p-8 mt-12 lg:ml-8 lg:w-96 lg:mt-0 ring-gray-200 ring-1">
        <p class="text-2xl text-center text-blue-700">
          Historique
        </p>

        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span class="p-1 mr-2 bg-gray-500 rounded-full" />
            <a href="/search/?query=le+riz class=" class="text-blue-500">Le riz</a>

            <a href="#" class="ml-1 text-red-500 lowercase">Se mange avec</a>

            <a href="/search/?query=sauce+tomate" class="ml-1 text-blue-500">Sauce Tomate</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'triplet',
      classes: undefined,
      instances: undefined,
      details: undefined,
      domain: undefined,
      selectedObject: undefined,
      updateIndex: -1,
      updatedObject: undefined,
      newProperty: false,
      newTarget: undefined,
      addRange: undefined,
      addProperty: false,
      newObject: {}
    }
  },

  watch: {
    selectedObject (newValue) {
      this.fetchDetail()
    },

    newProperty (property) {
      console.log('Property changed')
      console.log(property)
      if (property && property.isObjectProperty) {
        this.fetchNewDataProperty(property.domain.split('#')[1])
      }
    }
  },

  async mounted () {
    this.classes = await this.$axios.$get('/classes')
    this.instances = await this.$axios.$get('/instances')
    console.log(this.classes)
    console.log(this.instances)
  },

  methods: {
    async fetchNewDataProperty (propertyID) {
      this.addRange = await this.$axios.$get('/range-instance/' + propertyID)
    },

    openUpdate (index, detail) {
      this.updateIndex = index
      this.updatedObject = detail.target.label
      this.fetchNewDataProperty(detail.relation.id.split('#')[1])
    },

    async insertObject () {
      console.log(this.newObject)
      console.log(`
        PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        insert data {
            :instance_${Date.now() + '_' + this.newObject.label.split(' ').join('_')} rdf:type <${this.newObject.type}>;
                  <http://www.w3.org/2000/01/rdf-schema#label> "${this.newObject.label}";
                  <http://www.w3.org/2000/01/rdf-schema#comment> "${this.newObject.comment}";
        }


      `)
      try {
        await this.$axios.$post('/sparql', {

          query: `
        PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        insert data {
            :instance_${Date.now() + '_' + this.newObject.label.split(' ').join('_')} rdf:type <${this.newObject.type}>;
                  <http://www.w3.org/2000/01/rdf-schema#label> "${this.newObject.label}";
                  <http://www.w3.org/2000/01/rdf-schema#comment> "${this.newObject.comment}"
        }


      `

        })
      } catch (error) {

      }

      this.newObject = {}
      this.instances = await this.$axios.$get('/instances')
    },

    async fetchDetail () {
      this.cancelAddition()
      this.details = false
      this.domain = false
      this.details = await this.$axios.$get('/details/' + this.selectedObject.split('#')[1])
      this.domain = await this.$axios.$get('/domain/' + this.selectedObject.split('#')[1])
    },

    addDataProperty () {
      this.addProperty = true
    },

    cancelAddition () {
      this.newProperty = null
      this.addProperty = false
      this.addRange = undefined
    },

    async doDelete (detail) {
      const subject = this.selectedObject
      const property = detail.relation.id
      const object = this.updatedObject

      console.log({ subject, property, object })

      try {
        await this.$axios.$get('/sparql', {
          params: {
            query: `
        PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
        delete{
            <${subject}> <${property}> ?var
        }

        where{
             <${subject}> <${property}> ?var.
              filter(?var = ${detail.isObject ? '<' + detail.target.id + '>' : '"' + detail.target.label + '"'} )
        }
      `
          }

        })
      } catch (error) {

      }

      await this.fetchDetail()
      this.updateIndex = -1
    },
    async doUpdate (detail) {
      const subject = this.selectedObject
      const property = detail.relation.id
      const object = this.updatedObject

      console.log({ subject, property, object })

      try {
        await this.$axios.$post('/sparql', {

          query: `
        PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
        delete{
            <${subject}> <${property}> ?var
        }
        insert {
            <${subject}> <${property}> ${detail.isObject ? '<' + object + '>' : '"' + object + '"'}
        }
        where{
             <${subject}> <${property}> ?var.
              filter(?var = ${detail.isObject ? '<' + detail.target.id + '>' : '"' + detail.target.label + '"'} )
        }

      `

        })
      } catch (error) {

      }

      await this.fetchDetail()
      await this.$axios.$post('/facts/', { facts: [{ subject, property, object }] })
      this.updateIndex = -1
    },

    async doInsert (detail) {
      const subject = this.selectedObject
      const property = this.newProperty.domain
      const object = this.newTarget

      console.log({ subject, property, object })
      console.log(`
            PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
            insert data {
              <${subject}> <${property}> ${this.newProperty.isObjectProperty ? `<${object}>` : `"${object}"`}
            }

      `)

      try {
        await this.$axios.$post('/sparql', {

          query: `
            PREFIX : <http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#>
            insert data {
              <${subject}> <${property}> ${this.newProperty.isObjectProperty ? `<${object}>` : `"${object}"`}
            }

      `

        })
      } catch (error) {

      }

      await this.fetchDetail()
      await this.$axios.$post('/facts/', { facts: [{ subject, property, object }] })
      this.updateIndex = -1
    },

    getRelationName (detail) {
      if (detail.relation.id === 'http://www.w3.org/2000/01/rdf-schema#comment') {
        return 'Descripton'
      }
      if (detail.relation.id === 'http://www.w3.org/2000/01/rdf-schema#label') {
        return 'Dénomination'
      }
      if (detail.relation.id === 'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#image') {
        return 'Images'
      }

      return detail.relation.label ?? detail.relation.id.split('#')[1]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
