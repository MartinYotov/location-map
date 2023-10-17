const layersData = {
  openStreet: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "OpenStreetMap",
  },
  esriWorld: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Esri World Imagery",
  },
  gpw: {
    url: "http://sedac.ciesin.columbia.edu/geoserver/wms",
    layers: "gpw-v4:gpw-v4-population-density_2015",
    format: "image/png",
    transparent: true,
    attribution: "GPWv4: Population Density – 2015",
  },
  urbanExpansion: {
    url: "http://sedac.ciesin.columbia.edu/geoserver/wms",
    layers: "lulc:lulc-global-grid-prob-urban-expansion-2030",
    format: "image/png",
    transparent: true,
    attribution: "Probabilities of Urban Expansion to 2030",
  },
};

module.exports = layersData;
