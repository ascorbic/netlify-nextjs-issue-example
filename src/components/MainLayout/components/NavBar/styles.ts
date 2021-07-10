import styled from "styled-components";

import Body from "../../../Typography/Body";
import Title from "../../../Typography/Title";

export const NavBarContainer = styled.nav`
  display: flex;
  flex-direction: row;

  padding: 90px 52px;

  * {
    flex: 0 auto;
    margin-top: auto;
    margin-bottom: auto;
  }

  &&& {
    svg {
      width: 42px;
      height: 32px;
    }
  }
`;

export const PageTitle = styled(Title).attrs({
  tag: "h1",
})`
  flex: 1 auto;
`;

export const ContactMenuItem = styled(Body).attrs({
  variant: "regular",
})`
  margin-right: 76px;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  margin-right: 75px;
`;
