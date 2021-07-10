import Image from "next/image";
import styled, { css } from "styled-components";

export const CellContainer = styled.div<{ isCenter: boolean }>`
  border-top: 0.5px solid ${({ theme }) => theme.colors.bluegrey};
  border-left: 0.5px solid ${({ theme }) => theme.colors.bluegrey};
  box-sizing: border-box;

  ${({ isCenter }) =>
    isCenter &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`;

export const CellBackgroundImage = styled(Image).attrs({
  layout: "fill",
  objectFit: "cover",
})`
  z-index: -1;
`;
