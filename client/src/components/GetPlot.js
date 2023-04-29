import React, { useState } from 'react';
import { storage } from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function GetPlot() {
  const [charts, setCharts] = useState([]);
  const [fetchingError, setFetchingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCharts(chartType, path) {
    setIsLoading(true);
    const storageRef = storage.ref(path);
    try {
      const fileRefs = await storageRef.listAll();
      const urls = await Promise.all(
        fileRefs.items.map((itemRef) => itemRef.getDownloadURL())
      );
      if (urls.length === 0) {
        setFetchingError('We could not find any charts for this type. It is likely that your dataset cannot be used to generate this type of chart.');
      } else {
        setCharts(urls);
        setFetchingError(false);
      }
    } catch (error) {
      console.log(error);
      setFetchingError(true);
    }
    setIsLoading(false);
  }


  return (

    <div>

    
      <h2>Select a chart:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ChartButton label="Barplot Hv" chartType="chart1" onClick={fetchCharts} path="/plots\categorical\single\barplot_hv" />
        <ChartButton label="Barplot Total" chartType="chart2" onClick={fetchCharts} path="/plots\categorical\single\barplot_total" />
        <ChartButton label="Pie Chart" chartType="chart3" onClick={fetchCharts} path="/plots\categorical\single\piechart" />
        <ChartButton label="Grouped Barplot" chartType="chart4" onClick={fetchCharts} path="/plots\categorical\triple\grouped_barplot" />
        <ChartButton label="Grouped Boxplot" chartType="chart5" onClick={fetchCharts} path="/plots\categorical\triple\grouped_boxplot" />
        <ChartButton label="Grouped Violin" chartType="chart6" onClick={fetchCharts} path="/plots\categorical\triple\grouped_violin" />
        <ChartButton label="WordCloud" chartType="chart7" onClick={fetchCharts} path="/plots\categorical\wordcloud" />
        <ChartButton label="Boxplot" chartType="chart8" onClick={fetchCharts} path="/plots\numeric\all\boxplot" />
        <ChartButton label="Correlogram" chartType="chart9" onClick={fetchCharts} path="/plots\numeric\all\correlogram" />
        <ChartButton label="Heatmap" chartType="chart10" onClick={fetchCharts} path="/plots\numeric\all\heatmap" />
        <ChartButton label="2d Density" chartType="chart11" onClick={fetchCharts} path="/plots\numeric\double\2d_density" />
        <ChartButton label="Scatter" chartType="chart12" onClick={fetchCharts} path="/plots\numeric\double\scatter" />
        <ChartButton label="Histogram Density" chartType="chart13" onClick={fetchCharts} path="/plots\numeric\single\histogram_density" />
        <ChartButton label="Violin" chartType="chart14" onClick={fetchCharts} path="/plots\numeric\all\violin" />
      </div>
      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          <div className="loading-icon" />
          <span style={{ marginLeft: '5px' }}>Fetching images...</span>
        </div>
      )}
      {fetchingError && <p style={{ color: 'red' }}>{fetchingError}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {charts.map((url) => (
          <img
            key={url}
            src={url}
            alt="chart"
            style={{ width: '300px', height: '200px', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}


function ChartButton(props) {
  const { label, chartType, onClick, path } = props;
  return (
    <button
      onClick={() => onClick(chartType, path)}
      style={{
        backgroundColor: '#333',
        color: '#eee',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '10px',
        marginBottom: '10px',
      }}
    >
      <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px' }} />
      {label}
    </button>
  );
}

export default GetPlot;
