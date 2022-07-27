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
    currentMapType: undefined,
    //绘制的临时图层
    drawLayer: null,
    //绘制
    draw: null,
    mapClick: null,
    //坐标系偏移量
    xOffset: 0.012531,
    yOffset: 0.007319,
    /*    xOffset:0.012693,
        yOffset:0.006953,*/
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
    //凸多边形点集合
    linePoints: undefined,

    //三维更新接口_图层id
    gsGuid:"f5561c20-45f6-4cd8-911c-68126ce27808",
    wsGuid:"c10bdcff-6983-49ed-a2eb-365495882650",
    ysGuid:"a7f67368-7203-481b-adfd-6f9a6b4e3af2",

    //获取待更新的数据
    getUpdateData: function (type) {
        var points = [];
        var url = "";
        var url1 = "";
        var url2 = "";
        var url3 = "";
        let guid = "";
        if(type == "给水"){
            url="/hdsw/gsline/selectByState"
            url1="/hdsw/gspoint/selectByState"
            url2="/hdsw/gsline/batchUpdate"
            url3="/hdsw/gspoint/batchUpdate"
            guid = LoadMap.gsGuid;
        }else if(type == "雨水"){
            url="/hdsw/ysline/selectByState"
            url1="/hdsw/yspoint/selectByState"
            url2="/hdsw/ysline/batchUpdate"
            url3="/hdsw/yspoint/batchUpdate"
            guid = LoadMap.ysGuid;
        }else if(type == "污水"){
            url="/hdsw/wsline/selectByState"
            url1="/hdsw/wspoint/selectByState"
            url2="/hdsw/wsline/batchUpdate"
            url3="/hdsw/wspoint/batchUpdate"
            guid = LoadMap.wsGuid;
        }
        //获取待更新线表坐标
        $.ajax({
            url: url,
            type: "get",
            contentType: 'application/json',
            dataType: 'json',
            async:false,  //同步方式发起请求
            data: {updState: "1"},
            success: function (data) {
                if (data.code == 0) {
                    data.data.forEach(function (element, index) {
                        var geom = JSON.parse(element.geom);
                        var point = {x: geom.coordinates[0][0][0], y: geom.coordinates[0][0][1]};
                        points.push(point);
                        var point1 = {x: geom.coordinates[0][1][0], y: geom.coordinates[0][1][1]};
                        points.push(point1);
                    })
                }
            }
        })
        //获取待更新点表坐标
        $.ajax({
            url: url1,
            type: "get",
            contentType: 'application/json',
            dataType: 'json',
            async:false,  //同步方式发起请求
            data: {updState: "1"},
            success: function (data) {
                if (data.code == 0) {
                    data.data.forEach(function (element, index) {
                        var geom = JSON.parse(element.geom);
                        var point = {x: geom.coordinates[0], y: geom.coordinates[1]};
                        points.push(point);
                    })
                }
            }
        })

        //更新
        $.ajax({
            url: url2,
            type: "post",
            dataType: 'json',
            async:false,  //同步方式发起请求
            data: {updState: "0"},
            success: function (data) {
            }
        })
        $.ajax({
            url: url3,
            type: "post",
            dataType: 'json',
            async:false,  //同步方式发起请求
            data: {updState: "0"},
            success: function (data) {
            }
        })
        //生成凸多边形
        var newPoints = convexhull.makeHull(points)
        LoadMap.linePoints = newPoints;
/*        //调取生成三维接口
        let data = "";
        LoadMap.linePoints.forEach(function (obj, index) {
            data += `<location>${obj.x},${obj.y}</location>`;
        });
        data = `<?xml version="1.0" encoding="gbk"?><xml><locations>${data}</locations></xml>`;
        $.ajax({
            url: "se_pipeline_publish_tool?type=areapublish&is_webgl=true&guid="+guid,
            type: "post",
            data:data,
            dataType:"json",
            //async:false,  //同步方式发起请求
            success: function (data) {

            },
            error:function () {

            }
        });*/
    },

    //调用三维接口
    generate3D:function (type) {
        let guid = "";
        let url = "";
        if(type == "给水"){
            guid = LoadMap.gsGuid;
        }else if(type == "雨水"){
            guid = LoadMap.ysGuid;
        }else if(type == "污水"){
            guid = LoadMap.wsGuid;
        }
        LoadMap.getUpdateData(type);
        let data = "";
        LoadMap.linePoints.forEach(function (obj, index) {
            data += `<location>${obj.x},${obj.y}</location>`;
        });
        data = `<?xml version="1.0" encoding="gbk"?><xml><locations>${data}</locations></xml>`;
        $.ajax({
            url: "se_pipeline_publish_tool?type=areapublish&is_webgl=true&guid="+guid,
            type: "post",
            data:data,
            dataType:"json",
            //async:false,  //同步方式发起请求
            success: function (data) {

            },
            error:function () {

            }
        });
    },

    //绘制多边形
    drawLine: function () {
        var targetArr = [];
        LoadMap.linePoints.forEach(function (obj, index) {
            var newArr = [];
            newArr.push(obj.x);
            newArr.push(obj.y);
            targetArr.push(newArr);
        });
        if (targetArr.length > 0) {
            var polygonArr = [];
            polygonArr.push(targetArr);
            var myPolygon = new ol.geom.Polygon(polygonArr);//绘制多边形（点集数组结构是[[[xxxx,xxxx],[   xxxx,xxxx],.....]]）
            myPolygon.applyTransform(ol.proj.getTransform('EPSG:4326', 'BD:09'));
            var feature = new ol.Feature(myPolygon);
            var lineStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "#00ffff",
                    width: 4,
                }),
            });
            feature.setStyle(lineStyle)
            var layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [feature]
                })
            });
            LoadMap.map.addLayer(layer);
        }
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
    //高亮矢量图层
    highLightVectorFeature : function(feature){
        LoadMap.highlightL.getSource().clear();
        if (feature) {
            LoadMap.highlightL.getSource().addFeature(feature);
        }
        LoadMap.highlightF = feature;
    },
    //闪烁
    flashHighLight:function (flash){
        var animation;
        var flag=true;
        if(flash) {
            animation=setInterval(()=>{
                flag=!flag;
                this.highlightL.setVisible(flag);
            },300);
        }
        else{
            clearInterval(animation);
        }
    },
    //定位
    flyToFeature : function(coordinate1,pointList){
        if(!coordinate1[0]) return;
        this.view.animate({zoom: 18}, {center: coordinate1},{duration:500});
        LoadMap.highLightVectorFeature(new ol.Feature({
            geometry:new ol.geom.LineString(pointList)
        }))
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
        if (LoadMap.getCoordinateFlag == "xqd") {
            $("#qdbh3").attr("value", properties["exp_no"])
            $("#qdxcor3").attr("value", properties["x"])
            $("#qdycor3").attr("value", properties["y"])
            $("#qdms3").attr("value", properties["bot_depth"])
            $("#qdgc3").attr("value", properties["sure_h"])
        } else if (LoadMap.getCoordinateFlag == "xzd") {
            $("#zdbh3").attr("value", properties["exp_no"])
            $("#zdxcor3").attr("value", properties["x"])
            $("#zdycor3").attr("value", properties["y"])
            $("#zdms3").attr("value", properties["bot_depth"])
            $("#zdgc3").attr("value", properties["sure_h"])
        } else if (LoadMap.getCoordinateFlag == "xqd5") {
            $("#qdgdbh5").attr("value", properties["exp_no"])
            $("#qdgdlx5").attr("value", properties["feature"])
            $("#qdgdqsdw5").attr("value", properties["owner"])
            $("#qdbh5").attr("value", properties["exp_no"])
            $("#qdms5").attr("value", properties["bot_depth"])
            $("#qdgc5").attr("value", properties["sure_h"])
            $("#qdxcor5").attr("value", properties["x"])
            $("#qdycor5").attr("value", properties["y"])
        } else if (LoadMap.getCoordinateFlag == "xzd5") {
            $("#zdgdbh5").attr("value", properties["exp_no"])
            $("#zdgdlx5").attr("value", properties["feature"])
            $("#zdgdqsdw5").attr("value", properties["owner"])
            $("#zdbh5").attr("value", properties["exp_no"])
            $("#zdms5").attr("value", properties["bot_depth"])
            $("#zdgc5").attr("value", properties["sure_h"])
            $("#zdxcor5").attr("value", properties["x"])
            $("#zdycor5").attr("value", properties["y"])
        }

        if (LoadMap.getCoordinateFlag == "guandian") {
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
        } else if (LoadMap.getCoordinateFlag == "guanxian") {
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
        }else if(LoadMap.getCoordinateFlag == "guanxianfeiqi"){
            $("#guanxianfeiqi1").attr("value", properties["pipeid"])
            $("#guanxianfeiqi2").attr("value", properties["s_point"])
            $("#guanxianfeiqi3").attr("value", properties["e_point"])
            $("#guanxianfeiqi4").attr("value", properties["s_deep"])
            $("#guanxianfeiqi5").attr("value", properties["e_deep"])
            $("#guanxianfeiqi6").attr("value", properties["s_height"])
            $("#guanxianfeiqi7").attr("value", properties["e_height"])
            $("#guanxianfeiqi8").attr("value", properties["material"])
            $("#guanxianfeiqi9").attr("value", properties["d_type"])
            $("#guanxianfeiqi10").attr("value", properties["style"])
            $("#guanxianfeiqi11").attr("value", properties["d_s"])
            $("#guanxianfeiqi12").attr("value", properties["b_time"])
            $("#guanxianfeiqi13").attr("value", properties["owner"])
            $("#guanxianfeiqi14").attr("value", properties["flowdirect"])
            $("#guanxianfeiqi15").attr("value", properties["road"])
            $("#guanxianfeiqi16").attr("value", properties["state"])
            $("#guanxianfeiqi17").attr("value", properties["type"])
            $("#guanxianfeiqi18").attr("value", properties["shape_leng"])
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
                } else if (key == 'elevation') {
                    keyChina = '标高';
                } else if (key == 'geometry') {
                    keyChina = '位置坐标';
                    var coor = ol.proj.transform([properties[key].extent_[0], properties[key].extent_[1]], 'BD:09', 'EPSG:4326')
                    var coor1 = [coor[0] - LoadMap.xOffset, coor[1] - LoadMap.yOffset]
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

    //管线更新页面回显
    showGxgxfeature: function (properties) {
        $("#expNo1").attr("value", properties["exp_no"])
        $("#covType1").attr("value", properties["cov_type"])
        $("#type1").attr("value", properties["type"])
        $("#guanxian1").attr("value", properties["pipeid"])
        $("#guanxian2").attr("value", properties["s_point"])
        $("#guanxian3").attr("value", properties["e_point"])
        if (LoadMap.getCoordinateFlag == "xqd") {
            $("#qdbh3").attr("value", properties["exp_no"])
            $("#qdxcor3").attr("value", properties["x"])
            $("#qdycor3").attr("value", properties["y"])
            $("#qdms3").attr("value", properties["bot_depth"])
            $("#qdgc3").attr("value", properties["sure_h"])
        } else if (LoadMap.getCoordinateFlag == "xzd") {
            $("#zdbh3").attr("value", properties["exp_no"])
            $("#zdxcor3").attr("value", properties["x"])
            $("#zdycor3").attr("value", properties["y"])
            $("#zdms3").attr("value", properties["bot_depth"])
            $("#zdgc3").attr("value", properties["sure_h"])
        } else if (LoadMap.getCoordinateFlag == "xqd5") {
            $("#qdgdbh5").attr("value", properties["exp_no"])
            $("#qdgdlx5").attr("value", properties["feature"])
            $("#qdgdqsdw5").attr("value", properties["owner"])
            $("#qdbh5").attr("value", properties["exp_no"])
            $("#qdms5").attr("value", properties["bot_depth"])
            $("#qdgc5").attr("value", properties["sure_h"])
            $("#qdxcor5").attr("value", properties["x"])
            $("#qdycor5").attr("value", properties["y"])
        } else if (LoadMap.getCoordinateFlag == "xzd5") {
            $("#zdgdbh5").attr("value", properties["exp_no"])
            $("#zdgdlx5").attr("value", properties["feature"])
            $("#zdgdqsdw5").attr("value", properties["owner"])
            $("#zdbh5").attr("value", properties["exp_no"])
            $("#zdms5").attr("value", properties["bot_depth"])
            $("#zdgc5").attr("value", properties["sure_h"])
            $("#zdxcor5").attr("value", properties["x"])
            $("#zdycor5").attr("value", properties["y"])
        } else if (LoadMap.getCoordinateFlag == "crd4") {
            $("#gxbh4").attr("value", properties["pipeid"])
            $("#qdbh4").attr("value", properties["s_point"])
            $("#zdbh4").attr("value", properties["e_point"])
            $("#szdl4").attr("value", properties["road"])
            $("#qsdw4").attr("value", properties["owner"])
            $("#ywlb4").attr("value", properties["type"])
            if (properties["type"] == "供水") {
                url = "/hdsw/gspoint/getMaxnum"
                str = "GSP"
            } else if (properties["type"] == "雨水") {
                url = "/hdsw/yspoint/getMaxnum"
                str = "YSP"
            } else if (properties["type"] == "污水") {
                url = "/hdsw/wspoint/getMaxnum"
                str = "WSP"
            } else if (properties["type"] == "再生水") {
                url = "/hdsw/zsspoint/getMaxnum"
                str = "ZSSP"
            }
            $.ajax({
                url: url,
                type: "get",
                success: function (res) {
                    var num = parseInt(res.data) + 1
                    $("#gdbh4").attr("value", str + num);
                }
            })
        }

        if (LoadMap.getCoordinateFlag == "guandian") {
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
        }else if(LoadMap.getCoordinateFlag == "guanxianfeiqi"){
            $("#guanxianfeiqi1").attr("value", properties["pipeid"])
            $("#guanxianfeiqi2").attr("value", properties["s_point"])
            $("#guanxianfeiqi3").attr("value", properties["e_point"])
            $("#guanxianfeiqi4").attr("value", properties["s_deep"])
            $("#guanxianfeiqi5").attr("value", properties["e_deep"])
            $("#guanxianfeiqi6").attr("value", properties["s_height"])
            $("#guanxianfeiqi7").attr("value", properties["e_height"])
            $("#guanxianfeiqi8").attr("value", properties["material"])
            $("#guanxianfeiqi9").attr("value", properties["d_type"])
            $("#guanxianfeiqi10").attr("value", properties["style"])
            $("#guanxianfeiqi11").attr("value", properties["d_s"])
            $("#guanxianfeiqi12").attr("value", properties["b_time"])
            $("#guanxianfeiqi13").attr("value", properties["owner"])
            $("#guanxianfeiqi14").attr("value", properties["flowdirect"])
            $("#guanxianfeiqi15").attr("value", properties["road"])
            $("#guanxianfeiqi16").attr("value", properties["state"])
            $("#guanxianfeiqi17").attr("value", properties["type"])
            $("#guanxianfeiqi18").attr("value", properties["shape_leng"])
        }
    },

    singleclick() {
        //点击显示
        LoadMap.mapClick = LoadMap.map.on("click", (e) => {
            LoadMap.highlightL.getSource().clear();
            if (LoadMap.currentMapType == "管线更新") {
                var coor = ol.proj.transform([e.coordinate[0], e.coordinate[1]], 'BD:09', 'EPSG:4326')
                if (LoadMap.getCoordinateFlag == 1) {
                    $("#x1").attr("value", coor[0] - LoadMap.xOffset)
                    $("#y1").attr("value", coor[1] - LoadMap.yOffset)
                } else if (LoadMap.getCoordinateFlag == 2) {
                    $("#x2").attr("value", coor[0] - LoadMap.xOffset)
                    $("#y2").attr("value", coor[1] - LoadMap.yOffset)
                } else if (LoadMap.getCoordinateFlag == "hqzb2") {
                    $("#xcor2").attr("value", coor[0] - LoadMap.xOffset)
                    $("#ycor2").attr("value", coor[1] - LoadMap.yOffset)
                }
                LoadMap.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                    LoadMap.showGxgxfeature(feature.getProperties());
                    if (LoadMap.getCoordinateFlag == 'crd4') {
                        $("#xcor4").attr("value", coor[0] - LoadMap.xOffset)
                        $("#ycor4").attr("value", coor[1] - LoadMap.yOffset)
                    }
                })
            } else {
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
            }
        });
    },

    addWsLayer() {
        let ws;
        let wsx;
        let wsw;
        $.ajax({
            url: "/hdsw/gxcontrol/select",
            type: "post",
            contentType: 'application/json',
            dataType: 'json',
            async:false,
            success: function (data) {
                ws= data[0].iocn

                wsx=data[0].color
                wsw=data[0].width
            }
        })
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
                            color: wsx,
                            width: wsw,
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
    getLineSources: function () {
        var vectorSources = [];
        var layers = [];
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getCheckedNodes();
        var layers = LoadMap.map.getLayers();
        var layerArray = [];
        nodes.forEach(function (node) {
            var checkId = node.id;
            if (checkId == 'gsgx' || checkId == 'wsgx' || checkId == 'ysgx' || checkId == 'zssgx') {
                var checked = node.checked;
                node.checkedOld = node.checked;
                layers.forEach(function (layer) {
                    if (layer.get("id") == checkId) {
                        if (checked == true && layer instanceof ol.layer.Vector) {
                            layerArray.push(layer.get("id"));
                            vectorSources.push(layer.values_.source);
                        }
                    }
                })
            }
        });
        return vectorSources;
    },

    getLineSources2: function () {
        var vectorSources = [];
        var layers = [];
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo2");
        var nodes = treeObj.getCheckedNodes();
        var layers = LoadMap.map.getLayers();
        var layerArray = [];
        nodes.forEach(function (node) {
            var checkId = node.id;
            if (checkId == 'gsgx' || checkId == 'wsgx' || checkId == 'ysgx' || checkId == 'zssgx') {
                var checked = node.checked;
                node.checkedOld = node.checked;
                layers.forEach(function (layer) {
                    if (layer.get("id") == checkId) {
                        if (checked == true && layer instanceof ol.layer.Vector) {
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
    getSelectFeatures(vectorSources, extent) {
        var features;
        var selectedFeatures = [];
        vectorSources.forEach(function (vectorSource) {
            if (extent == null)
                features = vectorSource.getFeatures();
            else
                features = vectorSource.getFeaturesInExtent(extent)
            if (features != null && features.length != 0)
                selectedFeatures.push(features)
        });
        return selectedFeatures;
    },

    //删除废弃标志转换
    del_state: function (del_state) {
        if ("00" === del_state) {
            return "正常";
        } else if ("10" === del_state) {
            return "删除";
        } else if ("12" === del_state) {
            return "废弃";
        } else if ("13" === del_state) {
            return "已增加未同步";
        } else if ("14" === del_state) {
            return "已增加已同步";
        } else if ("15" === del_state) {
            return "已删除未同步";
        } else if ("16" === del_state) {
            return "已删除已同步";
        } else if ("17" === del_state) {
            return "已废弃未同步";
        } else if ("18" === del_state) {
            return "已废弃已同步";
        } else {
            return "正常";
        }
    },
    loadNewLayer:function(layerId,visibleState) {
    var layer;
    switch (layerId) {
        case "gsgx":
            layer = new ol.layer.Vector({
                id: "gsgx",
                source: sourceConfig.getSource("HD:gsline","HD","HD","gsline","0","0"),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: olMapConfig12.gsx,
                        width: olMapConfig12.gsw,
                    })
                })
            });
            break;
        case "gsjg":
            layer = new ol.layer.Vector({
                id: "gsjg",
                source: sourceConfig.getSource("HD:gspoint","HD","HD","gspoint","0","0"),
                style: new ol.style.Style({
                    //形状
                    image: new ol.style.Icon({
                        src: olMapConfig12.gs,
                        scale: 0.2
                    })
                }),
            });
            break;
        case "ysgx":
            layer = new ol.layer.Vector({
                id: "ysgx",
                source: sourceConfig.getSource("HD:yslines","HD","HD","yslines","0","0"),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: olMapConfig12.ysx,
                        width: olMapConfig12.ysw,
                    })
                }),
            });
            break;
        case "ysjg":
            layer = new ol.layer.Vector({
                id: "ysjg",
                source: sourceConfig.getSource("HD:yspoints","HD","HD","yspoints","0","0"),
                style: new ol.style.Style({
                    //形状
                    image: new ol.style.Icon({
                        src: olMapConfig12.ys,
                        scale: 0.2
                    })
                }),
            });
            break;
        case "wsgx":
            LoadMap.addWsLayer();
            break;
        case "wsjg":
            layer = olMapConfig.layers[5];
            break;
        case "zssgx":
            layer = olMapConfig.layers[1];
            break;
        case "zssjg":
            layer = olMapConfig.layers[6];
            break;
        default:
            break;
    }
    LoadMap.map.addLayer(layer);
    layer.setVisible(visibleState)
    LoadMap.map.render();
}

}
function layerTreeDiv() {

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
    var layerTreeSetting2 = {
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
    // let initTreeData2 = [];
    // olMapConfig.layersTreeData.forEach(function (node) {
    //     initTreeData.push(node);
    // });
    // $.fn.zTree.init($("#treeDemo2"), layerTreeSetting2, initTreeData);

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
    //加载高亮图层
    gx_layers.push(LoadMap.highlightL);
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
    LoadMap.flashHighLight(true);
    // LoadMap.test();
    LoadMap.singleclick();
};
/*$(() => {
    LoadMap.mapInit();
    LoadMap.addWsLayer();
    // LoadMap.test();
    LoadMap.singleclick();
})*/
