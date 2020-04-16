import React from 'react';
import WindowsControl from './WindowsControl'
import Flatpickr from "./FlatPickr";
import '../styles/TitleBar.css'
class TitleBar extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.props = nextProps;
        }
    }
    render(){
        return(
            <div className="ab_TitleBar">
                <div className = "ab_TB_Options"> 
                </div>
                <div className = "ab_TB_DatePicker">
                    <Flatpickr date = {this.props.date} dateChangeCallBack = {this.props.dateChangeCallBack}/>
                </div>    
                <WindowsControl/>            
            </div>
        );
    }
}
export default TitleBar;