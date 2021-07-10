import { Property } from "csstype";
import React from "react";

import Title, { ITitleTag } from "../Typography/Title";
import * as Styles from "./styles";

interface GridCellProps {
  backgroundImage?: string;
  backgroundImageAlt?: string;
  center?: boolean;
  title?: string;
  titleTag?: ITitleTag;
  padding?: Property.Padding;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const GridCell = React.forwardRef<HTMLDivElement, GridCellProps>(
  (
    {
      backgroundImage,
      backgroundImageAlt,
      center = false,
      title,
      titleTag = "h1",
      padding = "25px",
      onClick,
      className,
      style,
      children,
    },
    ref
  ) => {
    return (
      <Styles.CellContainer
        className={className}
        style={{ padding: backgroundImage ? 0 : padding, ...style }}
        ref={ref}
        isCenter={center}
        onClick={onClick}
      >
        {backgroundImage && (
          <Styles.CellBackgroundImage
            alt={backgroundImageAlt}
            src={backgroundImage}
          />
        )}
        {title && (
          <Title style={{ marginTop: 12 }} tag={titleTag}>
            {title}
          </Title>
        )}
        {children}
      </Styles.CellContainer>
    );
  }
);

export default GridCell;
