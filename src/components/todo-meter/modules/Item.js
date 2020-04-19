import React from "react";
import styles from "../styles/Item.module.scss";

// Individual todo item
export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      item: props.item,
      text: props.item.text,
      paused: props.item.status === "paused",
      completed: props.item.status === "completed"
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      this.props = nextProps;
      this.setState({
        item: nextProps.item,
        text: nextProps.item.text,
        paused: nextProps.item.status === "paused",
        completed: nextProps.item.status === "completed"
      })
    }
  }

  render(){
    return (
      <div className={styles.item} tabIndex="0">
        <div className={styles.itemName}>{this.state.text}</div>
        <div
          className={`${styles.buttons} ${this.state.completed ? styles.completedButtons : ""}`}
        >
          <button className={styles.delete} onClick={ ()=>{ this.props.callBacks.deleteItemCallback(this.state.item) } } tabIndex="0"></button>
          {!this.state.paused && !this.state.completed && (
            <button className={styles.pause} onClick={ ()=>{ this.props.callBacks.updateItemCallback(this.state.item, "paused") } } tabIndex="0"></button>
          )}
          {this.state.paused && !this.state.completed && (
            <button
              className={styles.resume}
              onClick={ ()=>{ this.props.callBacks.updateItemCallback(this.state.item, "pending") }}
              tabIndex="0"
            ></button>
          )}
          {!this.state.completed && (
            <button
              className={styles.complete}
              onClick={ ()=>{ this.props.callBacks.updateItemCallback(this.state.item, "completed") }}
              tabIndex="0"
            ></button>
          )}
        </div>
      </div>
    );
  }

  
}