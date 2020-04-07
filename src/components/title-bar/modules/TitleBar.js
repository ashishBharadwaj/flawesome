import React from 'react';
import '../styles/TitleBar.css'
class TitleBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: props.date}
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){

    }
    render(){
        return(
            <div className='ab_TitleBar'>

            </div>
        );
    }
}
export default TitleBar;