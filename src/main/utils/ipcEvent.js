import { ipcMain, app, remote } from 'electron';

export default function () {
    ipcMain.on('change-window-size', (event, params) => {
        global.mainWindow.setSize(params.width, params.height)
    });

    ipcMain.on('show-login-window', (event, params) => {
        global.loginWindow.show()
        global.mainWindow.hide()
    });

    ipcMain.on('app-exit', (event, params) => {
        // 所有窗口都将立即被关闭，而不询问用户，而且 before-quit 和 will-quit 事件也不会被触发。
        app.exit()
    });
}
