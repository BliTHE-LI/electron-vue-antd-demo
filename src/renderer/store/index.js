import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron';
import appModule from './modules/app'
import userModule from "./modules/user";
import getters from "./getters";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app: appModule,
        user: userModule
    },
    plugins: [
        // createPersistedState(),
        // createSharedMutations()
    ],
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters
})
