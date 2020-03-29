import React from 'react';
import './App.css';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';
import 'react-reflex/styles.css';
import Editor  from './Editor';
import TodoApp from './Todo';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // ake sure to import the default stylesheet
import ReactStickyNotes from './components/react-sticky-notes';

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
      flex: 0.57
    },
    rightPane: {
      flex: 0.6
    },
    editorPane:
    {
      flex: 0.57
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
  ipcRenderer.send('storeAppState', this.getDateKeyString(val.date),JSON.stringify(val));
  let nextstate = ipcRenderer.sendSync('getAppState',this.getDateKeyString(newDate));  
  this.setState(nextstate);
}
getDateKeyString(date)
{
  return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +  date.getDate())
}
onNoteChange (type, payload, newNotes) {
  this.setState({ notes: newNotes}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.state))});
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
  this.setState({ editorState: newContent}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.state)) });
}
todoChangeHandler(newTodoState)
{
  this.setState({todoState: newTodoState}, ()=>{ ipcRenderer.send('storeAppState', this.getDateKeyString(this.state.date),JSON.stringify(this.state)) })
}

  render(){
    return(
        <ReflexContainer orientation="vertical" className="appContainer">

          <ReflexElement maxSize={400}>
            <ReflexContainer orientation="horizontal">
              <ReflexElement flex={this.layoutState.calPane.flex}
                onResize={this.onResizePane}
                name="calPane"
                maxSize={420}>
                <div className="pane-content calendarContainer">
                  <InfiniteCalendar
                    width={'100%'}
                    height={265}
                    selected={this.state.date}
                    onSelect= {this.onDateChange}
                  />
                </div>
              </ReflexElement>

              <ReflexSplitter/>

              <ReflexElement className="bottom-pane">              
                <div className="pane-content" style={{padding: '0.5em', overflowX:'hidden', minWidth: '287px'}}>
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
                  <ReactStickyNotes notes={this.state.notes}
                      onChange={this.onNoteChange} />
                </div>
              </ReflexElement>

            </ReflexContainer>

          </ReflexElement>
        </ReflexContainer>
              
    );
  }  
}
export default App;
