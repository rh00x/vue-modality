import { createSSRApp } from 'vue'
import App from './app.vue'
import './style.css'

createSSRApp(App).mount('#app')
