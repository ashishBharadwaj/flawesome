 import React from 'react';
import '../styles/Editor.css';
export default class Editor extends React.Component{
     constructor(props){
         super(props);
     }

     render(){
         return ([
            <div className="tab-container">
            <div className="tabs" >
              <div className="tab">
                <input type="text" value="Tab 1"/>
                <button/>
              </div>
              <div className="tab" > 
                <input type="text" value="Tab 2"/>
              </div>
              <div className="tab"> 
                <input type="text" value="Tab 3"/>
              </div>
              <div className="tab active">
                <input type="text" value="Tab 4"/>
              </div>
              <div className="tab">
                <input type="text" value="Tab 5"/>
              </div>
              <div className="tab">
                <input type="text" value="Tab 6"/>
              </div>
              
              
            </div>
          </div>,
          <div className="outer-circle"></div>]
         )
     }

 }