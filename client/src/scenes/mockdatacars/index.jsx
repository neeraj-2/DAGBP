import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataCars } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const MockDataCars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [    { field: "id", headerName: "ID", flex: 0.5 },    { field: "mpg", headerName: "MPG" },    { field: "cyl", headerName: "Cylinders" },    { field: "disp", headerName: "Displacement" },    { field: "hp", headerName: "Horsepower" },    { field: "drat", headerName: "Rear Axle Ratio" },    { field: "wt", headerName: "Weight (1000 lbs)" },    { field: "qsec", headerName: "1/4 Mile Time" },    { field: "vs", headerName: "Engine (0 = V-shaped, 1 = straight)" },    { field: "am", headerName: "Transmission (0 = automatic, 1 = manual)" },    { field: "gear", headerName: "Number of Gears" },    { field: "carb", headerName: "Number of Carburetors" },  ];

  return (
    <Box m="20px">
      <Header
        title="Default Data"
        subtitle="Sample data we used to create different visualizations for the project."
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataCars}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default MockDataCars;
