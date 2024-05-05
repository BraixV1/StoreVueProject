import './assets/main.css';
// import '../node_modules/flowbite/dist/flowbite.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth';

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Check if authentication tokens exist in storage
const authStore = useAuthStore()
const jwt = localStorage.getItem('jwt')
const refreshToken = localStorage.getItem('refreshToken')

if (jwt && refreshToken) {
  // Set tokens in the store
  authStore.jwt = jwt
  authStore.refreshToken = refreshToken

  // Perform auto-login
  // Call your API to validate tokens and fetch user data if needed
}

app.mount('#app')
