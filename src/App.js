import React from "react";
import HierarchicalTableTable from "./components/HierarchicalTable";
import { useSelector } from "react-redux";

const App = () => {
  const data = useSelector((state) => state.hierarchical.data);

  return <HierarchicalTableTable data={data} />;
};

export default App;
