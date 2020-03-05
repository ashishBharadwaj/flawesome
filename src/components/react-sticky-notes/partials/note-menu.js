import { h, getElementStyle } from './../utils';
function NoteMenu(props) {
    const { data, index, prefix, colorCodes, callbacks } = props;
    return h('div', {
        className: `${prefix}--colors`,
        style: getElementStyle('note-menu', props)
    }, 
        colorCodes.map((colorCode) =>  h('button', {
            key: colorCode,
            onClick: (e) => callbacks.updateItem(e, {id:data.id, color: colorCode, menu: false}),
            className: `${prefix}--colors__color ${data.color === colorCode ? prefix + '--colors__color--selected' : ''}`,
            style: getElementStyle('note-color-selector', {colorCode})
        }, colorCode )
    ))
}
export default NoteMenu;
