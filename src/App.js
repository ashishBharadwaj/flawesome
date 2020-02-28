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

class App extends React.Component {
 constructor(props)
 {
   super(props);
   this.state = {
    date: new Date(),
    editorState: "",
    notes: [],
   }
   this.onNoteChange = this.onNoteChange.bind(this)
   this.onDateChange = this.onDateChange.bind(this)   
   this.onResizePane = this.onResizePane.bind(this)
   this.layoutState = this.getLayoutState()
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
 onDateChange = newDate => this.setState({ date: newDate });
 onNoteChange = newnotes =>  this.setState({ notes: newnotes});

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
                  <TodoApp />
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
                <Editor />
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
