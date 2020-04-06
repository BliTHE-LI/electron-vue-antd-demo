import { LOGIN_URL } from './../config'

const createLoginWindow = function (BrowserWindow) {
    const obj = {
        height: 440,
        width: 300,
        minHeight: 440,
        minWidth: 300,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        maximizable: false,
        transparent: process.platform !== 'linux',
        alwaysOnTop: true,
        webPreferences: {
            webSecurity: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            backgroundThrottling: false,
        }
    }

    let loginWindow = new BrowserWindow(obj)
    loginWindow.loadURL(LOGIN_URL)

    loginWindow.on('closed', () => {
        loginWindow = null
    })
    loginWindow.webContents.openDevTools({ mode: 'detach' });
    return loginWindow
}
export default createLoginWindow
