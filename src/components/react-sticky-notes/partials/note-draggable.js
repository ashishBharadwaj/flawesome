import React from 'react';
import Draggable from './../utils/draggable';
import { h } from './../utils';
class NoteDraggable extends React.Component {
	draggable = null
	constructor(props) {
		super(props);
		this.state= {
			options: {}
		}
		this.element = React.createRef();
		this.draggable = new Draggable();
	}
	componentDidMount() {
		const el = this.element?this.element.current:null;
		const options = {
			element: el, 
			unit: this.props.unit,
			useBoundaries: this.props.useBoundaries,
			disabledAxisX: this.props.disabledAxisX,
			position: this.props.position,
			onDragComplete:this.props.onDragComplete,
			onInit:this.props.onInit
		};
		this.setState({options}, ()=> {
			this.draggable.init(options);
		})
	}
	onMouseDown = (e) => {
		if(this.props.target&&e.target===this.props.target.current){
			this.draggable.onMouseDown(e);
		}
	}
	render() {
		return (
			h('div', {
				className: this.props.className,
				style: this.props.style,
				ref: this.element,
				onMouseDown:this.onMouseDown,
				onTouchStart:this.onMouseDown
			}, 
				this.props.children
			)
		);
	}
}
export default NoteDraggable;
