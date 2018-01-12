const { BrowserWindow, Menu } = require('electron')
const defaultMenu = require('electron-default-menu')
const isDev = require('electron-is-dev')

module.exports = {
  createMenu: (app, shell) => {
    let template = defaultMenu(app, shell)
    template.splice(1, 0, {
      label: 'File',
      submenu: [{
        label: 'Open...',
        accelerator: 'CommandOrControl+O',
        click: () => {
          BrowserWindow
            .getFocusedWindow()
            .webContents
            .send('open-file')
        }
      }, {
        type: 'separator'
      }, {
        label: 'Save',
        accelerator: 'CommandOrControl+S',
        click: () => {
          BrowserWindow
            .getFocusedWindow()
            .webContents
            .send('save-file')
        },
        enabled: false
      }, {
        label: 'Save As...',
        accelerator: 'Shift+CommandOrControl+S',
        click: () => {
          BrowserWindow
            .getFocusedWindow()
            .webContents
            .send('save-file-as')
        },
        enabled: false
      }]
    })
    if (!isDev) {
      let viewMenu = template[3]
      let helpMenu = template[template.length - 1]
      // Remove "Reload" item
      viewMenu.submenu.splice(0, 1)
      // Remove "Toggle Developer Tools" item
      viewMenu.submenu.splice(1, 1)
      // Remove "Learn more" item
      helpMenu.submenu.splice(0, 1)
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  },
  setSaveEnabled: (enabled) => {
    const fileMenu = require('electron')
      .remote
      .Menu
      .getApplicationMenu()
      .items[1]
    fileMenu.submenu.items[2].enabled = enabled
    fileMenu.submenu.items[3].enabled = enabled
  }
}