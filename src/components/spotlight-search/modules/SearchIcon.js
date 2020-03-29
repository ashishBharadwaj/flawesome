import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import media from "../utils/media";

const SearchIcon = styled.div`
  width: 22px;
  height: 22px;
  margin: 16.5px;
  position: absolute;
  background-size: cover;

  ${media.pc`
    float: left;
    position: static;
  `};

  svg {
    color: #a6a6a6;
  }
`;

export default () => (
  <SearchIcon>
    <FontAwesomeIcon size="2x" icon="search" />
  </SearchIcon>
);
