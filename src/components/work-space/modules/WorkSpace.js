import React from 'react'
import '../styles/WorkSpace.css'
export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="ab_workSpace">
                <div className="ab_sideBar">
                    <div className="ab_SB_IconContainer">
                        <div className="ab_SB_icons ab_SB_NoteBook"></div>
                        <div className="ab_SB_icons ab_SB_StickyNotes"></div>
                        <div className="ab_SB_icons ab_SB_TodoList"></div>
                    </div>
                </div>
                <div className="ab_appContainer"></div>
            </div>
        );
    }
}