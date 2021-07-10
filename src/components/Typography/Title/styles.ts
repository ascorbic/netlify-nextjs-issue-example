import styled, { css } from "styled-components";

import { ITitleTag } from "./index";

export const TITLE_STYLES = {
  h1: {
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 56.25,
  },
  h2: {
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 42.19,
  },
  h3: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 28.13,
  },
  h4: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 28.13,
  },
  h5: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 28.13,
  },
  h6: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 28.13,
  },
};

interface TitleProps {
  as: ITitleTag;
  color?: string;
  ellipsis?: boolean;
  uppercase?: boolean;
}

export const StyledTitle = styled.h1<TitleProps>`
  margin: 0;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.color};
  text-transform: ${(props) => {
    if (props.uppercase) return "uppercase";
  }};

  ${({ as }) => css`
    font-size: ${TITLE_STYLES[as].fontSize}px;
    font-weight: ${TITLE_STYLES[as].fontWeight};
    line-height: ${TITLE_STYLES[as].lineHeight}px;
  `}

  ${({ ellipsis }) => {
    if (ellipsis) {
      return css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `;
    }
  }}
`;
