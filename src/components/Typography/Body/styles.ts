import styled from "styled-components";

export const BODY_VARIANTS = {
  regular: "regular",
  small: "small",
  smallest: "smallest",
};

interface IBodyStyle {
  fontSize: number;
  fontWeight: number | string;
  lineHeight: number;
}

export const BODY_STYLES: Record<string, IBodyStyle> = {
  regular: {
    fontSize: 24,
    fontWeight: "normal",
    lineHeight: 28.13,
  },
  small: {
    fontSize: 20,
    fontWeight: 300,
    lineHeight: 23.44,
  },
  smallest: {
    fontSize: 18,
    fontWeight: 300,
    lineHeight: 21.09,
  },
};

export type bodyType = "regular" | "small" | "smallest";

export interface BodyProps {
  /** Sets the Paragraph's font-weight to bold */
  bold?: boolean;
  /** Sets the Paragraph's color */
  color?: string;
  /** Display ellipsis when the title overflows */
  ellipsis?: boolean;
  /** Sets the Paragraph's variant */
  variant?: bodyType;
  /** Adds a line-height value to the paragraph */
  shouldSetLineHeight?: boolean;
}

export interface StyledBodyProps extends BodyProps {
  variant: bodyType;
}

export const StyledBody = styled.p<StyledBodyProps>`
  margin: 0;
  font-size: ${({ variant }) => BODY_STYLES[variant].fontSize}px;
  line-height: ${({ variant, shouldSetLineHeight }) =>
    shouldSetLineHeight ? `${BODY_STYLES[variant].lineHeight}px` : "normal"};
  font-weight: ${({ bold, variant }) =>
    bold ? "bold" : BODY_STYLES[variant].fontWeight};
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${({ color }) => color};

  ${({ ellipsis }) => {
    if (ellipsis) {
      return `
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `;
    }
  }}
`;
