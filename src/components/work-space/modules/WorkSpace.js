import React from 'react';
import Editor from './Editor';
import ReactStickyNotes from '../../react-sticky-notes';
import '../styles/WorkSpace.css';
export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedClass: "ab_SB_IconSelected",
            icons:[
                {
                    name: "noteBook",
                    class: "ab_SB_NoteBook",
                    isSelected: true
                },
                {
                    name: "stickyNotes",
                    class: "ab_SB_StickyNotes",
                    isSelected: false
                },
                {
                    name: "toDo",
                    class: "ab_SB_TodoList",
                    isSelected: false
                }
            ],
            noteBook:{
                isSelected: true
            },
            stickyNotes:{
                isSelected: false
            },
            toDo:{
                isSelected: false
            },
            notes: this.props.appData.notes,
            editorContent: this.props.appData.editorContent
        };
        this.iconClicked = this.iconClicked.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.props = nextProps;
            this.setState({notes: nextProps.appData.notes, editorContent: nextProps.appData.editorContent });
        }
    }
    iconClicked(e, icon){
        this.setState({icons: this.state.icons.map(a => a.name === icon.name ? {...a, isSelected: true } : {...a, isSelected: false } )}, () =>{
            this.state.icons.forEach(a => { this.setState( { [a.name]: {isSelected: a.isSelected} } ) })
        })
    }
    render(){
        return(
            <div className="ab_workSpace">
                <div className="ab_sideBar">
                    <div className="ab_SB_IconContainer">
                        {
                            this.state.icons.map(a => {
                                return <div className = { ("ab_SB_icons " + a.class + (a.isSelected ?  (" " + this.state.selectedClass) : "" ))} key= {a.name}  onClick = {(e)=>{ this.iconClicked(e, a) }}></div>
                            })
                        }
                    </div>
                </div>
                <div className="ab_appContainer">
                    {this.state.noteBook.isSelected ? <Editor editorContent={this.state.editorContent} onChangeCallback = {this.props.callBacks.editorChangeCallback}/> : null}
                    {this.state.stickyNotes.isSelected ? <ReactStickyNotes notes={this.state.notes} onChange= { (type, payload, newNotes) => { this.setState({notes: newNotes}, ()=>{this.props.callBacks.noteChangeCallback(type, payload, newNotes) }) } } /> : null}
                </div>
            </div>
        );
    }
}