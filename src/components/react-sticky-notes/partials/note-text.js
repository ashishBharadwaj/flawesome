import { h, nlToBr, getElementStyle, getCurrentDateTime } from './../utils';
function NoteText({ data, index, prefix, callbacks }) {
    return h('div',{
        className:`${prefix}--text`,
        placeholder:"react-hooks",
        contentEditable:"true",
        onBlur:(e)=>callbacks.updateItem(index, {
            id:data.id,
            text: e.target.innerText
        }),
        onFocus:(e)=>callbacks.updateItem(e, {id:data.id, selected:true, datetime: getCurrentDateTime() }),
        dangerouslySetInnerHTML:{__html:nlToBr(data.text)},
        style: getElementStyle('note-input')
    })
}
export default NoteText;
