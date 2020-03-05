import { h, getElementStyle } from './../utils';
import NavBar from './../navbar';
import Note from '../partials/note';
import NoteBubble from '../partials/note-bubble';
export function NormalView(props){
    return [
        h(NavBar, { ...props, key: 'navbar' }),
        h('div', {
            key: props.prefix, 
            className: props.prefix,
            style: getElementStyle('container', props)
        }, 
            props.items.map( data => !data.hidden?h( Note, { key: `note-${data.id}`,...props, data } ):h( NoteBubble, { key: `note-${data.id}`,...props, data } ) )
        )
    ]
}