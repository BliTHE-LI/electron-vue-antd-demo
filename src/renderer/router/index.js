import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { UserLayout, BaseLayout } from '@/layouts';
import { ipcRenderer, remote } from 'electron';
Vue.use(Router);

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/',
        name: '/',
        component: BaseLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            }
        ],
        beforeEnter: (to, from, next) => {
            console.log('进入主页')
            const currentWindow = remote.getCurrentWindow();
            currentWindow.setMinimumSize(1000, 690);
            currentWindow.setResizable(true);
            currentWindow.setSize(1000, 690);
            currentWindow.center();
            next()
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
                beforeEnter: (to, from, next) => {
                    console.log('进入登录页')
                    const currentWindow = remote.getCurrentWindow();
                    currentWindow.setMinimumSize(300, 400);
                    currentWindow.setSize(300, 400);
                    // 设置大小后，禁止改变大小
                    currentWindow.setResizable(false);
                    // 窗口居中
                    currentWindow.center();
                    next()
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }
]
const router = new Router({
    routes: constantRouterMap
})

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['login'] // no redirect whitelist
const defaultRoutePath = '/home'

// 在跳转之前执行
router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
    const token = Vue.ls.get(ACCESS_TOKEN);
    console.log('token=============', token);
    if (token) {
        /* has token */
        if (to.path === '/user/login') {
            next({ path: defaultRoutePath })
            NProgress.done()
        } else {
            next()
            // if (store.getters.roles.length === 0) {
            //     store.dispatch('GetInfo').then(res => {
            //         const roles = res.result && res.result.role
            //         store.dispatch('GenerateRoutes', { roles }).then(() => {
            //             // 根据roles权限生成可访问的路由表
            //             // 动态添加可访问路由表
            //             router.addRoutes(store.getters.addRouters)
            //             const redirect = decodeURIComponent(from.query.redirect || to.path)
            //             if (to.path === redirect) {
            //                 // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            //                 next({ ...to, replace: true })
            //             } else {
            //                 // 跳转到目的路由
            //                 next({ path: redirect })
            //             }
            //         })
            //     }).catch(() => {
            //         notification.error({
            //             message: '错误',
            //             description: '请求用户信息失败，请重试'
            //         })
            //         store.dispatch('Logout').then(() => {
            //             next({ path: '/user/login', query: { redirect: to.fullPath } })
            //         })
            //     })
            // } else {
            //     next()
            // }
        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

// 在跳转之后执行
router.afterEach((to, from) => {
    NProgress.done() // finish progress bar
    console.log('afterEach==================to.name', to.name)
})

export default router
