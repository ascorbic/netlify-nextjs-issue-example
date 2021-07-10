import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  layouts: ReactGridLayout.Layouts;
  didGridCellWdithChange?: (width: number) => void;
  fixedRowHeight?: number;
}

const GridLayoutContainer = styled(ResponsiveGridLayout)<{
  didChangeWidth: boolean;
}>`
  width: ${({ didChangeWidth }) =>
    // workaround as react-grid-layout overestimates width on first render
    // on subsequent renders due to viewwidth change, react-grid-layout is able to estimate width correctly
    didChangeWidth ? "100%" : "calc(100vw - 0.886%)"};
`;

const GridLayout: React.FC<GridLayoutProps> = ({
  layouts,
  fixedRowHeight,
  didGridCellWdithChange,
  children,
}) => {
  const [didChangeWidth, setDidChangeWidth] = useState(false);
  const [rowHeight, setRowHeight] = useState(fixedRowHeight ?? 0);

  return (
    <GridLayoutContainer
      layouts={layouts}
      breakpoints={{ md: 1200, sm: 768 }}
      cols={{ md: 4, sm: 2 }}
      isDraggable={false}
      isResizable={false}
      margin={[0, 0]}
      rowHeight={rowHeight}
      onWidthChange={(containerWidth: number) => {
        !fixedRowHeight && setRowHeight(containerWidth / 4);
        didGridCellWdithChange && didGridCellWdithChange(containerWidth);
        !didChangeWidth && setDidChangeWidth(true);
      }}
      didChangeWidth={didChangeWidth}
    >
      {children}
    </GridLayoutContainer>
  );
};

export default GridLayout;
