mapboxgl.accessToken =
  'pk.eyJ1Ijoic2d1aWViIiwiYSI6ImNta3AwZ2Z4ODBjZHIzbW9qb3h3OWVtazIifQ.lwISYmq5Dd3dGcjFibqxwA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10', 
  center: [-100, 40],
  zoom: 4
});

async function geojsonFetch() {
  const response = await fetch('assets/us-covid-2020-counts.json');
  const covidCounts = await response.json();

  map.on('load', () => {
    map.addSource('covidCounts', { type: 'geojson', data: covidCounts });

    const grades = [1000, 5000, 10000, 25000, 50000, 100000];
    const radii  = [  3,    6,     9,    13,    18,     24];

    const colors = [
    '#f7fcfd',
    '#e0ecf4',
    '#bfd3e6',
    '#9ebcda',
    '#8c96c6',
    '#8856a7'
    ];

    map.addLayer({
    id: 'counts-layer',
    type: 'circle',
    source: 'covidCounts',
    paint: {
    'circle-radius': {
        property: 'cases',
        stops: [
            [grades[0], radii[0]],
            [grades[1], radii[1]],
            [grades[2], radii[2]],
            [grades[3], radii[3]],
            [grades[4], radii[4]],
            [grades[5], radii[5]]
        ]
    },

    'circle-color': {
        property: 'cases',
        stops: [
            [grades[0], colors[0]],
            [grades[1], colors[1]],
            [grades[2], colors[2]],
            [grades[3], colors[3]],
            [grades[4], colors[4]],
            [grades[5], colors[5]]
        ]
    },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.5
        }
    });

    map.on('click', 'counts-layer', (e) => {
      const p = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(
          `<h3>${p.county}, ${p.state}</h3>
           <p><strong>${Number(p.cases).toLocaleString()}</strong> total cases (2020)<br>
           <strong>${Number(p.deaths).toLocaleString()}</strong> total deaths (2020)</p>`
        )
        .addTo(map);
    });

    map.on('mouseenter', 'counts-layer', () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', 'counts-layer', () => (map.getCanvas().style.cursor = ''));

    const legend = document.getElementById('legend');
    var labels = ['<strong>Total COVID-19 Cases (2020)</strong>'], vbreak;

    for (var i = 0; i < grades.length; i++) {
      vbreak = grades[i].toLocaleString();
      const dot_radius = 2 * radii[i];

      labels.push(
        '<p class="break">' +
          '<i class="dot" style="background:' + colors[i] +
          '; width:' + dot_radius +
          'px; height:' + dot_radius +
          'px;"></i>' +
          '<span class="dot-label" style="top:' + dot_radius / 2 +
          'px;">' + vbreak + '</span>' +
        '</p>'
      );
    }

    const source =
        '<p style="text-align: right; font-size:10pt; margin-top:8px;">' +
        'Source<br>' +
        '<a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv" target="_blank">New York Times COVID-19</a>'
        '</p>';

    legend.innerHTML = labels.join('') + source;
  });
}

geojsonFetch();