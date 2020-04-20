import React from "react";
import ItemList from './ItemList';
export default class TodoMeter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: props.date,
            items: props.toDoItems,
            pending: props.toDoItems.filter(item => item.status === "pending"),
            paused: props.toDoItems.filter(item => item.status === "paused"),
            completed: props.toDoItems.filter(item => item.status === "completed")
        };
        this.resetItems = this.resetItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.props = nextProps;
            this.setState({
                date: nextProps.date,
                items: nextProps.toDoItems,
                pending: nextProps.toDoItems.filter(item => item.status === "pending"),
                paused: nextProps.toDoItems.filter(item => item.status === "paused"),
                completed: nextProps.toDoItems.filter(item => item.status === "completed")
            })
        }
    }
    resetItems(){
        const newItems = this.state.items
        .map(i => {
          if (i.status === "paused" || i.status === "completed") {
            return Object.assign({}, i, {
              status: "pending"
            });
          }
          return i;
        });
        this.setState({items: newItems}, ()=>{ this.props.itemChangeCallback(this.state.items) })
    }
    deleteItem(item){
        this.setState(
            {items: this.state.items.filter(itm => itm.key !== item.key)},
            ()=>{ this.props.itemChangeCallback(this.state.items) }
        )
    }    
    updateItem(item, newStatus){
        const newItems = this.state.items.map(i => {
            if (i.key === item.key) {
              return Object.assign({}, i, {
                status: newStatus
              });
            }
            return i;
        });
        this.setState({items: newItems}, ()=>{ this.props.itemChangeCallback(this.state.items) })
    }
    addItem(newItem){
        this.setState({items: this.state.items.concat(newItem)}, ()=>{ this.props.itemChangeCallback(this.state.items) })
    }

    render(){
        return(
            <div className="ab_TodoMeter">
                <ItemList items={this.state.items} 
                    pending = {this.state.pending}
                    paused = {this.state.paused}
                    completed = {this.state.completed}
                    callBacks = {{
                        resetItemsCallback:this.resetItems,
                        deleteItemCallback: this.deleteItem,
                        updateItemCallback: this.updateItem,
                        addItemCallback: this.addItem
                    }} />
            </div>
        );
    }
}