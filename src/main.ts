import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'vue-global-api'
import router from '@/router'
import '@/microApp'

import { createPinia } from 'pinia'

// import { useRegisterSW } from 'virtual:pwa-register/vue';
// useRegisterSW();

createApp(App).use(router).use(createPinia()).mount('#mainApp')
