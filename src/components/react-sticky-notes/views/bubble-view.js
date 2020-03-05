import { h, getElementStyle } from './../utils';
import NavBar from './../navbar';
import NoteDot from '../partials/note-dot';
export function BubbleView(props){
    return [
        h(NavBar, { ...props, key: 'navbar' }),
        h('div', {
            key: props.prefix, 
            className: props.prefix,
            style: getElementStyle('container', props, { display: 'flex' } )
        },[
            h('div',{
                key: `${props.prefix}--notes-colors`,
                className: `${props.prefix}--notes-colors`
            },
                props.colorCodes.map( (color, i) => h( 'div', { 
                    key: `note--color-${i}`, 
                    className: `${props.prefix}--notes-colors__color`,
                    style: {
                        "--background-color": color,
                        "--height": `${100/props.colorCodes.length}%`
                    }
                } ) )
            ),
            h('div',{
                key: `${props.prefix}--notes-area`,
                className: `${props.prefix}--notes-area`
            },
                props.items.map( (data, index) => {
                    data.position = {
                        x: `${(index*100/props.items.length)}%`,
                        y: `${(props.colorCodes.indexOf(data.color)*100/props.colorCodes.length)}%`,
                    }
                    return h( NoteDot, { key: `note-${data.id}`,...props, data } )
                } )
            ),
        ])
    ]
}
