import { css } from "styled-components";

export default {
  pc: (...args) => css`
    @media only screen and (min-width: 680px) {
      ${css(...args)};
    }
  `,

  tablet: (...args) => css`
    @media only screen and (max-width: 1279px) {
      ${css(...args)};
    }
  `,

  phone: (...args) => css`
    @media only screen and (max-width: 660px) {
      ${css(...args)};
    }
  `
};
