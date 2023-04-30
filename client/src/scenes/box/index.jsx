import { Box } from "@mui/material";
import Header from "../../components/Header";
import Boxplot from "../../components/BoxPlot";

const BoxChart = () => {
  return (
    <Box m="20px">
      <Header title="Boxplot" subtitle="Simple Boxplot Chart" />
      <Box height="75vh">
        <Boxplot />
      </Box>
    </Box>
  );
};

export default BoxChart;
