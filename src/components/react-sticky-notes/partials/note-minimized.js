import { h, getElementStyle } from './../utils';
export default function NoteMinimized({ data, index, prefix, callbacks }) {
    return h('div', {
        className:`${prefix}--minimized`,
        onClick: (e) => callbacks.updateItem(e,{ id:data.id, viewSize: null, selected: true }),
        style: getElementStyle('note-minimized', {data})
    })
}