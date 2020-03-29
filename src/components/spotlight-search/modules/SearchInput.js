import React from "react";
import styled from "styled-components";
import { debounce } from "lodash-es";

import media from "../utils/media";
import SpotlightContext from "./SpotlightContext";

const Input = styled.input`
  margin: 0;
  padding: 0;
  height: 55px;
  color: #ffffff;
  font-size: 1.7em;
  font-weight: 100;
  padding-left: 55px;
  padding-right: 50px;
  box-sizing: border-box;
  border: none !important;
  outline: none !important;
  max-width: 100% !important;
  background-color: transparent;

  ${media.pc`
    padding: 0;
    float: left;
    box-sizing: content-box;
    max-width: 350px !important;
  `};

  &:-ms-input-placeholder {
    color: #a6a6a6;
  }
  &:-moz-placeholder {
    color: #a6a6a6;
  }
  &::-moz-placeholder {
    color: #a6a6a6;
  }
  &::-webkit-input-placeholder {
    color: #a6a6a6;
  }
`;

class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this._performSearch = debounce(this._performSearch, 500);
  }

  _performSearch = searchTerm => {
    this.props.keyUpFunction(searchTerm);
  };

  performSearch = event => {
    this._performSearch(event.target.value);
  };

  render() {
    return (
      <Input
        autoFocus={true}
        placeholder="Search"
        onKeyUp={this.performSearch}
        onKeyDown={this.props.keyDownFunction}
      />
    );
  }
}

export default () => (
  <SpotlightContext.Consumer>
    {({ handleKeyUp, handleKeyDown }) => (
      <SearchInput
        keyUpFunction={handleKeyUp}
        keyDownFunction={handleKeyDown}
      />
    )}
  </SpotlightContext.Consumer>
);
