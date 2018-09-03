var fs = require('fs');
var objGeojson = require("./data/polygon_jmd_240.geojson")

console.log(objGeojson.features.length);

var arrPackets = [{
    "id": "document",
    "name": "CZML Geometries: Polygon",
    "version": "1.0"
}];
var arrFeatures = objGeojson.features;
for (var i = 0; i < arrFeatures.length; i++) {
    var oneFea = arrFeatures[i];
    var onePacket = convertFea2Packet(oneFea);
    arrPackets.push(onePacket);
}
exportJsObj2File(arrPackets);

function convertFea2Packet(oneFea) {
    var onePacket = {
        "id": "greenPolygon",
        "name": "Green extruded polygon",
        "polygon": {
            "positions": {
                "cartographicDegrees": [
                    -108.0,
                    42.0,
                    0,
                    -100.0,
                    42.0,
                    0,
                    -104.0,
                    40.0,
                    0
                ]
            },
            "material": {
                "solidColor": {
                    "color": {
                        "rgba": [
                            0,
                            255,
                            0,
                            255
                        ]
                    }
                }
            },
            "extrudedHeight": 5000.0,
            "closeTop": true,
            "closeBottom": false
        }
    };
    //默认给每一个feature一个随机的type
    var feaType = Math.floor(Math.random() * 3);
    var oenFeaSample = {
        "type": "Feature",
        "properties": {"OBJECTID": 84725},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [126.399748226727482, 43.93625431740535, 0.0],
                    [126.399715034796955, 43.936312987536375, 0.0],
                    [126.399870568922395, 43.936359051137146, 0.0],
                    [126.399903760853093, 43.93630038010653, 0.0],
                    [126.399748226727482, 43.93625431740535, 0.0]
                ]
            ]
        }
    };
    var objId = oneFea.properties.OBJECTID;
    onePacket.id = objId.toString();
    onePacket.name = objId.toString();
    onePacket.polygon.positions = get_polygon_position(oneFea.geometry.coordinates);
    onePacket.polygon.material = get_polygon_material(feaType);
    onePacket.polygon.extrudedHeight = get_polygon_extrudedHeight(feaType);
    return onePacket;
}

function get_polygon_material(feaTypeIndex) {
    var arrMaterialPreDefine = [
        {
            "solidColor": {
                "color": {
                    "rgba": [
                        21,
                        64,
                        109,
                        255
                    ]
                }
            }
        },
        {
            "solidColor": {
                "color": {
                    "rgba": [
                        81,
                        128,
                        170,
                        255
                    ]
                }
            }
        },
        {
            "solidColor": {
                "color": {
                    "rgba": [
                        135,
                        135,
                        135,
                        255
                    ]
                }
            }
        }
    ];
    return arrMaterialPreDefine[feaTypeIndex];
}

function get_polygon_extrudedHeight(feaTypeIndex) {
    var arrHeightPreDefine = [
        [20, 100],
        [100, 200],
        [200, 500]
    ];
    var heightRange = arrHeightPreDefine[feaTypeIndex]
    var floor = heightRange[0];
    var ceil = heightRange[1];
    var gap = ceil - floor;
    return Math.floor(Math.random() * gap) + floor;
}

function get_polygon_position(feaCoordinates) {
    var sample_coor = [
        [
            [126.399748226727482, 43.93625431740535, 0.0],
            [126.399715034796955, 43.936312987536375, 0.0],
            [126.399870568922395, 43.936359051137146, 0.0],
            [126.399903760853093, 43.93630038010653, 0.0],
            [126.399748226727482, 43.93625431740535, 0.0]
        ]
    ];
    var samlePosition = {
        "cartographicDegrees": [
            -108.0,
            42.0,
            0,
            -100.0,
            42.0,
            0,
            -104.0,
            40.0,
            0
        ]
    };
    var restultPosition = {
        "cartographicDegrees": []
    };

    var arrCoorIn = feaCoordinates[0];
    for (var i = 0; i < arrCoorIn.length; i++) {
        var oneCoor = arrCoorIn[i];
        for (var j = 0; j < oneCoor.length; j++) {
            restultPosition.cartographicDegrees.push(oneCoor[j]);
        }
    }
    return restultPosition;
}

function exportJsObj2File(obj) {
    var destFilePath = "./data/result.json";
    fs.writeFileSync(destFilePath, JSON.stringify(obj), "utf-8");
}



