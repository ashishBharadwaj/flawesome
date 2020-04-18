import React from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../styles/Editor.css'
import  ImageResize  from '../../imge-resize/ImageResize'
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
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            editorContent: props.editorContent
        }
    }
    handleChange(html){
        this.setState({editorContent: html}, ()=>{ this.props.onChangeCallback(html)});
    }
    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props){
            this.props = nextProps;
            this.setState({editorContent: nextProps.editorContent})
        }
    }
    render(){
        return(
                <ReactQuill 
                    theme={Editor.theme}
                    onChange={this.handleChange}
                    value={this.state.editorContent}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    />
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