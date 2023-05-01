import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

import {  mockBarData as data } from "../../data/mockData";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Tech Stack across different projects " />
      <Box height="75vh">
        <BarChart/>
      </Box>
    </Box>
  );
};

export default Bar;
