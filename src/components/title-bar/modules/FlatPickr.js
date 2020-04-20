import React from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
export default class Flatpickr extends React.Component {
    constructor(props) {
      super(props);
      this.datePicker = React.createRef();
      this.onChange = this.onChange.bind(this);
      this.state = {
        date: props.date
      }
    }
    onChange(selectedDates, dateStr, instance) {
      this.props.dateChangeCallBack(new Date(selectedDates));
    }
    componentDidMount() {
      flatpickr(this.datePicker.current, {
        defaultDate: this.state.date,
        onChange: this.onChange
      });
    }    
    componentWillReceiveProps(nextProps){
      if(nextProps !== this.props){
        this.props = nextProps;
        this.setState({date: nextProps.date},()=>{
          let fp = flatpickr(this.datePicker.current,{
            defaultDate: this.state.date,
            onChange: this.onChange
          })
          fp.setDate(this.state.date, false);
        });
      }
    }
    yesterday (date){
      let dt = new Date(date);
      return new Date((dt.setDate(dt.getDate()-1)));
    }
    tomorrow (date){
      let dt = new Date(date);
      return new Date((dt.setDate(dt.getDate()+1)));
    }
    render() {
      return(
        <div className="ab_TB_flatpickr">      
            <div className="ab_TB_PreviousDate" onClick={ ()=>{ this.props.dateChangeCallBack(this.yesterday(this.state.date)) }}></div>
            <input key ={this.state.date.toString()} type="date" ref={this.datePicker} />
            <div className="ab_TB_NextDate" onClick={ ()=>{ this.props.dateChangeCallBack(this.tomorrow(this.state.date)) }}></div>
            <div className="ab_TB_resetDate" onClick={ ()=>{ this.props.dateChangeCallBack(new Date()) }}></div>
        </div>
      );
    }
}