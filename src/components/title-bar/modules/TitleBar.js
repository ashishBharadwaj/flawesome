import React from 'react';
import WindowsControl from './WindowsControl'
import Flatpickr from "./FlatPickr";
import '../styles/TitleBar.css'
class TitleBar extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){

    }
    render(){
        return(
            <div className="ab_TitleBar">
                <div className = "ab_TB_Options"> 
                </div>
                <div className = "ab_TB_DatePicker">
                    <Flatpickr date = {this.props.date}/>
                </div>    
                <WindowsControl/>            
            </div>
        );
    }
}
export default TitleBar;