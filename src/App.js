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
        this.state = {...this.state, doOpen: false, defaultTab: "noteBook", aboutIsOpen: false }
        this.onDateChange = this.onDateChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onTodoChange = this.onTodoChange.bind(this);
        this.searchHit = this.searchHit.bind(this);
        this.onDoOpenSearch = this.onDoOpenSearch.bind(this);
        this.toggleDoOpen = this.toggleDoOpen.bind(this);
        this.serilizeAndStoreState = this.serilizeAndStoreState.bind(this);
        this.onUpdateDefaultTab = this.onUpdateDefaultTab.bind(this);
        this.onAboutConfigChange = this.onAboutConfigChange.bind(this);
    }
    onDateChange (newDate, tabToOpen)  {
        this.serilizeAndStoreState()
        let nextstate = ipcRenderer.sendSync('getAppState',this.getDateKeyString(newDate));  
        if(tabToOpen){
            this.setState({...nextstate, defaultTab: tabToOpen});
        }else{
            this.setState(nextstate);
        }
        
    }
    onEditorChange(newContent, delta, source, editor)
    {
        this.setState({ editorState: newContent}, () => { this.serilizeAndStoreState() });
    }
    onNoteChange (type, payload, newNotes) {
        this.setState({ notes: newNotes}, () => { this.serilizeAndStoreState() });
    }  
    onTodoChange(newTodoState)
    {
        this.setState({todoState: newTodoState}, () => { this.serilizeAndStoreState() });
    }
    onUpdateDefaultTab(newDefaultTab){
        this.setState({defaultTab: newDefaultTab});
    }
    //persits the app State
    serilizeAndStoreState(){
        let val = Object.assign({},this.state);
        delete val.doOpen;
        delete val.defaultTab;
        delete val.aboutWinConfig;
        ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val));
        return val;
    }
    getDateKeyString(date)
    {
        return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate())
    }
    
    // callback func when search itrem is clicked 
    searchHit(searchItem){
        this.onDateChange(new Date(searchItem.dateKey), searchItem.elementType);
    }
    //callback func to open Spotlight Search when search icon is clicked in sidebar
    onDoOpenSearch(){
        this.setState({doOpen: !this.state.doOpen});
    }
    //callback func to toggle search open state when it is changed in Spotlight component
    toggleDoOpen(newDoOpen){
        this.setState({doOpen: newDoOpen});
    }
    onAboutConfigChange(newAboutIsOpen){
        this.setState({ aboutIsOpen: newAboutIsOpen });
    }
    render(){
        return(
            [
                <TitleBar key="title" date = {this.state.date} dateChangeCallBack = {this.onDateChange} openAbout = {this.onAboutConfigChange}/>,
                <WorkSpace key="workSpace" appData = {{
                        date: this.state.date,
                        notes: this.state.notes, 
                        editorContent: this.state.editorState, 
                        todoState: this.state.todoState,
                        defaultTab: this.state.defaultTab,
                        isOpen: this.state.aboutIsOpen
                    }} 
                    callBacks = {{
                        noteChangeCallback: this.onNoteChange,
                        editorChangeCallback: this.onEditorChange,
                        todoChangeCallback: this.onTodoChange,
                        openSearchCallback: this.onDoOpenSearch,
                        updateDefaultTabCallback: this.onUpdateDefaultTab,
                        onAboutChange: this.onAboutConfigChange
                    }} />,
                <div key="footer" className="footer"></div>,
                <Spotlight key="spotLight" searchHit={this.searchHit} doOpen = {this.state.doOpen} toggleDoOpen = {this.toggleDoOpen}/>,
                
            ]
        );
    }
}