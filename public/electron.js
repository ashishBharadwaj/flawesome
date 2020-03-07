const openAboutWindow = require('about-window').default;
const {app, BrowserWindow, Menu,shell} = require('electron');
const { ipcMain } = require('electron')
const Store = require('./store');
const join = require('path').join;
const url = require('url');
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
    const startUrl = process.env.ELECTRON_START_URL || join(__dirname, './index.html')
    win.loadURL(startUrl);
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
            label: "About",
            submenu:[
                {
                    label: "About donna.ai",
                    click:()=>{
                        openAboutWindow(
                            {
                                icon_path:join(__dirname, './icon.png'),
                                product_name: 'donna.ai',
                                copyright:'Copyright (c) 2020 Ashish Bharadwaj J',
                                package_json_dir: join(__dirname, '../'),
                                adjust_window_size: true,
                                win_options: {
                                    parent: win,
                                    modal: true,
                                    show: false
                                },
                                show_close_button: 'Close',
                            }
                        );

                    }
                                     
                },
                {type:'separator'}, 
                {
                    label: "Report A Bug ?",
                    click:()=> { 
                        shell.openExternal('https://docs.google.com/forms/d/e/1FAIpQLSeUpOj6hMS8H8sfiju7OzADnb8Q7Frw5Bw55tmYMSIuA4NJpQ/viewform?usp=sf_link')
                    } 
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(mainMenu);
    //win.webContents.openDevTools();
    // and load the index.html of the app.     win.loadFile('index.html')   
} 
function closeApp()
{
    app.quit();
}