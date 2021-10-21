import { wrapFunctional } from './utils'

export { default as Footer } from '../../components/Footer.vue'
export { default as KnowledgePane } from '../../components/KnowledgePane.vue'
export { default as NavBar } from '../../components/NavBar.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as ResultItem } from '../../components/ResultItem.vue'

export const LazyFooter = import('../../components/Footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const LazyKnowledgePane = import('../../components/KnowledgePane.vue' /* webpackChunkName: "components/knowledge-pane" */).then(c => wrapFunctional(c.default || c))
export const LazyNavBar = import('../../components/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const LazyNuxtLogo = import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const LazyResultItem = import('../../components/ResultItem.vue' /* webpackChunkName: "components/result-item" */).then(c => wrapFunctional(c.default || c))
