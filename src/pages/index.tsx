import React, { useContext, useEffect } from "react";

import GridLayout from "../components/GridLayout";
import GridCell from "../components/GridLayout/GridCell";
import { AppContext } from "../contexts/AppContext";

const Home: React.FC = () => {
  const { setPageTitle } = useContext(AppContext);

  useEffect(() => {
    setPageTitle("Home");
  }, [setPageTitle]);

  const layout = {
    md: [{ i: "1", x: 0, y: 0, w: 2, h: 1 }],
  };

  return (
    <GridLayout layouts={layout}>
      <GridCell key="1" backgroundImage="/expertise.png" />
    </GridLayout>
  );
};

export default Home;
