const openAboutWindow = require('about-window').default;
const {app, BrowserWindow, Menu,shell, ipcMain, screen } = require('electron');

const Store = require('./store');
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
        name: process.env.IS_DEV ? 'donnaDbDev' : 'donnaDb',
        defaults: defaultAppState
});
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
function createWindow () {   
    const {width, height} = screen.getPrimaryDisplay().size;
    var win = new BrowserWindow({ width: width, height: height, show: false, webPreferences: { nodeIntegration: true}, frame: false, titleBarStyle: 'hidden' });
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
    // Event handler for asynchronous incoming messages
    ipcMain.handle('getSearchResult', async (event, searchTerm) => {
        const result = await filterSearchTerm(searchTerm)
        return result
     })
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
            label:"Tools",
            submenu:[
                {
                    label: "Search (ctrl+space)",
                    click:()=>{
                        win.webContents.send("open-search")
                    }
                }
            ]
        },
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
    win.webContents.openDevTools();
    // and load the index.html of the app.     win.loadFile('index.html')   
} 
async function filterSearchTerm(searchTerm){
    let data = store.getAll();
    data = getArrangedData(data);
    data = data.filter((dat)=>{
        return dat.searchContent.toLowerCase().includes(searchTerm.toLowerCase())
    })
    return data;
}
function getArrangedData(data){
    let newData = [];
    for(let key in data)
    {
        if(data.hasOwnProperty(key)){
            let dat = data[key];
            if(dat.editorState)
            {
                let cleanState = dat.editorState.replace(/\s*\<.*?\>\s*/g, " ");
                if(cleanState){
                    newData.push(
                        {
                            dateKey: key, 
                            searchContent: cleanState, 
                            elementType: 'Editor', 
                            elementProps:{}
                        }
                    );
                }
                for(let todoKey in dat.todoState.tasks){
                    if(dat.todoState.tasks.hasOwnProperty(todoKey)){
                        if(dat.todoState.tasks[todoKey].title){
                            newData.push(
                                {
                                    dateKey: key, 
                                    searchContent: dat.todoState.tasks[todoKey].title, 
                                    elementType: 'TodoList', 
                                    elementProps: {
                                        index: todoKey, 
                                        isComplete: dat.todoState.tasks[todoKey].complete
                                    }
                                }
                            );
                        }
                    }                        
                }
                for(let noteKey in dat.notes){
                    if(dat.notes.hasOwnProperty(noteKey)){
                        let note = dat.notes[noteKey];
                        if(note.text){
                            newData.push(
                                {
                                    dateKey: key, 
                                    searchContent: note.text,
                                    elementType: 'Notes', 
                                    elementProps: {
                                        id: note.id,
                                        index: noteKey
                                    }
                                }
                            );
                        }
                    }
                }
            }
            
        }
    }

    return newData;
}