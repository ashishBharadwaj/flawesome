import React from "react";
import styled from "styled-components";

import HitList from "./HitList";
import HitDetail from "./HitDetail";
import SpotlightContext from "./SpotlightContext";

const Hits = styled.div`
  max-height: 0;
  min-height: 0;
  overflow: hidden;
  transition: all 0.3s;
  background-color: rgba(0, 20, 41, 0.97);

  ${props =>
    props.open &&
    `
    min-height: 375px;
    max-height: 400px;
    border-top: 1px solid #515253;
  `};
`;

export default () => (
  <SpotlightContext.Consumer>
    {({ flatHits }) => {
      const hasResults = flatHits.length > 0;

      return (
        <Hits open={hasResults}>
          {hasResults ? (
              <HitList />
          ) : null}
        </Hits>
      );
    }}
  </SpotlightContext.Consumer>
);
