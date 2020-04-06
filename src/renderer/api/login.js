import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
    // return axios({
    //     url: '/auth/login',
    //     method: 'post',
    //     data: parameter
    // })
    return new Promise((resolve, reject) => {
        resolve({
            result: {
                success: true,
                data: { token: '登录成功token' }
            }
        });
    })
}

export function getInfo() {
    return axios({
        url: '/user/info',
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function logout() {
    return axios({
        url: '/auth/logout',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
