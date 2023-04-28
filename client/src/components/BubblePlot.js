import React, { useState } from "react";
import Plot from "react-plotly.js";

export default function BubblePlot({ data }) {
  const [plotData, setPlotData] = useState([]);

  const parseData = (data) => {
    const x = data.map((d) => d.x);
    const y = data.map((d) => d.y);
    const z = data.map((d) => d.z);
    const text = data.map((d) => d.text);

    const trace = {
      x,
      y,
      text,
      mode: "markers",
      marker: {
        size: z,
        sizemode: "diameter",
        sizeref: 0.1,
        color: z,
        colorscale: "Jet",
        colorbar: {
          title: "Z",
        },
      },
    };

    setPlotData([trace]);
  };

  useState(() => {
    parseData(data);
  }, [data]);

  return (
    <div>
      <Plot data={plotData} layout={{ title: "Bubble Plot" }} />
    </div>
  );
}
