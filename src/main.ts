import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

createApp(App).use(router).use(antDesignVue).mount('#app')
