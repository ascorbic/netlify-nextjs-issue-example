import React from "react";
import styled from "styled-components";

import MainLayout from "../components/MainLayout";

export const Language = ["EN", "CN"] as const;

export type Language = typeof Language[number];

interface IAppContext {
  pageTitle: string;
  setPageTitle: (pageTitle: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

export const AppContext = React.createContext<IAppContext>({
  pageTitle: "",
  setPageTitle: () => {
    throw new Error("setPageTitle has not been initialised");
  },
  language: "EN",
  setLanguage: () => {
    throw new Error("setLanguage has not been initialised");
  },
});

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const AppContextProvider: React.FC = ({ children }) => {
  const [pageTitle, setPageTitle] = React.useState("");
  const [language, setLanguage] = React.useState<Language>("EN");

  return (
    <AppContext.Provider
      value={{
        pageTitle: pageTitle,
        setPageTitle: (pageTitle: string) => setPageTitle(pageTitle),
        language: language,
        setLanguage: (language: Language) => setLanguage(language),
      }}
    >
      <MainLayout>
        <Main>{children}</Main>
      </MainLayout>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
