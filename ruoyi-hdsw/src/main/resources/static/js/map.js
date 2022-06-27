if (!LoadMap) var LoadMap = {
    view: new ol.View({
        center: ol.proj.transform([116.207389, 40.068821], 'EPSG:4326', 'BD:09'),
        projection: 'BD:09',
        zoom: 1
    }),
    highlightF: null,
    highlightL: new ol.layer.Vector({
        id: "highLightL",
        source: new ol.source.Vector(),
        style: olMapStyle.hightStyle
    }),
    map: undefined,
    baseMapType: "vector",
    //参考加点选择坐标
    getCoordinateFlag: undefined,
    //当前显示的地图页
    currentMapType:undefined,
    //绘制的临时图层
    drawLayer:null,
    //绘制
    draw:null,
    mapClick:null,
    //坐标系偏移量
/*    xOffset:0.012653,
    yOffset:0.007422,*/
    xOffset:0.012693,
    yOffset:0.006953,
    setLayerVisible: function (event, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.getChangeCheckedNodes();
        var layers = LoadMap.map.getLayers();
        nodes.forEach(function (node) {
            var checkId = node.id;
            var checked = node.checked;
            node.checkedOld = node.checked;
            layers.forEach(function (layer) {
                if (layer.get("id") == checkId) {
                    if (checked == true)
                        layer.setVisible(true);
                    else
                        layer.setVisible(false);
                }
            })
        });
    },

    showFeatureInfo: function (e, properties) {
        let v = $("#featureInfo")[0];
        let html = "<div style='border-bottom: 1px solid #03FFEA;height: 30px;line-height: 30px;margin-left: 10px' ><span><strong>属性</strong></span></div>";
        let keyChina = "";
        for (var key in properties) {
            if (key == 'id') {
                keyChina = '编号';
            } else if (key == 'pid') {
                continue;
            } else if (key == 'name') {
                keyChina = '名称';
            } else if (key == 'geometry') {
                keyChina = '位置坐标';
                html += "<div class='title cd'>" + keyChina + " &nbsp;:&nbsp;<span class='feature'> " + properties[key].extent_[0] + "," + properties[key].extent_[1] + "</span></div>";
                continue;
            }
            html += "<div class='title cd'>" + keyChina + " &nbsp;:&nbsp;<span class='feature'> " + properties[key] + "</span></div>";
        }
        v.innerHTML = html;
        v.style.zIndex = 2;
        v.style.opacity = 1;
    },
    closeFeatureInfo: function () {
        let v = $("#featureInfo")[0];
        v.style.zIndex = -99;
        v.style.opacity = 0;
        if ($("#featureInfoS")[0]) {
            let v2 = $("#featureInfoS")[0];
            v2.style.width = "0px";
            v2.style.right = "100px";
            v2.style.opacity = 0;
        }
    },
    highLightTileFeature: function (feature) {
        var featuresCoorArr = feature.geometry['coordinates'][0];
        this.highlightL.getSource().clear();
        if (feature.geometry['type'] == 'MultiPolygon') {
            var simplaFeature = new ol.Feature({
                geometry: new ol.geom.Polygon(featuresCoorArr),
            });
        } else if (feature.geometry['type'] == 'MultiPoint' || feature.geometry['type'] == 'Point') {
            var simplaFeature = new ol.Feature({
                geometry: new ol.geom.Point(featuresCoorArr),
            });
        } else if (feature.geometry['type'] == 'MultiLineString') {
            var simplaFeature = new ol.Feature({
                geometry: new ol.geom.LineString(featuresCoorArr),
            });
        }
        this.highlightL.getSource().addFeature(simplaFeature);
        this.highlightF = feature;
    },

    //0-管点，1-管线，2-排水户
    showHdqfeature: function (properties, type) {
        let v = $("#featureInfo")[0];
        let html = "<div style='border-bottom: 1px solid #03FFEA;height: 30px;line-height: 30px;margin: 0 10px 0 10px;' ><span><strong>属性</strong></span></div>" +
            "<table class='layui-table'><tbody><tr><td>属性名称</td><td>属性值</td></tr>";
        let keyChina = "";
        $("#expNo1").attr("value", properties["exp_no"])
        $("#covType1").attr("value", properties["cov_type"])
        $("#type1").attr("value", properties["type"])
        if(LoadMap.getCoordinateFlag=="xqd"){
            $("#qdbh3").attr("value", properties["exp_no"])
            $("#qdxcor3").attr("value", properties["x"])
            $("#qdycor3").attr("value", properties["y"])
            $("#qdms3").attr("value", properties["bot_depth"])
            $("#qdgc3").attr("value", properties["sure_h"])
        }else if(LoadMap.getCoordinateFlag=="xzd"){
            $("#zdbh3").attr("value", properties["exp_no"])
            $("#zdxcor3").attr("value", properties["x"])
            $("#zdycor3").attr("value", properties["y"])
            $("#zdms3").attr("value", properties["bot_depth"])
            $("#zdgc3").attr("value", properties["sure_h"])
        }else if(LoadMap.getCoordinateFlag=="xqd5"){
            $("#qdgdbh5").attr("value", properties["exp_no"])
            $("#qdgdlx5").attr("value", properties["feature"])
            $("#qdgdqsdw5").attr("value", properties["owner"])
            $("#qdbh5").attr("value", properties["exp_no"])
            $("#qdms5").attr("value", properties["bot_depth"])
            $("#qdgc5").attr("value", properties["sure_h"])
            $("#qdxcor5").attr("value", properties["x"])
            $("#qdycor5").attr("value", properties["y"])
        }else if(LoadMap.getCoordinateFlag=="xzd5"){
            $("#zdgdbh5").attr("value", properties["exp_no"])
            $("#zdgdlx5").attr("value", properties["feature"])
            $("#zdgdqsdw5").attr("value", properties["owner"])
            $("#zdbh5").attr("value", properties["exp_no"])
            $("#zdms5").attr("value", properties["bot_depth"])
            $("#zdgc5").attr("value", properties["sure_h"])
            $("#zdxcor5").attr("value", properties["x"])
            $("#zdycor5").attr("value", properties["y"])
        }

        if(LoadMap.getCoordinateFlag == "guandian"){
            $("#guandian1").attr("value", properties["exp_no"])
            $("#guandian2").attr("value", properties["sure_h"])
            $("#guandian3").attr("value", properties["feature"])
            $("#guandian4").attr("value", properties["subsid"])
            $("#guandian5").attr("value", properties["bot_depth"])
            $("#guandian6").attr("value", properties["cov_type"])
            $("#guandian7").attr("value", properties["cov_dn"])
            $("#guandian8").attr("value", properties["cov_meat"])
            $("#guandian9").attr("value", properties["wcha_meat"])
            $("#guandian10").attr("value", properties["wcha_type"])
            $("#guandian11").attr("value", properties["fo_deep"])
            $("#guandian12").attr("value", properties["wcha_dn"])
            $("#guandian13").attr("value", properties["owner"])
            $("#guandian14").attr("value", properties["b_time"])
            $("#guandian15").attr("value", properties["offc_no"])
            $("#guandian16").attr("value", properties["rotation"])
            $("#guandian17").attr("value", properties["road"])
            $("#guandian18").attr("value", properties["x"])
            $("#guandian19").attr("value", properties["y"])
            $("#guandian20").attr("value", properties["elevation"])
        }else if(LoadMap.getCoordinateFlag == "guanxian"){
            $("#guanxian1").attr("value", properties["pipeid"])
            $("#guanxian2").attr("value", properties["s_point"])
            $("#guanxian3").attr("value", properties["e_point"])
            $("#guanxian4").attr("value", properties["s_deep"])
            $("#guanxian5").attr("value", properties["e_deep"])
            $("#guanxian6").attr("value", properties["s_height"])
            $("#guanxian7").attr("value", properties["e_height"])
            $("#guanxian8").attr("value", properties["material"])
            $("#guanxian9").attr("value", properties["d_type"])
            $("#guanxian10").attr("value", properties["style"])
            $("#guanxian11").attr("value", properties["d_s"])
            $("#guanxian12").attr("value", properties["b_time"])
            $("#guanxian13").attr("value", properties["owner"])
            $("#guanxian14").attr("value", properties["flowdirect"])
            $("#guanxian15").attr("value", properties["road"])
            $("#guanxian16").attr("value", properties["state"])
            $("#guanxian17").attr("value", properties["type"])
            $("#guanxian18").attr("value", properties["shape_leng"])
        }

        if (type == 0) {
            for (var key in properties) {
                let value = properties[key] == null ? '' : properties[key];
                if (key == 'exp_no') {
                    keyChina = '管点编号';
                } else if (key == 'sure_h') {
                    keyChina = '地面高程';
                } else if (key == 'feature') {
                    keyChina = '特征';
                } else if (key == 'subsid') {
                    keyChina = '附属物';
                } else if (key == 'bot_depth') {
                    keyChina = '井底埋深';
                } else if (key == 'cov_type') {
                    keyChina = '井盖类型';
                } else if (key == 'cov_dn') {
                    keyChina = '井盖规格';
                } else if (key == 'cov_meat') {
                    keyChina = '井盖材质';
                } else if (key == 'wcha_meat') {
                    keyChina = '井室材质';
                } else if (key == 'wcha_type') {
                    keyChina = '井室类型';
                } else if (key == 'fo_deep') {
                    keyChina = '井脖深';
                } else if (key == 'wcha_dn') {
                    keyChina = '井室直径';
                } else if (key == 'owner') {
                    keyChina = '权属单位';
                } else if (key == 'b_time') {
                    keyChina = '建设日期';
                } else if (key == 'offc_no') {
                    keyChina = '偏心井点号';
                } else if (key == 'rotation') {
                    keyChina = '旋转角度';
                } else if (key == 'road') {
                    keyChina = '所在道路';
                }  else if (key == 'elevation') {
                    keyChina = '标高';
                }else if (key == 'geometry') {
                    keyChina = '位置坐标';
                    var coor = ol.proj.transform([properties[key].extent_[0], properties[key].extent_[1]], 'BD:09', 'EPSG:4326')
                    var coor1 = [coor[0]-LoadMap.xOffset,coor[1]-LoadMap.yOffset]
                    html += '<tr><td>' + keyChina + '</td><td>' + coor1[0] + ',' + coor1[1] + '</td></tr>'
                    continue;
                } else {
                    continue;
                }
                html += '<tr><td>' + keyChina + '</td><td>' + value + '</td></tr>'
            }
            html += '</tbody></table>'
        } else if (type == 1) {
            let str = '';
            for (var key in properties) {
                let value = properties[key] == null ? '' : properties[key];
                if (key.toLocaleLowerCase() === 'pipeid') {
                    keyChina = '管线编号';
                    str = properties[key];
                } else if (key.toLocaleLowerCase() === 's_point') {
                    keyChina = '起点编号';
                } else if (key.toLocaleLowerCase() === 'e_point') {
                    keyChina = '终点编号';
                } else if (key.toLocaleLowerCase() === 's_deep') {
                    keyChina = '起点埋深';
                    value = properties[key] == null ? '' : properties[key] + 'm';
                } else if (key.toLocaleLowerCase() === 'e_deep') {
                    keyChina = '终点埋深';
                    value = properties[key] == null ? '' : properties[key] + 'm';
                } else if (key.toLocaleLowerCase() === 'material') {
                    keyChina = '材质';
                } else if (key.toLocaleLowerCase() === 'd_type') {
                    keyChina = '埋设方式';
                } else if (key.toLocaleLowerCase() === 'd_s') {
                    keyChina = '管径';
                    value = properties[key] == null ? '' : properties[key] + 'mm';
                } else if (key.toLocaleLowerCase() === 'flowdirect') {
                    if (str.indexOf('GS') > -1 || str.indexOf('ZSS') > -1) {
                        continue;
                    } else {
                        keyChina = '管内介质流向';
                    }
                } else if (key.toLocaleLowerCase() === 'road') {
                    keyChina = '所在道路';
                } else if (key === '权属') {
                    keyChina = '权属单位';
                } else {
                    continue;
                }
                html += '<tr><td>' + keyChina + '</td><td>' + value + '</td></tr>'
            }
        } else if (type == 2) {
            for (var key in properties) {
                let value = properties[key] == null ? '' : properties[key];
                if (key == 'id') {
                    keyChina = '序号';
                } else if (key == 'name') {
                    keyChina = '排水户名称';
                } else if (key == 'location') {
                    keyChina = '地址';
                } else if (key == 'street') {
                    keyChina = '行政区属';
                } else if (key == 'legal') {
                    keyChina = '单位负责人';
                } else if (key == 'geometry') {
                    keyChina = '坐标';
                    var coor = ol.proj.transform([properties[key].extent_[0], properties[key].extent_[1]], 'BD:09', 'EPSG:4326')
                    html += '<tr><td>' + keyChina + '</td><td>' + coor[0] + ',' + coor[1] + '</td></tr>'
                    continue;
                } else if (key == 'tel') {
                    keyChina = '联系电话';
                } else if (key == 'type') {
                    keyChina = '排水户类型';
                } else if (key == 'drainTrend') {
                    keyChina = '污水去向';
                } else {
                    continue;
                }
                html += '<tr><td>' + keyChina + '</td><td>' + value + '</td></tr>'
            }
        } else if (type == 3) {
            for (var key in properties) {
                let value = properties[key] == null ? '' : properties[key];
                if (key == 'id') {
                    keyChina = '编号';
                } else if (key == 'pid') {
                    continue;
                } else if (key == 'name') {
                    keyChina = '名称';
                } else if (key == 'geometry') {
                    keyChina = '位置坐标';
                    var coor = ol.proj.transform([properties[key].extent_[0], properties[key].extent_[1]], 'BD:09', 'EPSG:4326')
                    html += '<tr><td>' + keyChina + '</td><td>' + coor[0] + ',' + coor[1] + '</td></tr>'
                    continue;
                }
                html += '<tr><td>' + keyChina + '</td><td>' + value + '</td></tr>'
            }
        }
        html += '</tbody></table>'
        v.innerHTML = html;
        v.style.zIndex = 2;
        v.style.opacity = 1;
    },

    singleclick() {
        LoadMap.mapClick= LoadMap.map.on("singleclick", (e) => {
            if(LoadMap.currentMapType="管线更新"){
                var coor = ol.proj.transform([e.coordinate[0], e.coordinate[1]], 'BD:09', 'EPSG:4326')
                if(LoadMap.getCoordinateFlag == 1){
                    $("#x1").attr("value", coor[0]-LoadMap.xOffset)
                    $("#y1").attr("value", coor[1]-LoadMap.yOffset)
                }else if(LoadMap.getCoordinateFlag == 2){
                    $("#x2").attr("value", coor[0]-LoadMap.xOffset)
                    $("#y2").attr("value", coor[1]-LoadMap.yOffset)
                }
            }
            this.closeFeatureInfo();
            LoadMap.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                console.log(feature.getProperties());
                if (layer.values_.id === "gsjg" || layer.values_.id === "wsjg" || layer.values_.id === "zssjg" || layer.values_.id === "ysjg") {
                    LoadMap.showHdqfeature(feature.getProperties(), 0);
                } else if (layer.values_.id === "wsgx" || layer.values_.id === "gsgx" || layer.values_.id === "zssgx" || layer.values_.id === "ysgx") {
                    LoadMap.showHdqfeature(feature.getProperties(), 1);
                } else if (layer.values_.id === "psh") {
                    LoadMap.showHdqfeature(feature.getProperties(), 2);
                } else if (layer.values_.id === "zssc" || layer.values_.id === "wsc" || layer.values_.id === "zlsc") {
                    LoadMap.showHdqfeature(feature.getProperties(), 3);
                }
            })
        });
    },

    addWsLayer() {
        let pointVectorSource = new ol.source.Vector({
            id: "wsjg1",
            format: new ol.format.GeoJSON(),
            url: function (extent) {
                return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=HD:wspoints&' +
                    'outputFormat=application/json&srsname=EPSG:4326&' +
                    'bbox=' + extent.join(',') + ',EPSG:4326';
            },
            strategy: ol.loadingstrategy.bbox
        })
        let pointLayer = new ol.layer.Vector({
            id: 'wsgd',
            source: pointVectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(0,255,255,0.5)",
                    width: 10
                })
            })
        });
        localStorage.clear();
        LoadMap.map.addLayer(pointLayer);
        let lineVectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function (extent) {
                return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=HD:wslines&' +
                    'outputFormat=application/json&srsname=EPSG:4326&' +
                    'bbox=' + extent.join(',') + ',EPSG:4326';
            },
            strategy: ol.loadingstrategy.bbox
        })

        let lineLayer = new ol.layer.Vector({
            id: "wsgx",
            source: lineVectorSource,
            visible: true,
            style: function (feature, resolution) {
                let geometry = feature.getGeometry().getLineString(0);
                let length = geometry.getLength();//获取线段长度
                let radio = (50 * resolution) / length;
                let dradio = 1;//投影坐标系，如3857等，在EPSG:4326下可以设置dradio=10000

                let endPointName = feature.getProperties().s_point
                let startPointName = feature.getProperties().e_point
                if (feature.getProperties().flowdirect == 1) {
                    startPointName = feature.getProperties().s_point
                    endPointName = feature.getProperties().e_point
                }
                let start, end
                let featureList = pointVectorSource.getFeatures();
                let cache = localStorage.getItem(startPointName + endPointName)
                let styles = [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "rgba(128,2,2,0.8)",
                            width: 3,
                        })
                    })
                ];
                // if (cache == null) {
                //     let array = [];
                //     for (let k = 0; k < featureList.length; k++) {
                //         if (startPointName == featureList[k].getProperties().exp_no) {
                //             start = featureList[k].values_.geometry.flatCoordinates;
                //             array.push(start)
                //         }
                //         if (endPointName == featureList[k].getProperties().exp_no) {
                //             end = featureList[k].values_.geometry.flatCoordinates;
                //             array.push(end)
                //         }
                //         if (start !== undefined && end !== undefined) {
                //             break;
                //         }
                //     }
                //     localStorage.setItem(startPointName + endPointName, JSON.stringify(array));
                // } else {
                //     start = JSON.parse(cache)[0];
                //     end = JSON.parse(cache)[1];
                // }
                // for (let i = 0; i <= 1; i += radio) {
                //     let arrowLocation = geometry.getCoordinateAt(i);
                //     if (typeof start != "object" || typeof end != "object" || start[0] == end[0] || start[1] == end[1]) return;
                //     let dx1 = end[0] - arrowLocation[0];
                //     let dy1 = end[1] - arrowLocation[1];
                //     let dx2 = arrowLocation[0] - start[0];
                //     let dy2 = arrowLocation[1] - start[1];
                //     if (dx1 != dx2 && dy1 != dy2) {
                //         if (Math.abs(dradio * dx1 * dy2 - dradio * dx2 * dy1) < 0.001) {
                //             let dx = end[0] - start[0];
                //             let dy = end[1] - start[1];
                //             let rotation = Math.atan2(dy, dx);
                //             styles.push(new ol.style.Style({
                //                 geometry: new ol.geom.Point(arrowLocation),
                //                 image: new ol.style.Icon({
                //                     src: '/zTree/img/arrow.png',
                //                     opacity: 1,
                //                     rotateWithView: false,
                //                     rotation: -rotation + Math.PI
                //                 })
                //             }));
                //         }
                //     }
                // }
                return styles;
            },
        })
        LoadMap.map.addLayer(lineLayer);
        return lineLayer;
    },

    test() {
        $.ajax({
            url: 'http://10.111.15.8:8085/api/getAPIService/e04493a221c74d55a865b66dc5611111?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0103',
            dataType: 'json',
            type: 'get',
            success: function (res) {
                console.log(res.features[0].geometry.coordinates);
                let f = [];
                for (let i = 1000; i < 6000; i++) {
                    f.push(res.features[i]);
                }
                LoadMap.exportRaw('污水井盖V2.txt', JSON.stringify(f));
            }
        })
    },
    fakeClick(obj) {
        let ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        obj.dispatchEvent(ev);
    },
    exportRaw(name, data) {
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([data]);
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        LoadMap.fakeClick(save_link);
    },

    //获取线图层数据源
    getLineSources : function (){
        var vectorSources = [];
        var layers = [];
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getCheckedNodes();
        var layers= LoadMap.map.getLayers();
        var layerArray = [];
        nodes.forEach(function(node){
            var checkId=node.id;
            if(checkId == 'gsgx' || checkId == 'wsgx' || checkId == 'ysgx' || checkId == 'zssgx'){
                var checked=node.checked;
                node.checkedOld=node.checked;
                layers.forEach(function(layer){
                    if(layer.get("id")==checkId){
                        if(checked==true && layer instanceof ol.layer.Vector){
                            layerArray.push(layer.get("id"));
                            vectorSources.push(layer.values_.source);
                        }
                    }
                })
            }
        });
        return vectorSources;
    },

    //根据范围和数据源获取
    getSelectFeatures(vectorSources,extent){
        var features;
        var selectedFeatures = [];
        vectorSources.forEach(function(vectorSource){
            if(extent == null)
                features = vectorSource.getFeatures();
            else
                features = vectorSource.getFeaturesInExtent(extent)
            if(features != null && features.length !=0)
                selectedFeatures.push(features)
        });
        return selectedFeatures;
    },
}

//初始化地图
LoadMap.mapInit = function (_callback, config) {
    LoadMap.currentMapType = config.pidType;

    //if(LoadMap.currentMapType == "首页"){
        //图层控制树初始化
        var layerTreeSetting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                }
            },
            view: {
                selectedMulti: false
            },
            callback: {
                onCheck: LoadMap.setLayerVisible
            }
        };
        let initTreeData = [];
        olMapConfig.layersTreeData.forEach(function (node) {
            initTreeData.push(node);
        });
        $.fn.zTree.init($("#treeDemo"), layerTreeSetting, initTreeData);

        $("#mapLayers").click(function () {
            let treeDiv = $(".layerTreeDiv")[0];
            if (treeDiv.style.opacity === '0') {
                treeDiv.style.opacity = '1';
                treeDiv.style.right = "30px";
            } else {
                treeDiv.style.opacity = '0';
                treeDiv.style.right = "5px";
            }
        });


    let gx_layers = [];
    for (let i = 0; i < olMapConfig.layers.length; i++) {
        gx_layers.push(olMapConfig.layers[i]);
    }

    //实例化Map对象加载地图
    LoadMap.map = new ol.Map({
        //地图容器div的ID
        target: 'mapDiv',
        //地图容器中加载的图层
        layers: gx_layers,
        //地图视图设置
        view: this.view,
        controls: ol.control.defaults({zoom: false}).extend([
            new ol.control.ScaleLine({
                units: 'degrees',
            })]),
    });

    setTimeout(() => {
        LoadMap.map.getView().setZoom(13);
        let layers = LoadMap.map.getLayers();
        layers.forEach(function (layer, index) {
            if (layer.get('id') !== 'wsgx' &&
                (layer.get('id').indexOf('jg') > 0 || layer.get('id').indexOf('gx') > 0)) {
                layer.setVisible(false)
            }
        })
        console.log(layers);
    }, 0)
    // olMapStyle.showGuangxiArea();

    LoadMap.addWsLayer();
    // LoadMap.test();
    LoadMap.singleclick();
};
/*$(() => {
    LoadMap.mapInit();
    LoadMap.addWsLayer();
    // LoadMap.test();
    LoadMap.singleclick();
})*/
