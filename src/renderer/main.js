import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/antd-design-vue';
import './core/lazy_use'
import '@/assets/less/global.less';
import { VueAxios } from './utils/request'
Vue.config.productionTip = false
// 不是web环境就引入vue-electron'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VueAxios)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
