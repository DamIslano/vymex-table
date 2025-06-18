import { createApp } from 'vue'
import App from './App.vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import './style.css'

const app = createApp(App)

const queryClient = new QueryClient()

app.use(VueQueryPlugin, { queryClient })

app.mount('#app')