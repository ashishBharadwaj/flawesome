import React from "react";
import styled from "styled-components";

import SearchIcon from "./SearchIcon";
import SearchInput from "./SearchInput";

const SearchBar = styled.div`
  z-index: 10;
  height: 55px;
  position: relative;
  background-color: rgba(0, 21, 41, 0.97);
`;

export default () => {
  return (
    <SearchBar>
      <SearchIcon />
      <SearchInput />
    </SearchBar>
  );
};
