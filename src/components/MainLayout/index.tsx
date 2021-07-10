import React from "react";
import { ThemeProvider } from "styled-components";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { theme } from "./theme";

const MainLayout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
        <div style={{ minHeight: "100vh" }}>{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
