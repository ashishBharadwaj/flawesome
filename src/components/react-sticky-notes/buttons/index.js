import { h, getNoteTitle } from './../utils';

export function ButtonAdd({prefix, data, icons, callbacks}){
    return h('button',{
        key: `${prefix}--button__add`,
        className:`${prefix}--button ${prefix}--button__add`,
        onClick:(e)=>callbacks.addItem(e, {id: data?data.id:null, position:data?data.position:null, selected: true})
    }, 
        icons.add
    )
}

export function ButtonTitle({prefix, data, targetRef, callbacks }){
    return h('button',{
        key: `${prefix}--button__title`,
        className:`${prefix}--button ${prefix}--button__title`,
        ref: targetRef,
        onClick:(e)=>callbacks.updateItem(e, { id: data?data.id:null, menu: false, selected: true, hidden: false })
    },
        data.title?data.title: getNoteTitle(data)
    )
}

export function ButtonMenu({prefix, data, icons, callbacks }){
    return h('button',{
        key: `${prefix}--button__menu`,
        className:`${prefix}--button ${prefix}--button__menu`,
        onClick:(e)=>callbacks.updateItem(e, {id: data?data.id:null, menu: !data.menu, selected: true})
    }, 
        icons.menu
    );
}

export function ButtonHideShow({prefix, data, icons, callbacks }){
    return h('button',{
        key: `${prefix}--button__hideshow`,
        className:`${prefix}--button ${prefix}--button__hideshow`,
        onClick:(e)=>callbacks.updateItem(e, {id: data?data.id:null, hidden: !data.hidden})
    }, 
        data.hidden?icons.hide:icons.show
    );
}

export function ButtonTrash({prefix, data, icons, callbacks }){
    return h('button',{
        key: `${prefix}--button__trash`,
        className:`${prefix}--button ${prefix}--button__trash`,
        onClick:(e)=>callbacks.deleteItem(e, {id: data?data.id:null})
    }, 
        icons.trash
    );
}

export function ButtonPageView({prefix, icons, callbacks, viewSize }){
    return h('button',{
        key: `${prefix}--button__pageview`,
        className:`${prefix}--button ${prefix}--button__pageview`,
        onClick:(e)=> callbacks.changeView(e)
    }, 
        icons[viewSize]?icons[viewSize]:`icons.${viewSize}`
    );
}

export function ButtonUpload({prefix, icons, callbacks }){
    return h('button',{
        key: `${prefix}--button__upload`,
        className:`${prefix}--button ${prefix}--button__upload`,
        onClick:(e)=> callbacks.changeModal(e, 'upload')
    }, 
        icons.upload
    );
}
