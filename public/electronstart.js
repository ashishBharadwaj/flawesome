const {app, BrowserWindow} = require('electron');
const { ipcMain } = require('electron')
const Store = require('./store.js');
const d = new Date();
const dateKey = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" +  d.getDate());
let defaultAppState = JSON.parse('{"' + dateKey + '":' + JSON.stringify({
    date: d,
    editorState: "",
    notes: [],
    todoState:{
        tasksRemaining: 0,
        tasks:[]                    
    }}) + '}');
let store = new Store({
        name: 'donnaDb',
        defaults: defaultAppState
    });
console.log("Logging default state : ");
console.log(defaultAppState);
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
function createWindow () {   
    // Create the browser window.     
    let {width, height} = require('electron').screen.getPrimaryDisplay().size;
    var win = new BrowserWindow({ width: width, height: height, show: false, webPreferences: {
        nodeIntegration: true
    }});
    win.loadURL('http://localhost:3000/');
    win.once('ready-to-show', () => {
        win.maximize();  
        win.show();
    });
    win.on('closed', () => {
        win = null;
    });
    ipcMain.on('getAppState', (event, arg) => {
        event.returnValue = store.get(arg);
    });
    ipcMain.on('storeAppState', (event,dateKey, appState) =>{
        console.log(appState)
        store.set(dateKey, appState);
    });
    // and load the index.html of the app.     win.loadFile('index.html')   
} 
function closeApp()
{
    app.quit();
}