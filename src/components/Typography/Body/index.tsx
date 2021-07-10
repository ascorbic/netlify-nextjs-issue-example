import React from "react";

import { BodyProps, StyledBody } from "./styles";

export const Body: React.FC<Props> = ({
  className,
  children,
  variant = "regular",
  bold = false,
  color = "#000000",
  ellipsis = false,
  shouldSetLineHeight = false,
  ...restProps
}) => {
  return (
    <StyledBody
      className={className}
      variant={variant}
      bold={bold}
      color={color}
      ellipsis={ellipsis}
      shouldSetLineHeight={shouldSetLineHeight}
      {...restProps}
    >
      {children}
    </StyledBody>
  );
};

export interface Props extends BodyProps {
  className?: string;
  children: React.ReactNode;
  shouldSetLineHeight?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default Body;
