# read-geo-json
an easy means of reading a geojson file in js

## usage
```javascript
readGeoJson(data, {
  eachPoint: function(point, feature, featureCollection) {
    //do something with point?
  }
});
```

## optional settings
```javascript
{
  eachPoint: function(point, feature, featureCollection) {},
  
  eachLineString: function(lineString, feature, featureCollection) {},
  
  eachPolygon: function(polygon, feature, featureCollection) {},
  
  eachMultiPoint: function(multiPoint, feature, featureCollection) {},
  
  eachMultiLineString: function(multiLineString, feature, featureCollection) {},
  
  eachMultiPolygon: function(multiPolygon, feature, featureCollection) {},
  
  eachGeometryCollection: function(geometryCollection, feature, featureCollection) {}
}
```
