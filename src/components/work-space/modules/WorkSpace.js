import React from 'react'
import '../styles/WorkSpace.css'
export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedClass: "ab_SB_IconSelected",
            icons:[
                {
                    name: "NoteBook",
                    class: "ab_SB_NoteBook",
                    isSelected: true
                },
                {
                    name: "StickyNotes",
                    class: "ab_SB_StickyNotes",
                    isSelected: false
                },
                {
                    name: "ToDo",
                    class: "ab_SB_TodoList",
                    isSelected: false
                }
            ]
        };
        this.iconClicked = this.iconClicked.bind(this);
    }
    iconClicked(e, icon){
        this.setState({icons: this.state.icons.map(a => a.name === icon.name ? {...a, isSelected: true } : {...a, isSelected: false } )})
    }
    render(){
        return(
            <div className="ab_workSpace">
                <div className="ab_sideBar">
                    <div className="ab_SB_IconContainer">
                        {
                            this.state.icons.map(a => {
                                return <div className = { ("ab_SB_icons " + a.class + (a.isSelected ?  (" " + this.state.selectedClass) : "" ))}  onClick = {(e)=>{this.iconClicked(e, a) }}></div>
                            })
                        }
                    </div>
                </div>
                <div className="ab_appContainer"></div>
            </div>
        );
    }
}