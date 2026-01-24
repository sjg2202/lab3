## COVID-19 in the United States (2020): County-Level Maps
Shayla Guieb

### Overview
This project explores how COVID-19 impacted counties across the United States during 2020 using two interactive web maps. One map focuses on **total COVID-19 cases**, while the other shows **case rates per 1,000 residents**, which helps compare counties more fairly by accounting for population size.

### Maps
#### 1. COVID-19 Total Rates (2020)
![Total Rates Map](img/Case%20Rates.jpg)
[View Total Rates Map](https://sjg2202.github.io/covid19-us-cases-and-rates/map1.html)

**What this map shows**  
A choropleth map displaying COVID-19 case rates per 1,000 residents. This map highlights areas that were heavily impacted relative to their population size.

![Total Rates Interactivity](img/Case%20Rates%20Zoom.jpg)

**Features**
- Step-based choropleth classification
- Hover interaction that displays county name and case rate
- Albers projection for national-scale mapping


#### 2. COVID-19 Total Cases (2020)
![Total Cases Map](img/Total%20Cases.jpg)
[View Total Cases Map](https://sjg2202.github.io/covid19-us-cases-and-rates/map2.html)

**What this map shows**  
A proportional symbol map where each circle represents a county, and the size of the circle corresponds to the total number of confirmed COVID-19 cases in 2020.

![Total Cases Interactivity](img/Total%20Cases%20Zoom.jpg)

**Features**
- Proportional circles scaled by total cases
- Clickable circles that show county-level case and death counts
- Custom legend explaining symbol sizes
- Albers projection for a more accurate U.S. map

### Notes
- All datasets joined at the county level
- Case rates calculated as cases per 1,000 residents
- County boundaries simplified using Mapshaper
- Unnecessary attributes were removed
- GeoJSON files were prepared to work smoothly with Mapbox GL JS

### Libraries
- Mapbox GL JS
- JavaScript
- HTML & CSS
- Mapshaper (used to simplify geometries and prepare GeoJSON files)

### Credits & Acknowledgement
- COVID-19 data provided by The New York Times
- Population and boundary data provided by the U.S. Census Bureau
- Basemaps and rendering provided by Mapbox

### Data Sources
- [New York Times COVID-19 Data](https://github.com/nytimes/covid-19-data)
- [ACS 2018 5-Year Estimates](https://data.census.gov/table/ACSDP5Y2018.DP05)
- [U.S. Census Bureau cartographic boundary files ](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html)