import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
    state: {
        token: '',
        info: ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const result = response.result
                    Vue.ls.set(ACCESS_TOKEN, result.data.token, 7 * 24 * 60 * 60 * 1000)
                    commit('SET_TOKEN', result.data.token)
                    console.log('login success', result);
                    resolve(result)
                }).catch(error => {
                    console.log('login error', error);
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const result = response.result
                    commit('SET_INFO', result)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                logout(state.token).then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                }).finally(() => {
                    commit('SET_TOKEN', '')
                    Vue.ls.remove(ACCESS_TOKEN)
                })
            })
        }
    }
}

export default user
