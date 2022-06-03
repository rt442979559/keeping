import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import './plugins/element'
import router from './router'
import installElementPlus from './plugins/element'

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

const app = createApp(App)
installElementPlus(app)
app.use(router)
app.use(Avue)
app.mount('#app')