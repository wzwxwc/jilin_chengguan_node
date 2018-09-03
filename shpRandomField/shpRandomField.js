let gdal = require("gdal");

let shpFilePath = "F:\\Data\\b_chengguan\\juminlou\\居民地及设施面.shp";
let shpFilePath2 = "F:\\Data\\b_chengguan\\juminlou_smallregion\\jumindi_small.shp";


let strDriverName = "ESRI Shapefile";
// sample: open a shapefile and display all features as geojson
let dataset = gdal.open(shpFilePath2, "r+");
let layer = dataset.layers.get(0);

// console.log("number of features: " + layer.features.count());
// console.log("fields: " + layer.fields.getNames());
// console.log("extent: " + JSON.stringify(layer.extent));
// console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));

let i = 0;
layer.features.forEach(function (feature) {
    i++;
    // console.log(feature.getGeometry().toJSON());
    let value = feature.fields.get("height");
    console.log(value);

    let value2 = feature.fields.get("OBJECTID");
    console.log(value2);

    let heightValue = createRandomHeight();
    feature.fields.set('height', "55.0");

    // layer.SetFeature(feature)
    // let value3 = feature.fields.get("height");
    // console.log(value3);
    // return;
});
layer.flush();
console.log("总共有:" + i + "条feature");
//上述forEach是同步执行的！
console.log("结束了");


function createRandomHeight() {
    let index = Math.floor(Math.random() * 3);
    let arrHeightPreDefine = [
        [20, 100],
        [100, 200],
        [200, 500]
    ];
    let heightRange = arrHeightPreDefine[index]
    let floor = heightRange[0];
    let ceil = heightRange[1];
    let gap = ceil - floor;
    return Math.floor(Math.random() * gap) + floor;
}

