import React from "react";
import styled from "styled-components";

import SpotlightContext from "./SpotlightContext";

import media from "../utils/media";

const List = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  user-select: none;
  position: absolute;
  height: calc(100% - 55px);
  border-right: 1px solid #515253;
  background-color: rgba(0, 20, 41, 0.97);

 

  ul {
    min-height: calc(100% - 55px);
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    width: 100%;
    list-style-type: none;
  }
`;

const ResultHeader = styled.div`
  color: #ffffff;
  font-size: 12px;
  padding: 4px 0 2px 25px;
  text-transform: uppercase;
  background-color: rgba(53, 75, 84, 0.97);
`;

const Hit = styled.li`
  color: #ffffff;
  cursor: pointer;
  font-size: 12px;
  padding: 6px 6px 6px 25px !important;

  ${props => props.selected && `color: #ffffff; background-color: #0093f8;`};
`;

export default () => (
  <SpotlightContext.Consumer>
    {({ hits, selectedResultIndex, selectHit }) => (
      <List>
        <ul>
          {Object.keys(hits).map(hitKey => {
            if (hits[hitKey].length === 0) {
              return null;
            }

            return (
              <li key={`hit-group-${hitKey}`}>
                <ResultHeader>{hitKey}</ResultHeader>
                <ul>
                  {hits[hitKey].map(hit => (
                    <Hit
                      key={`hit-${hit.id}`}
                      selected={hit.flatIndex === selectedResultIndex}
                      onClick={selectHit.bind(this, hit.flatIndex)}
                    >
                      {hit.searchContent}
                    </Hit>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </List>
    )}
  </SpotlightContext.Consumer>
);
