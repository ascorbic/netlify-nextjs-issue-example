import React, { useContext } from "react";

import { AppContext } from "../../../../../contexts/AppContext";
import * as Styles from "./styles";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useContext(AppContext);
  const isEnglish = language === "EN";

  return (
    <Styles.LangaugeSwitcherContainer>
      <Styles.EnglishOption
        variant="smallest"
        onClick={() => setLanguage("EN")}
        isActive={isEnglish}
      >
        ENG
      </Styles.EnglishOption>
      <Styles.LanguageOptionDivider> </Styles.LanguageOptionDivider>
      <Styles.ChineseOption
        variant="smallest"
        onClick={() => setLanguage("CN")}
        isActive={!isEnglish}
      >
        简体
      </Styles.ChineseOption>
    </Styles.LangaugeSwitcherContainer>
  );
};

export default LanguageSwitcher;
