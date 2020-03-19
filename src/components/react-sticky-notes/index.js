import React, { Component } from 'react';
import reducer from './reducers/reducer';
import * as icons from './icons';
import { h, getColorCodes, getNotes, getUUID } from './utils';
import { NormalView, BubbleView, PageView, FullscreenView } from './views' ;
import { UploadModal } from './modals' ;
class ReactStickyNotes extends Component {
	static defaultProps = {
		useCSS: true,
		prefix: 'rs-notes',
		colorCodes: getColorCodes(),
		navbar: true,
		sessionKey: '',
		noteWidth: 220,
		noteHeight: 220,
		containerWidth: '100%',
		containerHeight: '100%',
		icons,
		useMaterialIcons: true
	}
	constructor(props) {
		super(props);
		this.state = {
			modal: null,
			viewSize: 'normalview',
			items: getNotes(props.colorCodes, props.notes)
		};
	}
	componentDidMount(){
		if(this.props.useCSS){
			require('./index.scss');
		}
		if(this.props.useMaterialIcons){
			const stylesheet = document.createElement('link');
			stylesheet.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
			stylesheet.rel="stylesheet";
			stylesheet.id="material-icons-css";
			if(!document.getElementById('material-icons-css')){
				document.head.appendChild(stylesheet);
			}
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.notes && nextProps.notes.length == 0)
		{
			nextProps.notes.push({
				id: getUUID(),
				color: this.getColor(),
				text: '',
				selected: true,
				position: {
					x: 0,
					y: 0
				}
			});
		}
		this.props = nextProps;
		this.setState({items:  nextProps.notes});
	}
	dispatch = (options) => {
		let { type, payload } = options;
		if(this.props.onBeforeChange){
			payload = this.props.onBeforeChange(type, payload, [...this.state.items])
		}
		this.setState(
			reducer(this.state, { type, payload }),
			()=>{
				if(this.props.onChange){
					this.props.onChange(type, payload, [...this.state.items])
				}
			}
		)
	}
	getColor() {
		return this.props.colorCodes[Math.floor(Math.random() * this.props.colorCodes.length)];
	}
	addItem = (e, data) => {
		const { items } = this.state;
		const index=data?items.findIndex(item=>item.id===data.id)+1:items.length;
		let lastItemX = items && items.length > 1 ? items[items.length-1].position.x : 0;
		let lastItemY = items && items.length > 1 ? items[items.length-1].position.y : 0; 
		//console.log(e.currentTarget.parentElement.getBoundingClientRect());
		this.dispatch({
			type: 'add',
			payload: {
				index,
				data: {
					id: getUUID(),
					color: this.getColor(),
					text: '',
					selected: true,
					position: {
						x: lastItemX + 5,
						y: lastItemY + 5
					}
				}
			}
		});
	}
	updateItem = (e, data) => {
		this.dispatch({
			type: 'update',
			payload: {
				data
			}
		});
	}
	deleteItem = (e, data) => {
		this.dispatch({
			type: 'delete',
			payload: {
				data
			}
		});
	}
	changeView = (e) => {
		this.dispatch({
			type: 'changeview'
		});
	}
	changeModal = (e, modal) => {
		this.dispatch({
			type: 'changemodal',
			payload:{
				modal
			}
		});
	}
	saveJSON = (e, json) => {
		this.dispatch({
			type: 'import',
			payload:{
				items: getNotes(this.props.colorCodes, json)
			}
		});
	}
	render() {
		const { items, viewSize, modal } = this.state;
        let View = null;
        if(modal){
			switch(modal){
				case "upload":
					View = UploadModal
				break;
			}
		}else{
			switch(viewSize){
				case "pageview":
					View = PageView
				break;
				case "bubbleview":
					View = BubbleView
				break;
				case "fullscreen":
					View = FullscreenView
				break;
				default:
					View = NormalView
				break;
			}
		}
		return h( View, {
			...this.props,
			items,
			icons: { ...icons, ...this.props.icons },
			viewSize,
			callbacks: {
				changeView: this.changeView,
				addItem: this.addItem,
				updateItem: this.updateItem,
				deleteItem: this.deleteItem,
				changeModal: this.changeModal,
				saveJSON: this.saveJSON
			}
		})
	}

}
export default ReactStickyNotes;
