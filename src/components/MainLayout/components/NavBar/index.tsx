import { useContext } from "react";

import { AppContext } from "../../../../contexts/AppContext";
import LanguageSwitcher from "./LanguageSwitcher";
import * as Styles from "./styles";

const NavBar: React.FC = () => {
  const { pageTitle } = useContext(AppContext);

  return (
    <Styles.NavBarContainer>
      <Styles.PageTitle>{pageTitle}</Styles.PageTitle>
      <LanguageSwitcher />
    </Styles.NavBarContainer>
  );
};

export default NavBar;
