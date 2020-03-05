import { h, getElementStyle } from './../utils';
import NavBar from './../navbar';
import NoteBody from '../partials/note-body';
export function PageView(props){
    return [
        h(NavBar, { ...props, key: 'navbar' }),
        h('div', {
                key: props.prefix, 
                className: props.prefix,
                style: getElementStyle('container', props)
            },
            props.items.map( data => h('div', {
                    key: `note-${data.id}`,
                    className:`${props.prefix}--note`,
                    style: getElementStyle('note', {...props, data} )
                },
                    h(NoteBody,{
                        data,
                        ...props
                    })
                )
            )
        )
    ]
}