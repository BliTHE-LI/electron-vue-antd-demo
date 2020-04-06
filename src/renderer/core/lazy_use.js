import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'
Vue.use(VueStorage, config.storageOptions)
