<template>
  <div class="flex flex-col justify-center h-full">
    <!-- main -->
    <form action="/search" class="-mt-16" method="get">
      <div class="flex justify-center">
        <div>
          <div class="w-3/5 mb-6 ml-auto mr-auto text-4xl font-bold text-center text-blue-600 ">
            <img src="https://i.ibb.co/vcKsqTg/logo-removebg-preview.png" alt="" srcset="">
          </div>

          <div class="flex p-3 bg-white border rounded-full shadow ring-1 ring-gray-300">
            <!-- <div>🕵️‍</div> -->

            <input v-model="query" type="text" name="query" class="w-full px-3 outline-none" placeholder="ex. Riz sauté">

          <!-- <div>🎤</div> -->
          </div>
          <div class="mt-8 text-center">
            <button class="px-12 py-3 border border-gray-300 rounded-full bg-blue-50 hover:bg-blue-200 hover:border-blue-200" @click.prevent="doSearch">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'index',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    doSearch () {
      if (!this.query.trim()) {
        return
      }
      this.$router.push({
        path: '/search',
        query: { query: this.query }
      })
    }
  }
}
</script>
