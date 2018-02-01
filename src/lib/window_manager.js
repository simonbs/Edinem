const { BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const isDev = require('electron-is-dev')

class WindowManager {
  constructor() {
    this._windows = {}
  }

  hasWindows() {
    return Object.keys(this._windows).length > 0
  }

  createWindow(sessionFilePath, onReady) {
    const windowManager = this
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
      minWidth: 800,
      minHeight: 720
    })
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../../index.html'),
      protocol: 'file:',
      slashes: true,
      query: {
        sessionFilePath: sessionFilePath
      }
    }))
    if (isDev) {
      win.webContents.openDevTools()
    }
    const windowId = win.id
    win.on('closed', () => {    
      windowManager.releaseWindow(windowId)
    })
    this._windows[windowId] = win
    if (onReady) {
      onReady(win)
    }
  }

  releaseWindow(id) {    
    delete this._windows[id]
  }
}

const instance = new WindowManager()
Object.freeze(instance)

module.exports = instance