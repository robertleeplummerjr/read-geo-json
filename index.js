var defaults = {
  eachPoint: null,
  eachLineString: null,
  eachPolygon: null,
  eachMultiPoint: null,
  eachMultiLineString: null,
  eachMultiPolygon: null,
  eachGeometryCollection: null,
  verbose: false
};

function readGeoJSON(geoJson, settings) {
  if (geoJson === null) throw new Error('geoJson property not defined');

  for (var i in defaults) {
    if (defaults.hasOwnProperty(i)) {
      settings[i] = settings.hasOwnProperty(i) ? settings[i] : defaults[i]
    }
  }

  if (geoJson.type === 'FeatureCollection') {
    if (geoJson.features instanceof Array) {
      geoJson.features.forEach(function(feature) {
        eachFeature(feature, geoJson.features);
      });
    }
  } else {
    eachFeature(geoJson);
  }

  function eachFeature(feature, featureCollection) {
    if (feature.hasOwnProperty('geometry')) {
      eachGeometry(feature.geometry, feature, featureCollection);
    } else if (feature.hasOwnProperty('geometries') && feature.geometries instanceof Array) {
      feature.geometries.forEach(function(geometry) {
        eachGeometry(geometry, feature, featureCollection);
      });
    } else if (feature.hasOwnProperty('coordinates')) {
      eachGeometry(feature);
    }
  }

  function eachGeometry(geometry, feature, featureCollection) {
    var fn = settings['each' + geometry.type];

    switch (typeof fn) {
      case 'function': fn(geometry, feature, featureCollection); break;
      case 'undefined': throw new Error('unknown type: ' + (geometry.type || 'empty')); break;
      default:
        if (settings.verbose) {
          console.log('unhandled type: ' + geometry.type);
        }
    }
  }
}

module.exports = readGeoJSON;