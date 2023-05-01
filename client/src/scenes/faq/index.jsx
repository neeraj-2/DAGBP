import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import UploadCSV from "../../components/UploadCSV";
import GetPlot from "../../components/GetPlot";
import { storage } from '../../components/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";



const FAQ = () => {
  const theme = useTheme();


  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
  };
  const colors = tokens(theme.palette.mode);
  // const [charts, setCharts] = useState([]);
  // const [fetchingError, setFetchingError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);


  const [fetchingErrorBarplotHv, setFetchingErrorBarplotHv] = useState(false);
  const [isLoadingBarplotHv, setIsLoadingBarplotHv] = useState(false);
  const [chartsBarplotHv, setChartsBarplotHv] = useState([]);

  const [fetchingErrorBarplotTotal, setFetchingErrorBarplotTotal] = useState(false);
  const [isLoadingBarplotTotal, setIsLoadingBarplotTotal] = useState(false);
  const [chartsBarplotTotal, setChartsBarplotTotal] = useState([]);

  const [fetchingErrorPieChart, setFetchingErrorPieChart] = useState(false);
  const [isLoadingPieChart, setIsLoadingPieChart] = useState(false);
  const [chartsPieChart, setChartsPieChart] = useState([]);

  const [fetchingErrorGroupedBarplot, setFetchingErrorGroupedBarplot] = useState(false);
  const [isLoadingGroupedBarplot, setIsLoadingGroupedBarplot] = useState(false);
  const [chartsGroupedBarplot, setChartsGroupedBarplot] = useState([]);

  const [fetchingErrorGroupedBoxplot, setFetchingErrorGroupedBoxplot] = useState(false);
  const [isLoadingGroupedBoxplot, setIsLoadingGroupedBoxplot] = useState(false);
  const [chartsGroupedBoxplot, setChartsGroupedBoxplot] = useState([]);

  const [fetchingErrorGroupedViolin, setFetchingErrorGroupedViolin] = useState(false);
  const [isLoadingGroupedViolin, setIsLoadingGroupedViolin] = useState(false);
  const [chartsGroupedViolin, setChartsGroupedViolin] = useState([]);

  const [fetchingErrorWordCloud, setFetchingErrorWordCloud] = useState(false);
  const [isLoadingWordCloud, setIsLoadingWordCloud] = useState(false);
  const [chartsWordCloud, setChartsWordCloud] = useState([]);

  const [fetchingErrorBoxplot, setFetchingErrorBoxplot] = useState(false);
  const [isLoadingBoxplot, setIsLoadingBoxplot] = useState(false);
  const [chartsBoxplot, setChartsBoxplot] = useState([]);

  const [fetchingErrorCorrelogram, setFetchingErrorCorrelogram] = useState(false);
  const [isLoadingCorrelogram, setIsLoadingCorrelogram] = useState(false);
  const [chartsCorrelogram, setChartsCorrelogram] = useState([]);

  const [fetchingErrorHeatmap, setFetchingErrorHeatmap] = useState(false);
  const [isLoadingHeatmap, setIsLoadingHeatmap] = useState(false);
  const [chartsHeatmap, setChartsHeatmap] = useState([]);

  const [fetchingError2dDensity, setFetchingError2dDensity] = useState(false);
  const [isLoading2dDensity, setIsLoading2dDensity] = useState(false);
  const [charts2dDensity, setCharts2dDensity] = useState([]);

  const [fetchingErrorScatter, setFetchingErrorScatter] = useState(false);
  const [isLoadingScatter, setIsLoadingScatter] = useState(false);
  const [chartsScatter, setChartsScatter] = useState([]);

  const [fetchingErrorHistogramDensity, setFetchingErrorHistogramDensity] = useState(false);
  const [isLoadingHistogramDensity, setIsLoadingHistogramDensity] = useState(false);
  const [chartsHistogramDensity, setChartsHistogramDensity] = useState([]);

  const [fetchingErrorViolin, setFetchingErrorViolin] = useState(false);
  const [isLoadingViolin, setIsLoadingViolin] = useState(false);
  const [chartsViolin, setChartsViolin] = useState([]);



  async function fetchCharts(chartType, path, setCharts, setIsLoading, setFetchingError) {
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
    <Box m="20px">
      <Header title="Let's Visualize" subtitle="Upload your CSV Data" />
      <UploadCSV success={success} onUpdateSuccess={handleSuccess} />
      {/* if success is tue  */}
      {success && (
        <Box
          sx={{

            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Bar Plot HV
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  We produce horizontal barplot if the number of classes exceed 6. If not vertical barplot is produced.
                </Typography>
                <ChartButton
                  label="Bar Plot HV"
                  chartType="barplot_hv"
                  onClick={fetchCharts}
                  path="/plots\categorical\single\barplot_hv"
                  setCharts={setChartsBarplotHv}
                  setIsLoading={setIsLoadingBarplotHv}
                  setFetchingError={setFetchingErrorBarplotHv}
                />
              </div>
              {isLoadingBarplotHv && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorBarplotHv && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorBarplotHv}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsBarplotHv.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>



          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Bar Plot Total
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  The combined barplot is displayed.
                </Typography>
                <ChartButton label="Barplot Total" chartType="chart2" onClick={fetchCharts} path="/plots\categorical\single\barplot_total"
                  setCharts={setChartsBarplotTotal}
                  setIsLoading={setIsLoadingBarplotTotal}
                  setFetchingError={setFetchingErrorBarplotTotal}
                />
              </div>
              {isLoadingBarplotTotal && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorBarplotTotal && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorBarplotHv}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsBarplotTotal.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>




          {/* pie chart */}


          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Pie Chart
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>

                  A pie chart is a circular statistical graphic that is used to display data as a proportion of the whole.
                </Typography>

                <ChartButton label="Pie Chart" chartType="chart3" onClick={fetchCharts} path="/plots\categorical\single\piechart"
                  setCharts={setChartsPieChart}
                  setIsLoading={setIsLoadingPieChart}
                  setFetchingError={setFetchingErrorPieChart}
                />

              </div>
              {isLoadingPieChart && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorPieChart && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorPieChart}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsPieChart.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>
          {/* grouped barplot */}

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Grouped Bar Plot
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  Grouped barplot is a type of barplot that displays grouped bars side by side, each group corresponding to a unique value of a categorical variable. Each bar in a group corresponds to a unique value of a second categorical variable, and its height represents the count or the mean value of a numerical variable.
                </Typography>
                <ChartButton label="Grouped Barplot" chartType="chart4" onClick={fetchCharts} path="/plots\categorical\triple\grouped_barplot"
                  setCharts={setChartsGroupedBarplot}
                  setIsLoading={setIsLoadingGroupedBarplot}
                  setFetchingError={setFetchingErrorGroupedBarplot}
                />
              </div>
              {isLoadingGroupedBarplot && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorGroupedBarplot && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorGroupedBarplot}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsGroupedBarplot.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>
          {/* grouped boxplot */}

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Grouped Box Plot
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  Grouped boxplots are similar to grouped barplots, but instead of showing the distribution of numerical values using bars, they use box-and-whisker plots.
                </Typography>
                <ChartButton label="Grouped Boxplot" chartType="chart5" onClick={fetchCharts} path="/plots\categorical\triple\grouped_boxplot"
                  setCharts={setChartsGroupedBoxplot}
                  setIsLoading={setIsLoadingGroupedBoxplot}
                  setFetchingError={setFetchingErrorGroupedBoxplot}
                />
              </div>
              {isLoadingGroupedBoxplot && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorGroupedBoxplot && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorGroupedBoxplot}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsGroupedBoxplot.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>
          {/* grouped VIOLINT */}

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Grouped Violin Plot
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  A grouped violin plot is a visualization technique that is used to compare multiple groups of data with respect to their distribution. It is similar to a grouped boxplot, but instead of using boxes and whiskers, it uses violin-shaped distributions to show the density of the data.
                </Typography>
                <ChartButton label="Grouped Violin" chartType="chart6" onClick={fetchCharts} path="/plots\categorical\triple\grouped_violin"
                  setCharts={setChartsGroupedViolin}
                  setIsLoading={setIsLoadingGroupedViolin}
                  setFetchingError={setFetchingErrorGroupedViolin}
                />
              </div>
              {isLoadingGroupedViolin && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorGroupedViolin && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorGroupedViolin}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsGroupedViolin.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>

          {/* wordcloud */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Wordcloud
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  A word cloud is a visual representation of text data in which the most frequent words are displayed in larger fonts and the less frequent words in smaller fonts
                </Typography>
                <ChartButton label="WordCloud" chartType="chart7" onClick={fetchCharts} path="/plots\categorical\wordcloud"
                  setCharts={setChartsWordCloud}
                  setIsLoading={setIsLoadingWordCloud}
                  setFetchingError={setFetchingErrorWordCloud}
                />
              </div>
              {isLoadingWordCloud && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorWordCloud && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorWordCloud}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsWordCloud.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>

          {/* boxplot */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Box Plot
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  A boxplot is a type of chart that displays the distribution of a dataset. It consists of a box with whiskers extending from the top and bottom. The box represents the interquartile range (IQR), which is the range between the first and third quartiles of the dataset. The whiskers extend to the highest and lowest values within 1.5 times the IQR from the first and third quartiles. Any outliers beyond that range are displayed as individual points.
                </Typography>
                <ChartButton label="Boxplot" chartType="chart8" onClick={fetchCharts} path="/plots\numeric\all\boxplot"
                  setCharts={setChartsBoxplot}
                  setIsLoading={setIsLoadingBoxplot}
                  setFetchingError={setFetchingErrorBoxplot}
                />

              </div>
              {isLoadingBoxplot && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorBoxplot && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorBoxplot}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsBoxplot.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>
          {/* correlogram */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Correlogram
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  A correlogram is a graphical representation of a correlation matrix, where the values in the matrix represent the correlation between two variables. Correlograms are often used in exploratory data analysis to visualize the relationships between different variables in a dataset.
                </Typography>
                <ChartButton label="Correlogram" chartType="chart9" onClick={fetchCharts} path="/plots\numeric\all\correlogram"
                  setCharts={setChartsCorrelogram}
                  setIsLoading={setIsLoadingCorrelogram}
                  setFetchingError={setFetchingErrorCorrelogram}
                />
              </div>
              {isLoadingCorrelogram && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorCorrelogram && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorCorrelogram}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsCorrelogram.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>
          {/* heatmap */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Heatmap
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                A heatmap is a graphical representation of data where the individual values that are contained in a matrix are represented as colors. Heatmaps can be used to visualize large amounts of data in a concise and easy-to-understand way.
                </Typography>
                <ChartButton label="Heatmap" chartType="chart10" onClick={fetchCharts} path="/plots\numeric\all\heatmap"
                  setCharts={setChartsHeatmap}
                  setIsLoading={setIsLoadingHeatmap}
                  setFetchingError={setFetchingErrorHeatmap}
                />
              </div>
              {isLoadingHeatmap && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorHeatmap && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorHeatmap}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsHeatmap.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>
          {/* 2d density */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                2D Density
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                A 2D density plot is a graphical representation of a bivariate probability distribution where the data is visualized as a continuous color density surface over a two-dimensional space.
                </Typography>
                <ChartButton label="2d Density" chartType="chart11" onClick={fetchCharts} path="/plots\numeric\double\2d_density"
                  setCharts={setCharts2dDensity}
                  setIsLoading={setIsLoading2dDensity}
                  setFetchingError={setFetchingError2dDensity}
                />

              </div>
              {isLoading2dDensity && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingError2dDensity && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingError2dDensity}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {charts2dDensity.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>


          {/* scatter */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Scatter
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                A scatter plot is a type of plot that shows the data as a collection of points. The position of a point depends on its two-dimensional value, where each value is a position on either the horizontal or vertical dimension.
                </Typography>
                <ChartButton label="Scatter" chartType="chart12" onClick={fetchCharts} path="/plots\numeric\double\scatter"
                  setCharts={setChartsScatter}
                  setIsLoading={setIsLoadingScatter}
                  setFetchingError={setFetchingErrorScatter}
                />
              </div>
              {isLoadingScatter && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorScatter && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorScatter}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsScatter.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>

          {/* histogram */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Histogram
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                A histogram is a graphical representation of the distribution of numerical data. It is an estimate of the probability distribution of a continuous variable and was first introduced by Karl Pearson.
                </Typography>
                <ChartButton label="Histogram Density" chartType="chart13" onClick={fetchCharts} path="/plots\numeric\single\histogram_density"
                  setCharts={setChartsHistogramDensity}
                  setIsLoading={setIsLoadingHistogramDensity}
                  setFetchingError={setFetchingErrorHistogramDensity}
                />
              </div>
              {isLoadingHistogramDensity && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorHistogramDensity && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorHistogramDensity}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsHistogramDensity.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>

          {/* violin */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Violin
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                A violin plot is a method of plotting numeric data. It is similar to a box plot, with the addition of a rotated kernel density plot on each side. Violin plots are similar to box plots, except that they also show the probability density of the data at different values, usually smoothed by a kernel density estimator.
                </Typography>
                <ChartButton label="Violin" chartType="chart14" onClick={fetchCharts} path="/plots\numeric\all\violin"
                  setCharts={setChartsViolin}
                  setIsLoading={setIsLoadingViolin}
                  setFetchingError={setFetchingErrorViolin}
                />
              </div>
              {isLoadingViolin && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div className="loading-icon" />
                  <span style={{ marginLeft: '5px' }}>Fetching images...</span>
                </div>
              )}
              {fetchingErrorViolin && <p style={{ color: 'red', marginTop: '10px' }}>{fetchingErrorViolin}</p>}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {chartsViolin.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="chart"
                    style={{ width: '300px', height: '200px', margin: '10px' }}
                  />
                ))}
              </div>
            </AccordionDetails>


          </Accordion>



        </Box>
      )}
    </Box>
  );
};

function ChartButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { label, chartType, onClick, path, setCharts, setIsLoading, setFetchingError } = props;
  return (
    <button
      onClick={() => onClick(chartType, path, setCharts, setIsLoading, setFetchingError)}
      style={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
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

export default FAQ;
