import React, { Component } from "react";
import { groupBy } from "lodash-es";

import Hits from "./modules/Hits";
import Overlay from "./modules/Overlay";
import SearchBar from "./modules/SearchBar";
import SpotlightContext from "./modules/SpotlightContext";
const ipcRenderer = window.electron.ipcRenderer;


const DEFAULT_STATE = {
  hits: {},
  flatHits: [],
  isOpen: false,
  selectedResultIndex: 0
};

class Spotlight extends Component {
  constructor(props){
    super(props);
    ipcRenderer.on('open-search', () => {
      this.state.toggle();
    })
  }
  state = {
    ...DEFAULT_STATE,
    toggle: () => {
      this.setState({ ...DEFAULT_STATE, isOpen: !this.state.isOpen },()=>{ this.props.toggleDoOpen(this.state.isOpen) });
    },
    clearSearch: (close = false) => {
      this.setState({ ...DEFAULT_STATE, isOpen: !close },()=>{ this.props.toggleDoOpen(this.state.isOpen) });
    },
    selectHit: selectedResultIndex => {
      this.setState({ selectedResultIndex }, () => {this.props.searchHit(this.state.flatHits[selectedResultIndex]); this.state.toggle();});
    },
    selectUp: () => {
      const { flatHits, selectedResultIndex } = this.state;

      if (selectedResultIndex > 0) {
        this.setState({ selectedResultIndex: selectedResultIndex - 1 });
        return;
      }

      this.setState({ selectedResultIndex: flatHits.length - 1 });
    },
    selectDown: () => {
      const { flatHits, selectedResultIndex } = this.state;

      if (selectedResultIndex < flatHits.length - 1) {
        this.setState({ selectedResultIndex: selectedResultIndex + 1 });
        return;
      }

      this.setState({ selectedResultIndex: 0 });
    },
    handleKeyUp: input => {
      const { clearSearch, performSearch } = this.state;

      if (!input) {
        return;
      }

      if (!input) {
        clearSearch();
      } else {
        performSearch(input);
      }
    },
    handleKeyDown: event => {
      const { selectUp, selectDown, clearSearch } = this.state;

      // verificamos a tecla ↑ ↓ tab shift+tab ctrl+j ctrl+k
      switch (event.key) {
        case "ArrowUp":
          selectUp();
          event.preventDefault();
          break;
        case "ArrowDown":
          selectDown();
          event.preventDefault();
          break;
        case "k":
          if (event.ctrlKey) {
            selectUp();
          }
          event.preventDefault();
          break;
        case "j":
          if (event.ctrlKey) {
            selectDown();
          }
          event.preventDefault();
          break;
        case "Tab":
          if (event.shiftKey) {
            selectUp();
          } else {
            selectDown();
          }
          event.preventDefault();
          break;
        case "Escape":
          clearSearch(true);
          event.preventDefault();
          break;
      }
    },
    performSearch: async term => {
      ipcRenderer.invoke('getSearchResult', term).then((result) => {
        const flatHits = result.map((card, index) => {
          return {
            ...card,
            flatIndex: index
          };
        });        
        // adding the flatIndex property will come in handy later
        this.setState({
          flatHits: flatHits,
          hits: groupBy(flatHits, "dateKey")
        });
      })
      
    }
  };

  _listenKey = event => {
    const isCtrlSpace = event.keyCode === 32 && event.ctrlKey;
    if (!isCtrlSpace) {
      return;
    }

    this.state.toggle();
  };

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      this.props = nextProps;
      this.setState({isOpen: nextProps.doOpen});
    }    
  }
  componentWillUnmount() {
    document.body.removeEventListener("keydown", this._listenKey);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this._listenKey);
  }
  render() {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <SpotlightContext.Provider value={this.state}>
        <Overlay>
          <SearchBar />
          <Hits />
        </Overlay>
      </SpotlightContext.Provider>
    );
  }
}

export default Spotlight;
