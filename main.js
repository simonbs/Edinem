const { app, shell, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const defaultMenu = require('electron-default-menu')

app.setName('Edinem')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  setMenu()
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null || win === undefined) {
    createWindow()
  }
})

function setMenu() {
  let template = defaultMenu(app, shell)
  template.splice(1, 0, {
    label: 'File',
    submenu: [{
      label: 'Open...',
      accelerator: 'ControlOrCmd+O',
      click: openFile
    }]
  })
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function openFile() {
  
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 800,
    minHeight: 720
  })
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Open the DevTools.
  win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
