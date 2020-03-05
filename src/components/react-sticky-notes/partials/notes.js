import React from 'react';
import Note from './note';
import { h, getElementStyle } from './../utils';
class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggle:false
        }
    }
    setToggle = (toggle) => {
        this.setState({
            toggle: this.state.toggle===toggle?false:toggle
        });
    }
    render(){
        const {prefix, items} = this.props;
        return h('div', {
                key: prefix, 
                className: prefix,
                style: getElementStyle('container', this.props)
            }, 
                items?items.map((data, index)=> h(Note, { 
                    key: `note-${data.id}`, 
                    data,
                    ...this.props,
                    toggle:this.state.toggle,
                    setToggle:this.setToggle
                })
            ):null
        )
    }
}
export default Notes;
