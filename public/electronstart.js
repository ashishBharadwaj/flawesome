const openAboutWindow = require('about-window').default;
const {app, BrowserWindow, Menu,shell} = require('electron');
const { ipcMain } = require('electron')
const Store = require('./store.js');
const join = require('path').join;
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
//  console.log("Logging default state : ");
//  console.log(defaultAppState);
//  console.log(store);
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
        store.save();
        win = null;
    });
    ipcMain.on('getAppState', (event, arg) => {
        event.returnValue = store.get(arg);
    });
    ipcMain.on('storeAppState', (event,dateKey, appState) =>{
        // console.log(appState)
        store.set(dateKey, appState);
    });
    const selectionMenu = Menu.buildFromTemplate([
        {role: 'copy'},
        {type: 'separator'},
        {role: 'selectall'},
    ])
    
    const inputMenu = Menu.buildFromTemplate([
    {role: 'undo'},
    {role: 'redo'},
    {type: 'separator'},
    {role: 'cut'},
    {role: 'copy'},
    {role: 'paste'},
    {type: 'separator'},
    {role: 'selectall'},
    ])
    
    win.webContents.on('context-menu', (e, props) => {
    const { selectionText, isEditable } = props;
    if (isEditable) {
        inputMenu.popup(win);
    } else if (selectionText && selectionText.trim() !== '') {
        selectionMenu.popup(win);
    }
    })
    

    const mainMenu = Menu.buildFromTemplate([
        {
            label: "Help",
            submenu:[
                {
                    label: "About donna.ai",
                    click:()=>{
                        openAboutWindow(
                            {
                                icon_path:join(__dirname, 'icon.jpg'),
                                product_name: 'donna.ai',
                                copyright:'Copyright (c) 2020 Ashish Bharadwaj J',
                                package_json_dir: join(__dirname, '../'),
                                win_options: {
                                    parent: win,
                                    modal: true,
                                },
                                show_close_button: 'Close',
                            }
                        );

                    }
                                     
                },
                {type:'separator'}, 
                {
                    label: "Report A Bug?",
                    click() { 
                        shell.openExternal('http://google.com')
                    } 
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(mainMenu); 

    // and load the index.html of the app.     win.loadFile('index.html')   
} 
function closeApp()
{
    app.quit();
}