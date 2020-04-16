import React from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
export default class Flatpickr extends React.Component {
    constructor(props) {
      super(props);
      this.datePicker = React.createRef();
      this.onChange = this.onChange.bind(this);
    }
    onChange(selectedDates, dateStr, instance) {
      this.props.dateChangeCallBack(new Date(selectedDates));
    }
    componentDidMount() {
      flatpickr(this.datePicker.current, {
        defaultDate: this.props.date,
        onChange: this.onChange
      });
    }
    componentWillReceiveProps(nextProps){
      if(nextProps !== this.props){
        this.props = nextProps;
      }
    }
    render() {
      return(
        <input type="date" ref={this.datePicker} />
      );
    }
}