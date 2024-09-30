import '@/assets/css/main.css'

import { createApp } from 'vue'

import App from '@/App.vue'
import pinia from '@/stores'
import router from '@/router'
import { registerPlugins } from '@/plugins'
import '@/plugins/validation'

const app = createApp(App)

app.use(pinia)
app.use(router)

registerPlugins(app)

app.mount('#app')
