import { h, getElementStyle } from './../utils';
export default function NoteMaximized({ data, index, prefix, callbacks }) {
    return h('div', {
        className:`${prefix}--minimized`,
        onClick: () => callbacks.updateItem(index,{ id:data.id, viewSize: null }),
        style: getElementStyle('note-minimized', {data})
    })
}
