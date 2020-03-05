import React from 'react';
import { h, getElementStyle } from '../utils';
import NoteDraggable from './note-draggable';
import NoteHeader from './note-header';
import NoteBody from './note-body';
import { ButtonAdd, ButtonTitle, ButtonMenu, ButtonHideShow, ButtonTrash } from './../buttons' ;
class Note extends React.Component{
    constructor(props){
        super(props);
        this.targetRef = React.createRef();
    }
    render(){
        const props = this.props;
        return h(NoteDraggable, {
                className:`${props.prefix}--note ${props.data.selected?props.prefix+'--note__selected':''}`,
                position: props.data.position,
                selected: props.data.selected,
                target: this.targetRef,
                onDragComplete:(pos)=> props.callbacks.updateItem(null, {id: props.data.id, position:pos}),
                style: getElementStyle('note', props, { boxShadow: '1px 1px 2px rgba(0,0,0,.15)' } )
            }, [
                h(NoteHeader, {
                    ...props,
                    key:'note-header',
                    targetRef: this.targetRef,
                    prefix: `${props.prefix}--header`,
                    buttons: [ButtonAdd, ButtonTitle, ButtonMenu, ButtonHideShow, ButtonTrash]
                }),
                h(NoteBody,{
                    key:'note-body',
                    ...props
                })
            ]
        )
    }
}
export default Note;
