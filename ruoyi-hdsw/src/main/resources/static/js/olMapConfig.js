var olMapStyle = {
    //高亮图层样式
    hightStyle: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0)'
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        }),
        //形状
        image: new ol.style.RegularShape({
            radius1: 9,
            points: 8,
            fill: new ol.style.Fill({
                color: 'rgba(255,0,0,0)'
            }),
            //边线颜色
            stroke: new ol.style.Stroke({
                color: '#00FFFF',
                width: 3
            }),
        })
    }),
    wsc_Style: new ol.style.Style({
        //形状
        image: new ol.style.Icon({
            src: '/images/0518/wsclz.png',
            scale: 0.6
        }),
    }),
    zss_Style: new ol.style.Style({
        //形状
        image: new ol.style.Icon({
            src: '/images/0518/zssc.png',
            scale: 0.6
        })
    }),
    zls_Style: new ol.style.Style({
        //形状
        image: new ol.style.Icon({
            src: '/images/0518/zlsc.png',
            scale: 0.6
        })
    }),
    psh_Style: new ol.style.Style({
        //形状
        image: new ol.style.Icon({
            src: '/images/0518/psh.png',
            scale: 0.6
        })
    }),
    getPshSource: function (url) {
        let features = [];
        $.ajax({
            url: url,
            type: 'get',
            async: false,
            dataType: 'json',
            contentType: "application/json",
            success(res) {
                $.each(res.features, (index, item) => {
                    let coordinates = [res.features[index].geometry.x, res.features[index].geometry.y];
                    coordinates = ol.proj.transform(coordinates, 'EPSG:4326', 'BD:09');
                    features.push(new ol.Feature({
                        geometry: new ol.geom.Point(coordinates),
                        id: res.features[index].attributes.id,
                        name: res.features[index].attributes.name,
                        location: res.features[index].attributes.location,
                        street: res.features[index].attributes.street,
                        legal: res.features[index].attributes.legal,
                        tel: res.features[index].attributes.tel,
                        type: res.features[index].attributes.type,
                        drainTrend: res.features[index].attributes.drainTrend,
                    }))
                })
            },
            error: () => {
                console.log("服务器错误")
            }
        })
        return new ol.source.Vector({
            features: features
        });
    },
    getCzSource: function (url) {
        let features = [];
        $.ajax({
            url: url,
            type: 'get',
            async: false,
            dataType: 'json',
            contentType: "application/json",
            success(res) {
                $.each(res, (index, item) => {
                    let coordinates = [res[index].x, res[index].y];
                    coordinates = ol.proj.transform(coordinates, 'EPSG:4326', 'BD:09');
                    features.push(new ol.Feature({
                        geometry: new ol.geom.Point(coordinates),
                        id: res[index].id,
                        pid: res[index].pid,
                        name: res[index].name,
                    }))
                })
            },
            error: () => {
                console.log("服务器错误")
            }
        })
        return new ol.source.Vector({
            features: features
        });
    },
    //创建蒙层
    showGuangxiArea() {
        let initLayer = new ol.layer.Vector({
            id: 'zzc',
            zIndex: 3,
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: "rgba( 255, 255, 255, 0.7)",
                }),
                stroke: new ol.style.Stroke({
                    color: "#f4b49f",
                    width: 3
                })
            })
        });
        LoadMap.map.addLayer(initLayer);
        $.ajax({
            url: 'http://49.232.170.162:8092/geoserver/wfs',
            type: 'get',
            data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typeNames: "hdq:hdq_gslines",
                outputFormat: 'application/json'

            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                olMapStyle.addConver(initLayer, res);
            }
        })
    },
    //添加遮罩
    addConver(converLayer, data) {
        // console.log(new ol.format.GeoJSON().readFeatures(olMapConfig.layers[1].getSource()));
        const fts = new ol.format.GeoJSON().readFeatures(data);
        const ft = fts[0];
        const converGeom = this.erase(ft.getGeometry());
        const convertFt = new ol.Feature({
            geometry: converGeom,
        });
        converLayer.getSource().addFeature(convertFt);
    },
    //擦除操作，生产遮罩范围
    erase(geom) {
        const extent = [-180, -90, 180, 90];
        const polygonRing = ol.geom.Polygon.fromExtent(extent);
        const coords = geom.getCoordinates();
        coords.forEach(coord => {
            const linearRing = new ol.geom.LinearRing(coord[0]);
            polygonRing.appendLinearRing(linearRing);
        });
        return polygonRing;
    }
}

var olMapConfig = {
    layers: [
        //0
        baidu,
        //1 再生水管线
        new ol.layer.Vector({
            id: "zssgx",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=hdq:hdq_zsslines&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(0,0,255,0.8)",
                    width: 5,
                })
            }),
        }),
        //2 供水管线
        new ol.layer.Vector({
            id: "gsgx",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:gsline&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(0,255,255,0.8)",
                    width: 5,
                })
            })
        }),
        //3 雨水管线
        new ol.layer.Vector({
            id: "ysgx",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:yslines&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(139,90,43,0.8)",
                    width: 5,
                })
            }),
        }),
        //4 供水井盖
        new ol.layer.Vector({
            id: "gsjg",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:gspoint&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                // url: 'http://10.111.15.8:8085/api/getAPIService/23e72e1f64c143f7a060824112a11111' +
                //     '?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0101',
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                //形状
                image: new ol.style.Icon({
                    src: '/images/0518/gsgd.png',
                    scale: 0.2
                })
            }),
        }),
        //5 污水井盖
        new ol.layer.Vector({
            id: "wsjg",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:wspoints&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                // url: 'http://10.111.15.8:8085/api/getAPIService/39d15f2450084cbca76bd3b7fc211111' +
                //     '?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0102',
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                //形状
                image: new ol.style.Icon({
                    src: '/images/0518/wsgd.png',
                    scale: 0.2
                })
            }),
        }),
        //6 再生水井盖
        new ol.layer.Vector({
            id: "zssjg",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:wspoints&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                // url: 'http://10.111.15.8:8085/api/getAPIService/6c1a54536ba143929d1dd55b4ae11111' +
                //     '?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0127',
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                //形状
                image: new ol.style.Icon({
                    src: '/images/0518/zssgd.png',
                    scale: 0.2
                })
            }),
        }),
        //7 雨水井盖
        new ol.layer.Vector({
            id: "ysjg",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:yspoints&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                // url: 'http://10.111.15.8:8085/api/getAPIService/e04493a221c74d55a865b66dc5611111' +
                //     '?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0103',
                strategy: ol.loadingstrategy.bbox,
            }),
            style: new ol.style.Style({
                //形状
                image: new ol.style.Icon({
                    src: '/images/0518/ysgd.png',
                    scale: 0.2
                })
            }),
        }),
        //8 雨水篦子
        // new ol.layer.Vector({
        //     id: "ysjg",
        //     source: new ol.source.Vector({
        //         format: new ol.format.GeoJSON(),
        //         url: 'http://10.111.15.8:8085/api/getAPIService/0dc111ce417c4c5fb78c53135dd11111' +
        //             '?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0104',
        //         strategy: ol.loadingstrategy.bbox,
        //     }),
        // }),
        //9 再生水厂
        new ol.layer.Vector({
            id: "zssc",
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function (extent) {
                    return 'http://101.43.236.93:8092/geoserver/HD/wfs?service=WFS&' +
                        'version=1.1.0&request=GetFeature&typename=HD:zssc&' +
                        'outputFormat=application/json&srsname=EPSG:4326&' +
                        'bbox=' + extent.join(',') + ',EPSG:4326';
                },
                // url: 'http://10.111.15.8:8085/api/getAPIService/e04493a221c74d55a865b66dc5611111' +
                //     '?token=2c91808f783ddb7d0178621faa620001&layerName=ZHJY_GIS%3Ahd_bj_0103',
                strategy: ol.loadingstrategy.bbox,
            }),
            // source: olMapStyle.getCzSource("/json/zss.json"),
            style: olMapStyle.zss_Style
        }),
        //10 污水厂
        new ol.layer.Vector({
            id: "wsc",
            source: olMapStyle.getCzSource("/json/wsc.json"),
            style: olMapStyle.wsc_Style
        }),
        //11 自来水厂
        new ol.layer.Vector({
            id: "zlsc",
            style: olMapStyle.zls_Style
        }),
        // 12 排水户
        new ol.layer.Vector({
            id: "psh",
            source: olMapStyle.getPshSource("/json/psh.json"),
            style: olMapStyle.psh_Style
        }),

        //13 河流边界
        // new ol.layer.Tile({
        //     id: "hlbj",
        //     source: new ol.source.TileWMS({
        //         url: 'http://10.111.15.8:8085/api/getAPIService/a039b5144c024d47b07d7302d8998366',
        //         params: {
        //             'LAYERS': 'ZHJY_GIS:hd_sw_0108',
        //             'token': '2c91808f783ddb7d0178621faa620001',
        //             'TILED': true,
        //         },
        //         serverType: 'geoserver'
        //     }),
        // }),
        //14 海淀区边界
        new ol.layer.Tile({
            id: "hdqbj",
            source: new ol.source.TileWMS({
                // url: 'http://10.111.15.8:8085/api/getAPIService/c63a7f0004f340c3909ab5258906bf6e',
                // params: {
                //     'LAYERS': 'ZHJY_GIS:fangguanju_border',
                //     'token': '2c91808878113bdc01781c8f3361001d',
                //     'TILED': true,
                // },
                url: 'http://101.43.236.93:8092/geoserver/HD/wms',
                params: {
                    'LAYERS': 'HD:hdbj',
                    'TILED': true,
                },
                serverType: 'geoserver'
            }),
        }),
        // //15 收水范围
        // new ol.layer.Tile({
        //     id: "ssfw",
        //     source: new ol.source.TileWMS({
        //         url: 'http://192.168.1.147:8080/geoserver/HDSWGX/wms',
        //         params: {
        //             'LAYERS': 'ZHJY_GIS:fangguanju_border',
        //             'TILED': true,
        //         },
        //         serverType: 'geoserver'
        //     }),
        // }),
    ],
    layersTreeData: [
        {
            "id": "gx",
            "name": "管线",
            "icon": "/zTree/img/gwcyD.png",
            "nocheck": "false",
            "checked": "true",
            "open": true,
            children: [
                {
                    "id": "gsgx",
                    "name": "供水管线",
                    "icon": "/images/zTreeTwo/gsgx.png",
                    "checked": "false",
                    "open": true
                },
                {
                    "id": "wsgx",
                    "name": "污水管线",
                    "icon": "/images/zTreeTwo/wsgx.png",
                    "nocheck": "false",
                    "checked": "true",
                    "open": true
                },
                {
                    "id": "zssgx",
                    "name": "再生水管线",
                    "icon": "/images/zTreeTwo/zssgx.png",
                    "checked": "false",
                    "open": true
                },
                {
                    "id": "ysgx",
                    "name": "雨水管线",
                    "icon": "/images/zTreeTwo/ysgx.png",
                    "checked": "false",
                    "open": true
                },
            ]
        },
        {
            "id": "jg",
            "name": "管点",
            "icon": "/zTree/img/gwcyD.png",
            "nocheck": "false",
            "checked": "true",
            "open": true,
            children: [
                {
                    "id": "gsjg",
                    "name": "供水管点",
                    "icon": "/images/zTreeTwo/gsgd.png",
                    "checked": "false",
                    "open": true
                },
                {
                    "id": "wsjg",
                    "name": "污水管点",
                    "icon": "/images/zTreeTwo/wsgd.png",
                    "checked": "false",
                    "open": true
                },
                {
                    "id": "zssjg",
                    "name": "再生水管点",
                    "icon": "/images/zTreeTwo/zssgd.png",
                    "checked": "false",
                    "open": true
                },
                {
                    "id": "ysjg",
                    "name": "雨水管点",
                    "icon": "/images/zTreeTwo/ysgd.png",
                    "checked": "false",
                    "open": true
                },
            ]
        },
        {
            "id": "cz",
            "name": "场站",
            "icon": "/zTree/img/gwcyD.png",
            "nocheck": "false",
            "checked": "true",
            "open": true,
            children: [
                {
                    "id": "zssc",
                    "name": "再生水厂",
                    "icon": "/images/0518/zssc.png",
                    "nocheck": "false",
                    "checked": "true",
                    "open": true
                },
                {
                    "id": "wsc",
                    "name": "污水处理站",
                    "icon": "/images/0518/wsclz.png",
                    "nocheck": "false",
                    "checked": "true",
                    "open": true
                },
                {
                    "id": "zlsc",
                    "name": "自来水厂",
                    "icon": "/images/0518/zlsc.png",
                    "nocheck": "false",
                    "checked": "true",
                    "open": true
                }
            ]
        },
        {
            "id": "ysh",
            "name": "用水户",
            "icon": "/images/0518/ysh.png",
            "nocheck": "false",
            "checked": "true",
            "open": true
        },
        {
            "id": "psh",
            "name": "排水户",
            "icon": "/images/0518/psh.png",
            "nocheck": "false",
            "checked": "true",
            "open": true
        },
    ],
}
