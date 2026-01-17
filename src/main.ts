/*
Path: cccc
*/

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'

createApp(App)
	.use(router)
	.use(HighchartsVue)
	.mount('#app')
