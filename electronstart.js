const {app, BrowserWindow} = require('electron');
function createWindow () {   
    // Create the browser window.     
    let {width, height} = require('electron').screen.getPrimaryDisplay().size
  var win = new BrowserWindow({ width: width, height: height, show: false, webPreferences: {
    nodeIntegration: true
  }}) 
  win.loadURL('http://localhost:3000/')  
  win.once('ready-to-show', () => {
    win.maximize()  
    win.show()
  })
  win.on('closed', () => {
    win = null
  })
  // and load the index.html of the app.     win.loadFile('index.html')   
}      
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
function closeApp()
{
    app.quit();
}