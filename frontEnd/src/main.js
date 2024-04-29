
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import '@/assets/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

pinia.use(({ store }) => {
    store.$router = markRaw(router)
});
  

axios.defaults.baseURL = 'http://localhost:3000/'
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
