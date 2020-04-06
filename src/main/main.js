'use strict'

import { app, protocol, BrowserWindow, Menu, remote } from 'electron'
import {
    createProtocol
    /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
import initIpcEvent from './utils/ipcEvent';
import createLoginWindow from './window/login';
import { APP_SCHEME, LOAD_URL } from './config';
const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([{ scheme: APP_SCHEME, privileges: { secure: true, standard: true } }])

let mainWindow
/**
 * 创建主窗口
 */
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 690,
        // minWidth: 1000,
        // minHeight: 690,
        // 设置应用图标
        // 这里的${__static}对应的是public目录
        icon: `${__static}/icon.ico`,
        // 无边框窗口
        frame: false,
        resizable: true,
        // 窗口创建的时候是否显示. 默认值为true
        // 防止闪烁在 ready-to-show 中显示
        show: false,
        webPreferences: {
            // 取消跨域限制
            webSecurity: false,
            nodeIntegration: true
        }
    })
    // 初始化登录窗口
    // global.loginWindow = createLoginWindow(BrowserWindow);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) mainWindow.webContents.openDevTools({ mode: 'detach' })
    } else {
        createProtocol(APP_SCHEME)
        mainWindow.loadURL(LOAD_URL)
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    createMenu();
    // 初始化自定义ipc事件
    initIpcEvent();

    // 将mainWindow存入全局变量，方便后面使用
    global.mainWindow = mainWindow;
}

// 设置菜单栏
function createMenu() {
    // 在windows中，菜单栏在APP窗口内的顶部；
    // 在macOS中，菜单栏位于电脑屏幕顶部。
    // 由于macOS的特殊性，顶部菜单栏无法删除，所以我们针对macOS特殊处理，把菜单栏只保留“关于”和“退出”。
    // darwin 表示是macOS
    if (process.platform === 'darwin') {
        // macOS
        const template = [
            {
                // macOS菜单栏名称label的“Electron Vue Demo”会在build版本生效，dev版本会显示“Electron”
                label: 'Electron Vue Demo',
                submenu: [
                    {
                        role: 'about'
                    }, {
                        role: 'quit'
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        // Linux、windows
        Menu.setApplicationMenu(null);
    }
}
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (global.mainWindow || mainWindow === null) {
        createWindow()
    }
})

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    createWindow()
})

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
