import { useTheme } from "@mui/material";
import { ResponsiveBoxPlot } from "@nivo/boxplot";
import { tokens } from "../theme";

const BoxPlot = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [    {      id: "set 1",      data: [        { x: "A", y: [1, 2, 3, 4, 5] },
        { x: "B", y: [2, 3, 4, 5, 6] },
        { x: "C", y: [3, 4, 5, 6, 7] },
        { x: "D", y: [4, 5, 6, 7, 8] },
        { x: "E", y: [5, 6, 7, 8, 9] },
      ],
    },
    {
      id: "set 2",
      data: [
        { x: "A", y: [2, 3, 4, 5, 6] },
        { x: "B", y: [3, 4, 5, 6, 7] },
        { x: "C", y: [4, 5, 6, 7, 8] },
        { x: "D", y: [5, 6, 7, 8, 9] },
        { x: "E", y: [6, 7, 8, 9, 10] },
      ],
    },
  ];

  return (
    <ResponsiveBoxPlot
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      valueFormat=".2f"
      colors={{ scheme: "nivo" }}
      tooltip={({ id, value, color }) => (
        <strong style={{ color }}>
          {id}: {value}
        </strong>
      )}
      boxWidth={20}
      boxHeight={40}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "X Axis",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Y Axis",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      role="application"
      ariaLabel="Box Plot"
    />
  );
};

export default BoxPlot;
