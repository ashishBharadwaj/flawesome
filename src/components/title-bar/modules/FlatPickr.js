import React from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
export default class Flatpickr extends React.Component {
    constructor(props) {
      super(props);
      this.datePicker = React.createRef();
      this.state = { date: this.props.date}
    }
    onChange(selectedDates, dateStr, instance) {
      console.log(selectedDates);
    }
    componentDidMount() {
      flatpickr(this.datePicker.current, {
        defaultDate: this.state.date,
        onChange: this.onChange
      });
    }
    componentWillReceiveProps(nextProps){
      if(nextProps !== this.props){
        this.setState({date: nextProps.date})
      }
    }
    render() {
      return(
        <input type="date" ref={this.datePicker} />
      );
    }
}