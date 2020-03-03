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
import StickyNotes from './components/StickyNotes';
import TodoApp from './Todo';
import { EditorState} from 'draft-js';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // ake sure to import the default stylesheet

const ipcRenderer = window.electron.ipcRenderer;

class App extends React.Component {
 constructor(props)
 {
   super(props);
   this.state = ipcRenderer.sendSync('getAppState', this.getDateKeyString(new Date()));
   this.onNoteChange = this.onNoteChange.bind(this);
   this.onDateChange = this.onDateChange.bind(this);   
   this.onResizePane = this.onResizePane.bind(this);
   this.getSerilizableState = this.getSerilizableState.bind(this);
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
  let val = this.getSerilizableState(Object.assign({},this.state));
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
  this.setState({ notes: newNotes}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.getSerilizableState(this.state))) });
}  
getSerilizableState(currentState)
{
  let val = Object.assign({},currentState);
  for(let i=0;i<val.notes.length;i++)
  {
    delete val.notes[i].editorState;
  }
  return val;
}
editorChangehandler(newContent)
{
  this.setState({ editorState: newContent}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.getSerilizableState(this.state))) });
}
todoChangeHandler(newTodoState)
{
  this.setState({todoState: newTodoState}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.getSerilizableState(this.state))) })
}

  render(){
    return(
      <ReflexContainer orientation="vertical" className="appContainer">

        <ReflexElement maxSize={400}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex={this.layoutState.calPane.flex}
              onResize={this.onResizePane}
              name="calPane"
              minSize={440}
              maxSize={440}>
              <div className="pane-content" style={{paddingTop: '0.25em', paddingLeft:'0.34em',  paddingRight:'0.34em',overflow:'hidden'}}>
                <InfiniteCalendar
                  width={'100%'}
                  height={265}
                  selected={this.state.date}
                  onSelect= {this.onDateChange}
                />,
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
                <Editor editorContent={this.state.editorState} editorChange={this.editorChangehandler} />
              </div>

            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement className="bottom-pane">
              <div className="pane-content" style={{padding:'0.5em'}}>
                <StickyNotes
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
