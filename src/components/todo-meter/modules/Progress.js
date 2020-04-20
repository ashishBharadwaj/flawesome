import React from "react";

import styles from "../styles/Progress.module.scss";

export default class Progress extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items: props.items,
      paused: props.paused, 
      completed: props.completed,      
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      this.props = nextProps;
      this.setState({
        items: nextProps.items,
        paused: nextProps.paused, 
        completed: nextProps.completed,    
      });
    }
  }
  render(){
    const totalAmount = this.state.items.length;
    const completedAmount = this.state.completed.length;
    const pausedAmount = this.state.paused.length;

    let completedPercentage = completedAmount / totalAmount;
    let pausedPercentage = pausedAmount / totalAmount + completedPercentage;

    if (isNaN(completedPercentage)) {
      completedPercentage = 0;
    }

    if (isNaN(pausedPercentage)) {
      pausedPercentage = 0;
    }

    return (
      <div className={styles.progress}>
        <div
          className={`${styles.progressbar} ${styles.paused}`}
          style={{ width: `${pausedPercentage * 100}%` }}
        ></div>
        <div
          className={`${styles.progressbar} ${styles.completed}`}
          style={{ width: `${completedPercentage * 100}%` }}
        ></div>
      </div>
    );
  }


  
}

