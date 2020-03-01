import React from 'react';
import './App.css';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';
import 'react-reflex/styles.css';
import Calendar from 'react-calendar';
import Editor  from './Editor';
import ReactStickies from 'react-stickies';
import TodoApp from './Todo';
import { EditorState} from 'draft-js';
const ipcRenderer = window.electron.ipcRenderer;

class App extends React.Component {
 constructor(props)
 {
   super(props);
   this.state = ipcRenderer.sendSync('getAppState', this.getDateKeyString(new Date()));
   this.onNoteChange = this.onNoteChange.bind(this);
   this.onDateChange = this.onDateChange.bind(this);   
   this.onResizePane = this.onResizePane.bind(this);
   this.editorChangehandler = this.editorChangehandler.bind(this);
   this.todoChangeHandler = this.todoChangeHandler.bind(this);
   this.layoutState = this.getLayoutState();
 }
 

getLayoutState () {

  const item = window.localStorage.getItem("re-flex-config")
  if (item) {

    return JSON.parse(item)
  }
  return {
    calPane: {
      flex: 0.4
    },
    rightPane: {
      flex: 0.6
    },
    editorPane:
    {
      flex: 0.67
    }
  }
}

onResizePane (event) {
  const { name, flex } = event.component.props
  this.layoutState[name].flex = flex
  window.localStorage.setItem(
    "re-flex-config",
      JSON.stringify(this.layoutState))
}
onDateChange (newDate)  {
  let val = Object.assign({},this.state);
  for(let i=0;i<val.notes.length;i++)
  {
    val.notes[i].editorState = null;
  }
  ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val));
  let nextstate = ipcRenderer.sendSync('getAppState',this.getDateKeyString(newDate));
  if(nextstate.notes.length === 0)
  {
    let uid = this.guid();
    nextstate.notes.push(
      {
        grid:{
          w:2,
          h:2,
          x:0,
          y:null,
          i:uid
        },
        id: uid,
        editorState: EditorState.createEmpty(),
        title: "Title",
        color: "#FBE4BE",
        degree: "1deg",
        timeStamp: newDate.toDateString(),
        contentEditable: true
      }
    )
  }
  this.setState(nextstate);
}
getDateKeyString(date)
{
  return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate())
}
guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
onNoteChange (newNotes) {
  this.setState({ notes: newNotes});
}  
editorChangehandler(newContent)
{
  this.setState({ editorState: newContent});
}
todoChangeHandler(newTodoState)
{
  this.setState({todoState: newTodoState})
}

  render(){
    return(
      <ReflexContainer orientation="vertical" className="appContainer">

        <ReflexElement maxSize={400}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex={this.layoutState.calPane.flex}
              onResize={this.onResizePane}
              name="calPane"
              minSize={295}
              maxSize={330}>
              <div className="pane-content" style={{padding: '0.5em', overflow:'hidden'}}>
                  <Calendar
                        onChange={this.onDateChange}
                        value={this.state.date}/>
              </div>
            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement className="bottom-pane">              
              <div className="pane-content" style={{padding: '0.5em', overflowX:'hidden'}}>
                  <TodoApp todoContent={this.state.todoState} taskChanged={this.todoChangeHandler}/>
              </div>
            </ReflexElement>

          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement>
          <ReflexContainer orientation="horizontal">

            <ReflexElement flex={this.layoutState.editorPane.flex}
              onResize={this.onResizePane}
              name="editorPane">
              <div className="pane-content" style={{padding:'0.5em', height:'88%'}}>
                <Editor editorContent={this.state.editorState} editorChange={this.editorChangehandler}/>
              </div>

            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement className="bottom-pane">
              <div className="pane-content">
                <ReactStickies
                    notes={this.state.notes}
                    onChange={this.onNoteChange}/>
              </div>
            </ReflexElement>

          </ReflexContainer>

        </ReflexElement>
      </ReflexContainer>

    );
  }  
}
export default App;
