import { h, getElementStyle } from './../utils';
import NoteText from './note-text';
import NoteMenu from './note-menu';
export default function NoteBody(props) {
    const { data, prefix, callbacks } = props;
    return h('div',{
        className:`${prefix}--note__body`,
        style: getElementStyle('note-body', props)
    },
        data.menu?
            h(NoteMenu, { 
                key: 'note-menu', 
                ...props
            }):
            h(NoteText, { 
                key: 'note-text',
                ...props
            })
    )
}
