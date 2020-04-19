import React from 'react';
import TitleBar from './components/title-bar';
import WorkSpace from './components/work-space';
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spotlight from "./components/spotlight-search/Spotlight";
const ipcRenderer = window.electron.ipcRenderer;
library.add(faSearch);
export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = ipcRenderer.sendSync('getAppState', this.getDateKeyString(new Date()));
        this.state = {...this.state, doOpen: false}
        this.onDateChange = this.onDateChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onTodoChange = this.onTodoChange.bind(this);
        this.searchHit = this.searchHit.bind(this);
        this.onDoOpenSearch = this.onDoOpenSearch.bind(this);
        this.toggleDoOpen = this.toggleDoOpen.bind(this);
    }
    onDateChange (newDate)  {
        let val = Object.assign({},this.state);
        delete val.doOpen;
        ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val));
        let nextstate = ipcRenderer.sendSync('getAppState',this.getDateKeyString(newDate));  
        this.setState({...nextstate, doOpen:false});
    }
    onEditorChange(newContent, delta, source, editor)
    {
        
        this.setState({ editorState: newContent}, 
            ()=> { 
                let val = Object.assign({},this.state);
                delete val.doOpen;
                ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val)) 
            });
    }
    onNoteChange (type, payload, newNotes) {
        this.setState({ notes: newNotes}, 
            ()=> { 
                let val = Object.assign({},this.state);
                delete val.doOpen;
                ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val)) 
            });
    }  
    onTodoChange(newTodoState)
    {
        this.setState({todoState: newTodoState}, 
            ()=> { 
                let val = Object.assign({},this.state);
                delete val.doOpen;
                ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val)) 
            });
    }
    searchHit(searchItem){
        this.onDateChange(new Date(searchItem.dateKey));
    }
    getDateKeyString(date)
    {
        return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate())
    }
    onDoOpenSearch(){
        this.setState({doOpen: !this.state.doOpen});
    }
    toggleDoOpen(newDoOpen){
        this.setState({doOpen: newDoOpen});
    }
    render(){
        return(
            [
                <TitleBar date = {this.state.date} dateChangeCallBack = {this.onDateChange}/>,
                <WorkSpace appData = {{
                        date: this.state.date,
                        notes: this.state.notes, 
                        editorContent: this.state.editorState, 
                        todoState: this.state.todoState
                    }} 
                    callBacks = {{
                        noteChangeCallback: this.onNoteChange,
                        editorChangeCallback: this.onEditorChange,
                        todoChangeCallback: this.onTodoChange,
                        openSearchCallback: this.onDoOpenSearch
                    }} />,
                <div className="footer"></div>,
                <Spotlight searchHit={this.searchHit} doOpen = {this.state.doOpen} toggleDoOpen = {this.toggleDoOpen}/>        
            ]
        );
    }
}