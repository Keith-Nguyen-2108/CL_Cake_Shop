import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/style.scss'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#app')
