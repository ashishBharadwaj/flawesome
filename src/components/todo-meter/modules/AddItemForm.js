import React from "react";

import styles from "../styles/AddItemForm.module.scss";

// Form to populate todo items
export default class AddItemForm extends React.Component{
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    const newItem = {
      text: this.inputRef.current.value,
      key: Date.now(),
      status: "pending"
    };
    if (!!newItem.text.trim()) {
      this.props.addItemCallback(newItem)
    }
    e.preventDefault();
    this.inputRef.current.value = "";
    this.inputRef.current.focus();
  }

  render(){
    return (
      <form className={styles.form} onSubmit={this.addItem}>
        <input ref={this.inputRef} placeholder="Add new item" autoFocus />
        <button type="submit" />
      </form>
    );
  }  
}

