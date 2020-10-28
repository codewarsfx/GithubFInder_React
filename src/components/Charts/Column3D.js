import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Chart= ({data})=>{

const chartData={
  "chart": {
    "caption": "Most Popular",
    yAxisName:"stars",
    xAxisName:'Repos',
    xAxisNameFontSize:'16px',
    yAxisNameFontSize:'16px',
    "theme": "fusion"
  },

   data
}

const chartConfigs = {
  type: 'column3d',
  width: "100%",
  height: 400,
  dataFormat: 'json',
  dataSource:chartData,
};

  return(
    <ReactFC {...chartConfigs}/>
  )
}

export default Chart
