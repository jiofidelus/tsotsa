<template>
  <div :class="{'border-b': logo}" class="py-4 bg-white border-gray-300">
    <div class="flex items-center justify-between px-8 mx-auto ">
      <div class="flex flex-1 gap-[5rem]">
        <nuxt-link v-if="logo" class="hidden md:block" to="/">
          <img class="w-12" src="https://i.ibb.co/vcKsqTg/logo-removebg-preview.png" alt="" srcset="">
        </nuxt-link>

        <form v-if="logo" class="flex items-center w-full max-w-2xl py-1 pl-4 pr-8 overflow-hidden rounded-full ring-1 ring-gray-300" @keypress.enter.stop.prevent="doSearch()">
          <input v-model="userQuery" placeholder="Que cherchez vous ?" type="text" class="w-full h-full focus:outline-none">
          <button @click.prevent="userQuery=''">
            <i class="text-gray-400 fas fa-times" />
          </button>
          <div class="w-px h-full mx-4 bg-gray-300" />
          <button @click.prevent="doSearch()">
            <i class="text-blue-600 fa fa-search" aria-hidden="true" />
          </button>
        </form>
      </div>
      <div id="links" class="hidden gap-4 text-sm md:flex font-gray-800">
        <a href="/diet-assist">
          Mon assistant nutritif
        </a>
        <a href="/meal-planner">
          Repas du jours
        </a>
        <nuxt-link to="/enrich">
          Contribuer
        </nuxt-link>
        <nuxt-link to="/validate">
          Comptes
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logo: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      userQuery: ''
    }
  },

  beforeMount () {
    this.userQuery = this.$route.query.query
  },

  methods: {
    async doSearch () {
      if (!this.userQuery) {
        return
      }
      await this.$router.push({
        path: '/search',
        query: { query: this.userQuery, time: Date.now() }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.nuxt-link-exact-active {
  color: green;
}
</style>
