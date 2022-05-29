import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import './plugins/element'
import router from './router'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
app.use(router).mount('#app')