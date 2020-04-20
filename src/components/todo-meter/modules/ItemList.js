import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from "@reach/accordion";
import "@reach/accordion/styles.css";

import Progress from "./Progress";
import AddItemForm from "./AddItemForm";
import Item from "./Item";
import styles from "../styles/ItemList.module.scss";
import arrow from "../media/arrow.svg";
import alldone from "../media/alldone.svg";
import {Classes} from "@blueprintjs/core";


export default class ItemList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: props.items,
      pending: props.pending,
      paused: props.paused,
      completed: props.completed
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      this.props = nextProps;
      this.setState({
        items: nextProps.items,
        pending: nextProps.pending,
        paused: nextProps.paused,
        completed: nextProps.completed
      });
    }
  }

  render(){
    return (
      <div className="item-list">
        <Progress items={ this.state.items } paused={this.state.paused} completed={this.state.completed} />
        <AddItemForm addItemCallback = {this.props.callBacks.addItemCallback} />
        {this.state.pending.length > 0 ? (
          <>
            {this.state.pending.map(item => {
              return <Item callBacks = {this.props.callBacks} item={item} key={item.key} />;
            })}
          </>
        ) : (
          <div className={styles.alldone}>
            <img className={Classes.ELEVATION_4} src={alldone} alt="Nothing to do!" />
          </div>
        )}
        <Accordion collapsible multiple>
          {this.state.paused.length > 0 && (
            <AccordionItem>
              <AccordionButton className={styles.toggle}>
                <img src={arrow} alt="Do Later Toggle" />
                <span>Do Later</span>
              </AccordionButton>
              <AccordionPanel className={styles.panel}>
                {this.state.paused &&
                  this.state.paused.map(item => {
                    return <Item item={item} key={item.key} callBacks={this.props.callBacks}/>;
                  })}
              </AccordionPanel>
            </AccordionItem>
          )}
          {this.state.completed.length > 0 && (
            <AccordionItem>
              <AccordionButton className={styles.toggle}>
                <img src={arrow} alt="Completed Toggle" /> <span>Completed</span>
              </AccordionButton>
              <AccordionPanel className={styles.panel}>
                {this.state.completed &&
                  this.state.completed.map(item => {
                    return <Item item={item} key={item.key} callBacks={this.props.callBacks}/>;
                  })}
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
  
        {(this.state.completed.length > 0 || this.state.paused.length > 0) && (
          <div className={styles.reset}>
            <button className = {Classes.ELEVATION_4}
              onClick={() => {
                this.props.callBacks.resetItemsCallback();
              }}
            >
              Reset Progress
            </button>
          </div>
        )}
      </div>
    );
  }
  
}
