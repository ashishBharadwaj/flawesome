import React from 'react';
import WindowsControl from './WindowsControl'
import Flatpickr from "./FlatPickr";
import OptionsMenu from './OptionsMenu';
import '../styles/TitleBar.css'
class TitleBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: props.date
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.props = nextProps;
            this.setState({date: nextProps.date});
        }
    }
    render(){
        return(
            <div className="ab_TitleBar">
                <OptionsMenu openAbout  = {this.props.openAbout}/>
                <div className = "ab_TB_DatePicker">
                    <Flatpickr date = {this.state.date} dateChangeCallBack = {this.props.dateChangeCallBack}/>
                </div>    
                <WindowsControl/>            
            </div>
        );
    }
}
export default TitleBar;