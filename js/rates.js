mapboxgl.accessToken =
  'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNta3AwZ2Z4ODBjZHIzbW9qb3h3OWVtazIifQ.lwISYmq5Dd3dGcjFibqxwA';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 4,
  center: [-100, 40],
  projection: 'albers' 
});

async function geojsonFetch() {
  const response = await fetch('assets/us-covid-2020-rates.json');
  const covidRates = await response.json();

  map.on('load', () => {
    map.addSource('covidRates', {
      type: 'geojson',
      data: covidRates
    });

    map.addLayer({
      id: 'rates-layer',
      type: 'fill',
      source: 'covidRates',
      paint: {
        'fill-color': [
          'step',
          ['to-number', ['get', 'rates']], 
          '#FFEDA0', 25,
          '#FED976', 50,
          '#FEB24C', 75,
          '#FD8D3C', 100,
          '#FC4E2A', 150,
          '#E31A1C', 200,
          '#BD0026', 300,
          '#800026'
        ],
        'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.7
      }
    });

    const layers = ['0-24','25-49','50-74','75-99','100-149','150-199','200-299','300+'];
    const colors = ['#FFEDA070','#FED97670','#FEB24C70','#FD8D3C70','#FC4E2A70','#E31A1C70','#BD002670','#80002670'];

    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Case Rate<br>(per 1,000)</b><br><br>";

    layers.forEach((layer, i) => {
      const item = document.createElement('div');
      const key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = colors[i];

      const value = document.createElement('span');
      value.innerHTML = layer;

      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    });

    const source =
      '<p style="text-align: right; font-size:10pt; margin-top:8px;">' +
      'Source<br>' +
      '<a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv" target="_blank">New York Times COVID-19</a>'
      '</p>';

    legend.innerHTML += source;

    map.on('mousemove', (e) => {
      const county = map.queryRenderedFeatures(e.point, { layers: ['rates-layer'] });

      const panel = document.getElementById('text-description');
      panel.innerHTML = county.length
        ? `<h3>${county[0].properties.county}, ${county[0].properties.state}</h3>
           <p><strong><em>${Number(county[0].properties.rates).toFixed(1)}</strong> cases per 1,000</em></p>`
        : `<p>Hover over a county</p>`;
    });
  });
}

geojsonFetch();