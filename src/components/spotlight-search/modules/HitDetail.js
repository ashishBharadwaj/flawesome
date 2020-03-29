import React from "react";
import styled from "styled-components";

import SpotlightContext from "./SpotlightContext";

import media from "../utils/media";

const DetailContainer = styled.div`
  width: 390px;
  height: 375px;
  display: none;
  color: #ffffff;
  overflow-y: auto;
  margin-left: 290px;
  background-color: ${props => props.theme.detailBg};

  ${media.pc`display: block;`};
`;

const Detail = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img`
  height: 250px;
  border-radius: 15px;
`;

const Title = styled.h1`
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default () => (
  <SpotlightContext.Consumer>
    {({ flatHits, selectedResultIndex }) => {
      const hit = flatHits[selectedResultIndex];

      return (
        <DetailContainer>
          <Detail>
            <Image src={hit.imageUrl} alt={hit.name} />
            <Title>{hit.name}</Title>
            <span>{hit.type}</span>
            <span>{hit.setName}</span>
          </Detail>
        </DetailContainer>
      );
    }}
  </SpotlightContext.Consumer>
);
