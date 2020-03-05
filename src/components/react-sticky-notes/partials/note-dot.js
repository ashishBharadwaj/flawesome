import React from 'react';
import { h, getElementStyle, getNoteTitle } from './../utils';
import NoteDraggable from './note-draggable';
export default class NoteDot extends React.Component{
    constructor(props){
        super(props);
        this.targetRef = React.createRef();
    }
    render(){
        const props = this.props;
        return h(NoteDraggable, {
                unit:"%",
                useBoundaries: true,
                disabledAxisX: true,
                className:`${props.prefix}--note ${props.data.selected?props.prefix+'--note__selected':''}`,
                position: props.data.position,
                selected: props.data.selected,
                target: this.targetRef,
                onDragComplete:(pos)=> {
                    const index = Math.floor(pos.py*props.colorCodes.length/100);
                    const color = props.colorCodes[index];
                    props.callbacks.updateItem(null, {id: props.data.id, color })
                },
                style: {
                    position: 'absolute',
                    left: props.data.position.x,
                    top: props.data.position.y
                }
            }, 
            h('button',{
                className: `${props.prefix}--note__bubble`,
                ref: this.targetRef,
                title: props.data.title?props.data.title: getNoteTitle(props.data),
                onClick: ()=> props.callbacks.updateItem(null, {id: props.data.id, hidden: false }),
                style: {
                    "--background-color": props.data.color,
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: props.data.color,
                    boxShadow: '1px 1px 2px rgba(0,0,0,.15)'
                }
            })
        )
    }
}
