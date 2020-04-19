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
    render() {
      return(
        <input key ={this.state.date.toString()} type="date" ref={this.datePicker} />
      );
    }
}