import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _194f8fd9 = () => interopDefault(import('../pages/diet-assist.vue' /* webpackChunkName: "pages/diet-assist" */))
const _7026fc3e = () => interopDefault(import('../pages/enrich/index.vue' /* webpackChunkName: "pages/enrich/index" */))
const _6f868b0a = () => interopDefault(import('../pages/explore.vue' /* webpackChunkName: "pages/explore" */))
const _23465861 = () => interopDefault(import('../pages/meal-planner.vue' /* webpackChunkName: "pages/meal-planner" */))
const _78dfbd01 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _20268e7c = () => interopDefault(import('../pages/sparql.vue' /* webpackChunkName: "pages/sparql" */))
const _381fdd2f = () => interopDefault(import('../pages/validate.vue' /* webpackChunkName: "pages/validate" */))
const _0590e61b = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _775ab8e1 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _adc823d4 = () => interopDefault(import('../pages/enrich/facts.vue' /* webpackChunkName: "pages/enrich/facts" */))
const _1720ff18 = () => interopDefault(import('../pages/wiki/_id.vue' /* webpackChunkName: "pages/wiki/_id" */))
const _71f8cd89 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/diet-assist",
    component: _194f8fd9,
    name: "diet-assist"
  }, {
    path: "/enrich",
    component: _7026fc3e,
    name: "enrich"
  }, {
    path: "/explore",
    component: _6f868b0a,
    name: "explore"
  }, {
    path: "/meal-planner",
    component: _23465861,
    name: "meal-planner"
  }, {
    path: "/search",
    component: _78dfbd01,
    name: "search"
  }, {
    path: "/sparql",
    component: _20268e7c,
    name: "sparql"
  }, {
    path: "/validate",
    component: _381fdd2f,
    name: "validate"
  }, {
    path: "/auth/login",
    component: _0590e61b,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _775ab8e1,
    name: "auth-register"
  }, {
    path: "/enrich/facts",
    component: _adc823d4,
    name: "enrich-facts"
  }, {
    path: "/wiki/:id?",
    component: _1720ff18,
    name: "wiki-id"
  }, {
    path: "/",
    component: _71f8cd89,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
