var fs          = require('fs')
  , readGeoJson = require('./index')
  , should      = require('should')
  , fileCache   = {}
  ;

function readJson(path, cb) {
  if (fileCache[path]) {
    cb(JSON.parse(fileCache[path]));
    return;
  }

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) throw err;

    fileCache[path] = data;

    cb(JSON.parse(data));
  });
}

describe('reader', function() {
  it('should be able to read example point', function(done) {
    readJson('test/data/example.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachPoint: function(point, feature, featureCollection) {
          point.type.should.equal('Point');
          (typeof featureCollection).should.eql('object');
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read example lineString', function(done) {
    readJson('test/data/example.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachLineString: function(lineString, feature, featureCollection) {
          lineString.type.should.equal('LineString');
          (typeof featureCollection).should.eql('object');
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read example polygon', function(done) {
    readJson('test/data/example.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachPolygon: function(polygon, feature, featureCollection) {
          polygon.type.should.equal('Polygon');
          (typeof featureCollection).should.eql('object');
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read geometry-collection', function(done) {
    readJson('test/data/geometry-collection.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachPoint: function(point, feature, featureCollection) {
          point.type.should.equal('Point');
          (undefined === featureCollection).should.be.ok();
          reads++;
        },
        eachLineString: function(lineString, feature, featureCollection) {
          lineString.type.should.equal('LineString');
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(2);
      done();
    });
  });

  it('should be able to read line-string', function(done) {
    readJson('test/data/line-string.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachLineString: function(lineString, feature, featureCollection) {
          lineString.type.should.equal('LineString');
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read multi-line-string', function(done) {
    readJson('test/data/multi-line-string.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachMultiLineString: function(multiLineString, feature, featureCollection) {
          multiLineString.type.should.equal('MultiLineString');
          (undefined === feature).should.be.ok();
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read multi-point', function(done) {
    readJson('test/data/multi-point.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachMultiPoint: function(multiPoint, feature, featureCollection) {
          multiPoint.type.should.equal('MultiPoint');
          (undefined === feature).should.be.ok();
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read multi-polygon', function(done) {
    readJson('test/data/multi-polygon.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachMultiPolygon: function(multiPolygon, feature, featureCollection) {
          multiPolygon.type.should.equal('MultiPolygon');
          (undefined === feature).should.be.ok();
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read point', function(done) {
    readJson('test/data/point.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachPoint: function(point, feature, featureCollection) {
          point.type.should.equal('Point');
          (undefined === feature).should.be.ok();
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read polygon', function(done) {
    readJson('test/data/polygon.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachPolygon: function(polygon, feature, featureCollection) {
          polygon.type.should.equal('Polygon');
          (undefined === feature).should.be.ok();
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read polygon-with-holes', function(done) {
    readJson('test/data/polygon-with-holes.geojson', function(json) {
      var reads = 0;
      readGeoJson(json, {
        eachPolygon: function(polygon, feature, featureCollection) {
          polygon.type.should.equal('Polygon');
          (undefined === feature).should.be.ok();
          (undefined === featureCollection).should.be.ok();
          reads++;
        }
      });
      reads.should.equal(1);
      done();
    });
  });

  it('should be able to read multi-example', function(done) {
    readJson('test/data/multi-example.geojson', function(json) {
      var reads = 0
        , uniques = []
        ;

      readGeoJson(json, {
        eachPoint: function(point, feature, featureCollection) {
          point.type.should.equal('Point');
          (undefined !== feature).should.be.ok();
          (undefined !== featureCollection).should.be.ok();
          reads++;

          if (uniques.indexOf(feature) < 0) {
            uniques.push(feature);
          }
        },
        eachLineString: function(lineString, feature, featureCollection) {
          lineString.type.should.equal('LineString');
          (undefined !== feature).should.be.ok();
          (undefined !== featureCollection).should.be.ok();
          reads++;

          if (uniques.indexOf(feature) < 0) {
            uniques.push(feature);
          }
        },
        eachPolygon: function(polygon, feature, featureCollection) {
          polygon.type.should.equal('Polygon');
          (undefined !== feature).should.be.ok();
          (undefined !== featureCollection).should.be.ok();
          reads++;

          if (uniques.indexOf(feature) < 0) {
            uniques.push(feature);
          }
        }
      });

      reads.should.equal(15);
      uniques.length.should.equal(15);
      done();
    });
  });
});