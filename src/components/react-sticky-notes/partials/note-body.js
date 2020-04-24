import React from 'react';
import { h, getElementStyle } from '../utils';
import NoteText from './note-text';
import NoteMenu from './note-menu';
export default class NoteBody extends React.Component{
    constructor(props){
        super(props);
        this.noteRef = React.createRef();
        this.resizeObserver = null;
    }
    componentDidMount(){
        this.resizeObserver = new ResizeObserver((entries) => {
            this.props.callbacks.updateItem(entries, {...this.props.data, width: entries[0].contentRect.width, height: entries[0].contentRect.height})
       });
       this.resizeObserver.observe(this.noteRef.current);
    }
    componentWillUnmount(){
        if(this.resizeObserver){
            this.resizeObserver.disconnect();
        }
    }
    render(){
        const { data, prefix } = this.props;
        return h('div',{
            className:`${prefix}--note__body`,
            style: getElementStyle('note-body', this.props),            
            ref: this.noteRef,
            id:data.id
        },
            data.menu?
                h(NoteMenu, { 
                    key: 'note-menu', 
                    ...this.props
                }):
                h(NoteText, { 
                    key: 'note-text',
                    ...this.props
                })
        )
    }
    
    
}
