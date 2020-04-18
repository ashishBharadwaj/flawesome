import React from 'react';
import TitleBar from './components/title-bar'
import WorkSpace from './components/work-space'
import './App.css';
const ipcRenderer = window.electron.ipcRenderer;
export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = ipcRenderer.sendSync('getAppState', this.getDateKeyString(new Date()));
        this.onDateChange = this.onDateChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
    }
    onDateChange (newDate)  {
        let val = Object.assign({},this.state);
        ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val));
        let nextstate = ipcRenderer.sendSync('getAppState',this.getDateKeyString(newDate));  
        this.setState(nextstate);
    }
    onEditorChange(newContent, delta, source, editor)
    {
        this.setState({ editorState: newContent}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.state)) });
    }
    onNoteChange (type, payload, newNotes) {
        this.setState({ notes: newNotes}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.state))});
    }  
    getDateKeyString(date)
    {
        return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate())
    }
    render(){
        return(
            [
                <TitleBar date = {this.state.date} dateChangeCallBack = {this.onDateChange}/>,
                <WorkSpace appData = {{notes: this.state.notes, editorContent: this.state.editorState}} callBacks = { {noteChangeCallback: this.onNoteChange, editorChangeCallback: this.onEditorChange} } />,
                <div className="footer"></div>
            ]
        );
    }
}