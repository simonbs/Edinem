const { app, shell } = require('electron')
const ApplicationMenuManager = require('./src/lib/application_menu_manager')

app.setName('Edinem')

app.windowManager = require('./src/lib/window_manager')

app.on('ready', () => {
  ApplicationMenuManager.createMenu(app, shell)
  app.windowManager.createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!app.windowManager.hasWindows()) {
    app.windowManager.createWindow()
  }
})
