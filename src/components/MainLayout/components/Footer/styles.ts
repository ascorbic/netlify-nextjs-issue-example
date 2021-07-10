import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.bluegrey};
  padding: 84px;
`;
