import { createApp } from 'vue'
import App from './App.vue'
import VueIpfs from './plugins/vue-ipfs.js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()
// Load our IPFS plugin.
const app = createApp(App)
app.use(VueIpfs)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
