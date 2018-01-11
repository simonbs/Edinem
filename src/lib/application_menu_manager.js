const { BrowserWindow, Menu } = require('electron')
const defaultMenu = require('electron-default-menu')

module.exports = {
  createMenu: (app, shell) => {
    let template = defaultMenu(app, shell)
    template.splice(1, 0, {
      label: 'File',
      submenu: [{
        label: 'Open...',
        accelerator: 'ControlOrCmd+O',
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
        accelerator: 'ControlOrCmd+S',
        click: () => {
          BrowserWindow
            .getFocusedWindow()
            .webContents
            .send('save-file')
        },
        enabled: false
      }]
    })
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
  }
}