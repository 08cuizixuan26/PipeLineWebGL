/**
 * 坐标系转换函数
 * WGS->GCJ
 * WGS->BD09
 * GCJ->BD09
 */
function Convertor(ak) {
    this.stepCount = 100;
    this.pointCount = [];
    this.Result = [];
    this.NoisIndex = [];
    this.Time = new Date();
    this.AK = ak;
    this.M_PI = 3.14159265358979324;
    this.A = 6378245.0;
    this.EE = 0.00669342162296594323;
    this.X_PI = this.M_PI * 3000.0 / 180.0;
}

Convertor.prototype.outofChine = function (p) {
    if (p.lng < 72.004 || p.lng > 137.8347) {
        return true;
    }
    if (p.lat < 0.8293 || p.lat > 55.8271) {
        return true;
    }
    return false;
}
;
Convertor.prototype.WGS2GCJ_lat = function (x, y) {
    var ret1 = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret1 += (20.0 * Math.sin(6.0 * x * this.M_PI) + 20.0 * Math.sin(2.0 * x * this.M_PI)) * 2.0 / 3.0;
    ret1 += (20.0 * Math.sin(y * this.M_PI) + 40.0 * Math.sin(y / 3.0 * this.M_PI)) * 2.0 / 3.0;
    ret1 += (160.0 * Math.sin(y / 12.0 * this.M_PI) + 320 * Math.sin(y * this.M_PI / 30.0)) * 2.0 / 3.0;
    return ret1;
}
;
Convertor.prototype.WGS2GCJ_lng = function (x, y) {
    var ret2 = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret2 += (20.0 * Math.sin(6.0 * x * this.M_PI) + 20.0 * Math.sin(2.0 * x * this.M_PI)) * 2.0 / 3.0;
    ret2 += (20.0 * Math.sin(x * this.M_PI) + 40.0 * Math.sin(x / 3.0 * this.M_PI)) * 2.0 / 3.0;
    ret2 += (150.0 * Math.sin(x / 12.0 * this.M_PI) + 300.0 * Math.sin(x / 30.0 * this.M_PI)) * 2.0 / 3.0;
    return ret2;
}
;
Convertor.prototype.WGS2GCJ = function (poi) {
    if (this.outofChine(poi)) {
        return;
    }
    var poi2 = {};
    var dLat = this.WGS2GCJ_lat(poi.lng - 105.0, poi.lat - 35.0);
    var dLon = this.WGS2GCJ_lng(poi.lng - 105.0, poi.lat - 35.0);
    var radLat = poi.lat / 180.0 * this.M_PI;
    var magic = Math.sin(radLat);
    magic = 1 - this.EE * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.A * (1 - this.EE)) / (magic * sqrtMagic) * this.M_PI);
    dLon = (dLon * 180.0) / (this.A / sqrtMagic * Math.cos(radLat) * this.M_PI);
    poi2.lat = poi.lat + dLat;
    poi2.lng = poi.lng + dLon;
    return poi2;
}
;
Convertor.prototype.GCJ2BD09 = function (poi) {
    var poi2 = {};
    var x = poi.lng
        , y = poi.lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.X_PI);
    poi2.lng = z * Math.cos(theta) + 0.0065;
    poi2.lat = z * Math.sin(theta) + 0.006;
    return poi2;
}
;
/**
 * WGS->百度坐标系
 */
Convertor.prototype.WGS2BD09 = function (poi) {
    //WGS->GCJ
    var poi2 = this.WGS2GCJ(poi);
    if (typeof poi2 === "undefined") {
        return;
    }
    //GCJ->百度坐标系
    return this.GCJ2BD09(poi2);
}


/*定义百度投影，这是实现无偏移加载百度地图离线瓦片核心所在。
   网上很多相关资料在用OpenLayers加载百度地图离线瓦片时都认为投影就是EPSG:3857(也就是Web墨卡托投影)。
   事实上这是错误的，因此无法做到无偏移加载。
   百度地图有自己独特的投影体系，必须在OpenLayers中自定义百度投影，才能实现无偏移加载。
   百度投影实现的核心文件为bd09.js，在迈高图官网可以找到查看这个文件。*/
let projBD09 = new ol.proj.Projection({
    code: 'BD:09',
    extent: [-20037726.37, -11708041.66, 20037726.37, 12474104.17],
    units: 'm',
    axisOrientation: 'neu',
    global: false
});

ol.proj.addProjection(projBD09);
ol.proj.addCoordinateTransforms("EPSG:4326", "BD:09",
    function (coordinate) {
        var c = new Convertor();
        var r1 = c.WGS2BD09({lng: coordinate[0], lat: coordinate[1]});
        return lngLatToMercator([r1.lng, r1.lat]);
    },
    function (coordinate) {
        console.log(mercatorToLngLat(coordinate));
        return mercatorToLngLat(coordinate);
    }
);

/*定义百度地图分辨率与瓦片网格*/
let resolutions = [];
for (let i = 0; i <= 18; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}

let tilegrid = new ol.tilegrid.TileGrid({
    origin: [0, 0],
    resolutions: resolutions
});

/*加载百度地图离线瓦片不能用ol.source.XYZ，ol.source.XYZ针对谷歌地图（注意：是谷歌地图）而设计，
而百度地图与谷歌地图使用了不同的投影、分辨率和瓦片网格。因此这里使用ol.source.TileImage来自行指定
投影、分辨率、瓦片网格。*/
let source = new ol.source.TileImage({
    projection: "BD:09",
    tileGrid: tilegrid,
    tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        //openlayers6的版本
        let z = tileCoord[0];
        let x = tileCoord[1];
        let y = -tileCoord[2] - 1;
        if (x < 0) x = "M" + (-x);
        if (y < 0) y = "M" + (-y);
        return "http://maponline0.bdimg.com/tile/?qt=vtile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&scaler=1&udt=20210506&from=jsapi3_0";
    }
});

var baidu = new ol.layer.Tile({
    id: 'baidu',
    source: source
});