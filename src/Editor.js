import React from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor.css'
import  ImageResize  from './components/imge-resize/ImageResize'
import {ImageDrop}  from 'quill-image-drop-module'
// import QuillBetterTable from 'quill-better-table'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)
// Quill.register({
//     'modules/better-table': QuillBetterTable
//   }, true)

class Editor extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this) 
    }
    handleChange (html)
    { 
        this.props.editorChange(html) 
    }
    render(){
        return(
            <div className="app">
                <ReactQuill 
                    theme={Editor.theme}
                    onChange={this.handleChange}
                    value={this.props.editorContent}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    bounds={'.app'}
                    />
            </div>
            
        )
    }
    
}

Editor.theme = 'snow'
Editor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],        
    },
    imageDrop: true,
    // table: false,
    // 'better-table': {
    //   operationMenu: {
    //     items: {
    //       unmergeCells: {
    //         text: 'Another unmerge cells name'
    //       }
    //     }
    //   }
    // },
    // keyboard: {
    //   bindings: QuillBetterTable.keyboardBindings
    // },
}

Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'script',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'alt','height','width','style'
]

export default Editor;