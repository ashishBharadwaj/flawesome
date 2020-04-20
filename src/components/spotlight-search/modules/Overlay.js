import styled from "styled-components";

import media from "../utils/media";

export default styled.div`
  top: 30%;
  left: 1%;
  width: 98%;
  z-index: 100;
  font-size: 12px;
  overflow: hidden;
  border-radius: 6px;
  position: absolute;
  letter-spacing: 0.3px;
  font-family: Verdana, "Lucida Sans Unicode", sans-serif;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);

  ${media.pc`
    left: 50%;
    width: 680px;
    margin-left: -340px;
  `};
`;
