if (!LoadLargeMap) var LoadLargeMap = {
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [110.785264,32.639365],
        zoom: 13,
        minZoom:8,
        maxZoom:20,
        view:this.view,
    }),
    highlightF : null,
    highlightL : new ol.layer.Vector({
        id:"highLightL",
        source: new ol.source.Vector(),
        style: olMapStyle.hightStyle
    }),
    baseLayer: undefined,
    map: undefined,
    filter: 'none',
    key: undefined,
    click:null,
    featurInfo:undefined,
    pointFeatureInfo:undefined,
    czFeatureInfo:undefined,
    //控制矩形款选后点击地图不隐藏右侧属性栏
    rectangleFlag:false,
    //当前显示的地图页
    currentMapType:undefined,
    //报警图层
    animationYjCgx:undefined,
    animationYjGx:undefined,
    animationYjDx:undefined,
    animationYjCdx:undefined,
    //隐患闪烁
    animationYhYbpcdcl:undefined,
    animationYhYbpcclz:undefined,
    animationYhYbxjdcl:undefined,
    animationYhYbxjclz:undefined,
    animationYhYbyjdcl:undefined,
    animationYhYbyjclz:undefined,
    animationYhYbsbdcl:undefined,
    animationYhYbsbclz:undefined,
    animationYhYbfxdcl:undefined,
    animationYhYbfxclz:undefined,
    animationYhJdpcdcl:undefined,
    animationYhJdpcclz:undefined,
    animationYhJdxjdcl:undefined,
    animationYhJdxjclz:undefined,
    animationYhJdyjdcl:undefined,
    animationYhJdyjclz:undefined,
    animationYhJdsbdcl:undefined,
    animationYhJdsbclz:undefined,
    animationYhJdfxdcl:undefined,
    animationYhJdfxclz:undefined,
    animationYhZdpcdcl:undefined,
    animationYhZdpcclz:undefined,
    animationYhZdxjdcl:undefined,
    animationYhZdxjclz:undefined,
    animationYhZdyjdcl:undefined,
    animationYhZdyjclz:undefined,
    animationYhZdsbdcl:undefined,
    animationYhZdsbclz:undefined,
    animationYhZdfxdcl:undefined,
    animationYhZdfxclz:undefined,
    //巡检图层
    loadXjLayers:[],
    //设备一张图右侧图层管线高中低压类型选择集合
    gxYllxList:["低压","中压","高压"],
    //设备一张图权属单位选择集合
    gxQsdwList:["东风中燃","昆仑燃气","中国燃气(丹江)","中国燃气(滨江新区)"],
    //设备一张图管点是否选中
    isCheckedGd:false,
    //点击监测点线弹出的属性框内容
    showFeatureInfo:function(e,properties){
        if(LoadLargeMap.currentMapType=="隐患态势" || LoadLargeMap.currentMapType=="隐患一张图"){
            let url = "/aqyh/wTblHiddendangerInformationDetails/view/particulars?ID="+properties['id'] ;
            Common_layer(url, '隐患详情', '46%', '80%')
            /*            if(properties['隐患级别'] == ['一般隐患']){
                            $('#yh_level').css({'background':'#2f8dfc'})
                        }else if(properties['隐患级别'] == ['较大隐患']){
                            $('#yh_level').css({'background':'rgba(255, 254, 45,0.7)'})
                        }else if(properties['隐患级别'] == ['重大隐患']){
                            $('#yh_level').css({'background':'#fd6a3c'})
                        }
                        $("#yh_level").text(properties["隐患级别"]);
                        $("#yh_time").text(properties["上报时间"]);
                        $("#yh_type").text(properties["隐患类别"]);
                        $("#yh_source").text(properties["隐患来源"]);
                        $("#yhlx").text(properties["隐患类型"]);
                        $("#yhwz").text(properties["所在区县"]);
                        $("#yh_dealstate").text(properties["隐患状态"]);
                        $("#yh_dealstyle").text("维修");
                        featurInfo.show();*/
        }else if(LoadLargeMap.currentMapType=="巡检管理"){
            //区分巡检轨迹线点击事件
            if(properties.hasOwnProperty("showType")){
                $("#xjryid").text(properties["id"]);
                /*                $("#name").text(properties["巡检人员"]);
                                $("#ssdw").text(properties["所属企业"]);
                                $("#lxdh").text(properties["联系电话"]);
                                $("#ssbz").text(properties["所属班组"]);*/
                $("#xm").text(properties["姓名"]);
                $("#sjhm").text(properties["手机号码"]);
                $("#ssqy").text(properties["所属企业"]);
                $("#ssbm").text(properties["所属部门"]);
                $("#zt").text(properties["状态"]);
                $("#kssj").text(properties["开始时间"]);
                $("#jssj").text(properties["结束时间"]);
                $("#jrlc").text(properties["今日里程"]);
                $("#yxlc").text(properties["有效里程"]);
                $("#yxfglc").text(properties["有效覆盖里程"]);
                $("#zxsc").text(properties["在线时长"]);
                $("#yxsc").text(properties["有效时长"]);
                featurInfo.show();
            }
        }else if(LoadLargeMap.currentMapType=="健康分析"){
            if(properties["health_type"] == 0){
                $("#jkjb").text("健康");
                $("#synx").text("20年");
                $("#ssly").text(properties["layer"]);
                $("#gl").text(Math.round(Math.random()*4+1));
                $("#gc").text("钢");
                $("#ms").text("1.2米");
                $("#gj").text("50米");
            }else if(properties["health_type"] == 1){
                $("#jkjb").text("一般");
                $("#synx").text("20年");
                $("#ssly").text(properties["layer"]);
                $("#gl").text(Math.round(Math.random()*4+5));
                $("#gc").text("钢");
                $("#ms").text("1.3米");
                $("#gj").text("65米");
            }else if(properties["health_type"] == 2){
                $("#jkjb").text("较差");
                $("#synx").text("20年");
                $("#ssly").text(properties["layer"]);
                $("#gl").text(Math.round(Math.random()*4+10));
                $("#gc").text("塑料");
                $("#ms").text("1.4米");
                $("#gj").text("45米");
            }else if(properties["health_type"] == 3){
                $("#jkjb").text("危险");
                $("#synx").text("20年");
                $("#ssly").text(properties["layer"]);
                $("#gl").text(Math.round(Math.random()*4+15));
                $("#gc").text("聚乙烯");
                $("#ms").text("1.32米");
                $("#gj").text("25米");
            }
            featurInfo.show();
        }else if(LoadLargeMap.currentMapType=="超期分析"){
            if(properties["year_range"] == 0){
                $("#sunx").text(Math.floor(Math.random()*(20-10+1)+10));
                $("#sjsj").text("2021-11-24 09:21:36");
                $("#jcsj").text("2018-10-24 10:10:20");
                $("#sysj").text("2018-11-24 10:10:20");
                $("#gl").text(3);
            }else if(properties["year_range"] == 1){
                $("#sunx").text(Math.floor(Math.random()*(20-10+1)+10));
                $("#sjsj").text("2021-11-24 09:21:36");
                $("#jcsj").text("2014-10-24 10:10:20");
                $("#sysj").text("2014-11-24 10:10:20");
                $("#gl").text(7);
            }else if(properties["year_range"] == 2){
                $("#sunx").text(Math.floor(Math.random()*(20-10+1)+10));
                $("#sjsj").text("2021-11-24 09:21:36");
                $("#jcsj").text("2009-10-24 10:10:20");
                $("#sysj").text("2009-11-24 10:10:20");
                $("#gl").text(12);
            }else if(properties["year_range"] == 3){
                $("#sunx").text(Math.floor(Math.random()*(20-10+1)+10));
                $("#sjsj").text("2021-11-24 09:21:36");
                $("#jcsj").text("2003-10-24 10:10:20");
                $("#sysj").text("2003-11-24 10:10:20");
                $("#gl").text(Math.floor(18));
            }
            featurInfo.show();
        }else if(LoadLargeMap.currentMapType=="预警态势"||LoadLargeMap.currentMapType=="安全预警"||LoadLargeMap.currentMapType=="预警分析"){
            $("#yj_alarmUnit").text(properties["所属单位"]);
            $("#yj_level").text(properties["预警等级"]);
            $("#yj_time").text(properties["预警时间"]);
            $("#yj_type").text(properties["业务领域"]);
            $("#yj_station").text(properties["预警站点"]);
            $("#yj_info").text(properties["预警类型"]);
            $("#yj_value").text(properties["预警值"]);
            $("#yj_limit").text(properties["预警阈值"]);
            $("#yj_status").text(properties["处置状态"]);
            featurInfo.show();
        }else if(LoadLargeMap.currentMapType=="运行趋势" || LoadLargeMap.currentMapType=="一张图"){
            //var currentDate = new Date().format("yyyy-MM-dd hh:mm:ss")
            if(properties.hasOwnProperty("showType")){
                if(properties.showType=="预警态势"){
                    featurInfo=$("#map_box_yj");
                    $("#yj_alarmUnit").text(properties["所属单位"]);
                    $("#yj_level").text(properties["预警等级"]);
                    $("#yj_time").text(properties["预警时间"]);
                    $("#yj_type").text(properties["业务领域"]);
                    $("#yj_station").text(properties["预警站点"]);
                    $("#yj_info").text(properties["预警类型"]);
                    $("#yj_value").text(properties["预警值"]);
                    $("#yj_limit").text(properties["预警阈值"]);
                    $("#yj_status").text(properties["处置状态"]);
                    //featurInfo.show();
                }else{
                    featurInfo=$("#map_box");
                    $("#uljc").html('');
                    for(var key in properties){
                        if(key == "所属领域"){
                            var ele = document.createElement('li')
                            ele.id="ssly";
                            ele.class="yh_detail";
                            ele.innerHTML="所属领域:";
                            document.getElementById('uljc').appendChild(ele);
                            var ele1 = document.createElement('span')
                            ele1.innerHTML=properties["所属领域"];
                            document.getElementById("ssly").appendChild(ele1);
                        }if(key == "运营单位"){
                            var ele = document.createElement('li')
                            ele.id="yydw";
                            ele.class="yh_detail";
                            ele.innerHTML="运营单位:";
                            document.getElementById('uljc').appendChild(ele);
                            var ele1 = document.createElement('span')
                            ele1.innerHTML=properties["运营单位"];
                            document.getElementById("yydw").appendChild(ele1);
                        }else if(key == "站点名称"){
                            var ele = document.createElement('li')
                            ele.id="jczd";
                            ele.class="yh_detail";
                            ele.innerHTML="站点名称:";
                            document.getElementById('uljc').appendChild(ele);
                            var ele1 = document.createElement('span')
                            ele1.innerHTML=properties["站点名称"];
                            document.getElementById("jczd").appendChild(ele1);
                        }else if(key =="监测指标"){
                            properties["监测指标"].forEach((item)=>{
                                if(item!=null){
                                    ajax_Method({
                                        url: "/Xjgl/zr/getShiShiShuJu",
                                        data: {
                                            id: properties["code"],
                                            typeid: item[0]
                                        },
                                        successCallback(res) {
                                            let name1 = item[0]=="状态"?item[0]:item[0]+"("+item[2]+")";
                                            var ele = document.createElement('li')
                                            ele.id="li"+item[1];
                                            ele.class="yh_detail";
                                            ele.innerHTML=name1+":";
                                            document.getElementById('uljc').appendChild(ele);
                                            var ele1 = document.createElement('span')
                                            ele1.id="td"+item[1];
                                            document.getElementById(ele.id).appendChild(ele1);
                                            if(res!=null&&res.length!=0){
                                                if(res[0].value!=undefined)
                                                    ele1.innerHTML=res[0].value;
                                                //$(ele1.id).text(res[0].value);
                                            }

                                        }
                                    });
                                    /*                                    let name1 = item[0]=="状态"?item[0]:item[0]+"("+item[2]+")";
                                                                        var ele = document.createElement('li')
                                                                        ele.id="li"+item[1];
                                                                        ele.class="yh_detail";
                                                                        ele.innerHTML=name1+":";
                                                                        document.getElementById('uljc').appendChild(ele);
                                                                        var ele1 = document.createElement('span')
                                                                        ele1.id="td"+item[1];
                                                                        document.getElementById(ele.id).appendChild(ele1);*/
                                }
                            })
                            /*                            wsMapRealData.pageType="yxqs"
                                                        wsMapRealData.getClickStation(properties["id"]);*/
                        }
                    }

                }
                featurInfo.show();
            }else if(properties["layer"] == "天然气线"){
                featurInfo=$("#mapLine_box");
                $("#ssly1").text(properties["layer"]);
                $("#qsdw1").text(properties["权属单位"]);
                $("#dlmc1").text(properties["道路名称"]);
                $("#tcdw1").text(properties["探测单位"]);
                $("#jldw1").text(properties["监理单位"]);
                $("#qdh").text(properties["起点号"]);
                $("#zdh").text(properties["止点号"]);
                $("#gxlx").text(properties["管线段类型"]);
                $("#gxcz").text(properties["管线材质"]);
                $("#gxgg").text(properties["管线规格"]);
                $("#msfs").text(properties["埋设方式"]);
                $("#jsnd").text(properties["建设年代"]);
                $("#tcrq").text(properties["探测日期"]);
                $("#zt1").text(properties["状态"]);
                $("#qdms").text(properties["起点埋深"]);
                $("#zdms").text(properties["终点埋深"]);
                $("#gxcd").text(properties["管线长度"]);
                featurInfo.show();
            }
        }else if(LoadLargeMap.currentMapType=="管网一张图"){
            featurInfo.hide();
            pointFeatureInfo.hide();
            czFeatureInfo.hide();
            if(properties["layer"] == "天然气线" || properties["layer"] == "给水线" || properties["layer"] == "排水线" || properties["layer"] == "蒸汽线"){
                $("#ssly1").text(properties["layer"]);
                $("#qsdw1").text(properties["权属单位"]!=null?properties["权属单位"]:'');
                $("#dlmc1").text(properties["道路名称"]!=null?properties["道路名称"]:'');
                $("#tcdw1").text(properties["探测单位"]!=null?properties["探测单位"]:'');
                $("#jldw1").text(properties["监理单位"]!=null?properties["监理单位"]:'');
                $("#qdh").text(properties["起点号"]!=null?properties["起点号"]:'');
                $("#zdh").text(properties["止点号"]!=null?properties["止点号"]:'');
                $("#gxlx").text(properties["管线段类型"]!=null?properties["管线段类型"]:'');
                $("#gxcz").text(properties["管线材质"]!=null?properties["管线材质"]:'');
                $("#gxgg").text(properties["管线规格"]!=null?properties["管线规格"]:'');
                $("#msfs").text(properties["埋设方式"]!=null?properties["埋设方式"]:'');
                $("#jsnd").text(properties["建设年代"]!=null?properties["建设年代"]:'');
                $("#tcrq").text(properties["探测日期"]!=null?properties["探测日期"]:'');
                $("#zt1").text(properties["状态"]!=null?properties["状态"]:'');
                $("#qdms").text(properties["起点埋深"]!=null?properties["起点埋深"]:'');
                $("#zdms").text(properties["终点埋深"]!=null?properties["终点埋深"]:'');
                $("#gxcd").text(properties["管线长度"]!=null?properties["管线长度"]:'');
                featurInfo.show();
            }else if(properties["layer"] == "天然气点" || properties["layer"] == "给水点" || properties["layer"] == "排水点" || properties["layer"] == "蒸汽点"){
                $("#ssly2").text(properties["layer"]);
                $("#qsdw2").text(properties["权属单位"]!=null?properties["权属单位"]:'');
                $("#dlmc2").text(properties["道路名称"]!=null?properties["道路名称"]:'');
                $("#jcss2").text(properties["探测单位"]!=null?properties["探测单位"]:'');
                $("#jldw2").text(properties["监理单位"]!=null?properties["监理单位"]:'');
                $("#gdh").text(properties["管线点号"]);
                $("#x").text(properties["x坐标"]);
                $("#y").text(properties["y坐标"]);
                $("#gdlx").text(properties["管线点类型"]!=null?properties["管线点类型"]:'');
                $("#tz").text(properties["特征"]!=null?properties["特征"]:'');
                $("#jsnd2").text(properties["建设年代"]!=null?properties["建设年代"]:'');
                $("#tcrq2").text(properties["探测日期"]!=null?properties["探测日期"]:'');
                $("#zt2").text(properties["状态"]!=null?properties["状态"]:'');
                pointFeatureInfo.show();
            }else if(properties["showType"] == "场站监测"){
                $("#czmc").text(properties["场站名称"]!=null?properties["场站名称"]:'');
                $("#czlx").text(properties["场站类型"]!=null?properties["场站类型"]:'');
                $("#czdz").text(properties["场站位置"]!=null?properties["场站位置"]:'');
                $("#gqnl").text(properties["供气能力"]!=null?properties["供气能力"]:'');
                $("#gqlx").text(properties["供气类型"]!=null?properties["供气类型"]:'');
                $("#ssdw").text(properties["所属单位"]!=null?properties["所属单位"]:'');
                czFeatureInfo.show();
            }
        }else if(LoadLargeMap.currentMapType=="智能选点"){
            featurInfo=$("#map_box");
            $("#mbmc").text(properties["目标名称"]);
            $("#mblx").text(properties["目标类型"]);
            $("#lxr").text(properties["联系人"]);
            $("#lxfs").text(properties["联系方式"]);
            $("#szdw").text(properties["所在单位"]);
            $("#xxzt").text(properties["信息状态"]);
            featurInfo.show();
        }

    },
    //点击监测点线弹出的属性框内容
    showGxFeatureInfo:function(e,properties){
        let v=featurInfo[0];
        let html="";
        let html1="";
        for(var key in properties){
            if(properties[key] == null || key=='geometry' ||key=='id'||key=='showType' || key=="enabled"|| key=="shape_leng"||
                key=='gid'||key=='objectid'||key=='符号id'||key=='燃气类型'||key=='备注'||key=='管线段号'||key=='fid_'||key=='lyrlock'||key=='lyron'
                ||key=='lyrvpfrzn'||key=='lyrhandle'||key=='refname' || key=="health_type" || key =="year_range"){
                continue;
            }else if(key == "layer" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"图层"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "version" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"版本"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "entity" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"实体"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "color" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"颜色"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "linetype" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"线型"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "elevation" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"高程"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "linewt" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"线wt"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key == "angle" ){
                html+="<tr class='title'><td  style='width:40%;'>"+"角度"+"</td><td> "+properties[key]+"</td></tr>";
            }else if(key=="道路名称" || key=="权属单位" || key=="探测单位" || key=="监理单位"){
                html1+="<tr class='title'><td  style='width:40%;'>"+key+"</td><td> "+properties[key]+"</td></tr>"
            }else if(key=="监测指标"){
                properties[key].forEach((item)=>{
                    if(item!=null)
                        html+="<tr class='title'><td  style='width:40%;'>"+item[0]+"</td><td> "+item[1]+"</td></tr>";
                })
            }else {
                html+="<tr class='title'><td  style='width:40%;'>"+key+"</td><td> "+properties[key]+"</td></tr>";
            }
        }

        v.innerHTML=html1+html;
        featurInfo.show();
    },
    //关闭属性显示框
    closeFeatureInfo:function(){
        LoadLargeMap.highlightL.getSource().clear();
        if(typeof(featurInfo) != "undefined")
            featurInfo.hide();
        if(typeof(pointFeatureInfo) != "undefined")
            pointFeatureInfo.hide();
        if(typeof(czFeatureInfo) != "undefined")
            czFeatureInfo.hide();
    },

    //高亮矢量图层
    highLightVectorFeature : function(feature){
        LoadLargeMap.highlightL.getSource().clear();
        if (feature) {
            LoadLargeMap.highlightL.getSource().addFeature(feature);
        }
        LoadLargeMap.highlightF = feature;
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
    //报警闪烁
    flashYjLayer:function (layer,flash) {
        var flag=true;
        if(layer.values_.id == "rq_cgx"){
            if(flash){
                LoadLargeMap.animationYjCgx=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYjCgx);
            }
        }else if(layer.values_.id == "rq_gx"){
            if(flash){
                LoadLargeMap.animationYjGx=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYjGx);
            }
        }else if(layer.values_.id == "rq_dx"){
            if(flash){
                LoadLargeMap.animationYjDx=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYjDx);
            }
        }else if(layer.values_.id == "rq_cdx"){
            if(flash){
                LoadLargeMap.animationYjCdx=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYjCdx);
            }
        }
    },
    //隐患处未处理和处理中闪烁
    flashYhLayer:function (layer,flash) {
        var flag=true;
        if(layer.values_.id == "rq_yb_pc_dcl"){
            if(flash){
                LoadLargeMap.animationYhYbpcdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbpcdcl);
            }
        }else if(layer.values_.id == "rq_yb_pc_clz"){
            if(flash){
                LoadLargeMap.animationYhYbpcclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbpcclz);
            }
        }else if(layer.values_.id == "rq_yb_xj_dcl"){
            if(flash){
                LoadLargeMap.animationYhYbxjdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbxjdcl);
            }
        }else if(layer.values_.id == "rq_yb_xj_clz"){
            if(flash){
                LoadLargeMap.animationYhYbxjclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbxjclz);
            }
        }else if(layer.values_.id == "rq_yb_yj_dcl"){
            if(flash){
                LoadLargeMap.animationYhYbyjdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbyjdcl);
            }
        }else if(layer.values_.id == "rq_yb_yj_clz"){
            if(flash){
                LoadLargeMap.animationYhYbyjclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbyjclz);
            }
        }else if(layer.values_.id == "rq_yb_sb_dcl"){
            if(flash){
                LoadLargeMap.animationYhYbsbdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbsbdcl);
            }
        }else if(layer.values_.id == "rq_yb_sb_clz"){
            if(flash){
                LoadLargeMap.animationYhYbsbclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbsbclz);
            }
        }else if(layer.values_.id == "rq_yb_fx_dcl"){
            if(flash){
                LoadLargeMap.animationYhYbfxdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbfxdcl);
            }
        }else if(layer.values_.id == "rq_yb_fx_clz"){
            if(flash){
                LoadLargeMap.animationYhYbfxclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhYbfxclz);
            }
        }else if(layer.values_.id == "rq_jd_pc_dcl"){
            if(flash){
                LoadLargeMap.animationYhJdpcdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdpcdcl);
            }
        }else if(layer.values_.id == "rq_jd_pc_clz"){
            if(flash){
                LoadLargeMap.animationYhJdpcclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdpcclz);
            }
        }else if(layer.values_.id == "rq_jd_xj_dcl"){
            if(flash){
                LoadLargeMap.animationYhJdxjdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdxjdcl);
            }
        }else if(layer.values_.id == "rq_jd_xj_clz"){
            if(flash){
                LoadLargeMap.animationYhJdxjclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdxjclz);
            }
        }else if(layer.values_.id == "rq_jd_yj_dcl"){
            if(flash){
                LoadLargeMap.animationYhJdyjdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdyjdcl);
            }
        }else if(layer.values_.id == "rq_jd_yj_clz"){
            if(flash){
                LoadLargeMap.animationYhJdyjclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdyjclz);
            }
        }else if(layer.values_.id == "rq_jd_sb_dcl"){
            if(flash){
                LoadLargeMap.animationYhJdsbdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdsbdcl);
            }
        }else if(layer.values_.id == "rq_jd_sb_clz"){
            if(flash){
                LoadLargeMap.animationYhJdsbclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdsbclz);
            }
        }else if(layer.values_.id == "rq_jd_fx_dcl"){
            if(flash){
                LoadLargeMap.animationYhJdfxdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdfxdcl);
            }
        }else if(layer.values_.id == "rq_jd_fx_clz"){
            if(flash){
                LoadLargeMap.animationYhJdfxclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhJdfxclz);
            }
        }else if(layer.values_.id == "rq_zd_pc_dcl"){
            if(flash){
                LoadLargeMap.animationYhZdpcdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdpcdcl);
            }
        }else if(layer.values_.id == "rq_zd_pc_clz"){
            if(flash){
                LoadLargeMap.animationYhZdpcclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdpcclz);
            }
        }else if(layer.values_.id == "rq_zd_xj_dcl"){
            if(flash){
                LoadLargeMap.animationYhZdxjdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdxjdcl);
            }
        }else if(layer.values_.id == "rq_zd_xj_clz"){
            if(flash){
                LoadLargeMap.animationYhZdxjclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdxjclz);
            }
        }else if(layer.values_.id == "rq_zd_yj_dcl"){
            if(flash){
                LoadLargeMap.animationYhZdyjdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdyjdcl);
            }
        }else if(layer.values_.id == "rq_zd_yj_clz"){
            if(flash){
                LoadLargeMap.animationYhZdyjclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdyjclz);
            }
        }else if(layer.values_.id == "rq_zd_sb_dcl"){
            if(flash){
                LoadLargeMap.animationYhZdsbdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdsbdcl);
            }
        }else if(layer.values_.id == "rq_zd_sb_clz"){
            if(flash){
                LoadLargeMap.animationYhZdsbclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdsbclz);
            }
        }else if(layer.values_.id == "rq_zd_fx_dcl"){
            if(flash){
                LoadLargeMap.animationYhZdfxdcl=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdfxdcl);
            }
        }else if(layer.values_.id == "rq_zd_fx_clz"){
            if(flash){
                LoadLargeMap.animationYhZdfxclz=setInterval(()=>{
                    flag=!flag;
                    layer.setVisible(flag);
                },300);
            }else{
                clearInterval(LoadLargeMap.animationYhZdfxclz);
            }
        }
    },
    //设备一张图选中管线闪烁
    flashSbyztLayer:function (layer) {
        var timesRun = 0;
        var flag=true;
        var interval = setInterval(function(){
            timesRun += 1;
            if(timesRun === 6){
                clearInterval(interval);
            }
            flag = !flag;
            layer.setVisible(flag);
        }, 300);
    },
    //定位
    flyToFeature : function(coordinate1){
        if(!coordinate1[0]) return;
        this.view.animate({zoom: 18}, {center: coordinate1},{duration:500});
        this.highLightVectorFeature(new ol.Feature({
            geometry:new ol.geom.Point(coordinate1),
        }))
    },
    //点击专业类型CheckBox图层显隐
    checkFieldVisible:function(yhType,yhjb,ischeck){
        switch (yhType) {
            case "燃气":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("rq_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("rq_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("rq_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("rq0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("rq1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("rq2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("rq3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("rq_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("rq_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("rq_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("rq_cdx").setVisible(ischeck);
                    }
                }
                break;
            case "给水":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("gs_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("gs_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("gs_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("gs0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("gs1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("gs2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("gs3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("gs_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("gs_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("gs_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("gs_cdx").setVisible(ischeck);
                    }
                }
                break;
            case "排水":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("ps_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("ps_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("ps_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("ps0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("ps1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("ps2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("ps3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("ps_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("ps_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("ps_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("ps_cdx").setVisible(ischeck);
                    }
                }
                break;
            case "热力":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("rl_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("rl_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("rl_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("rl0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("rl1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("rl2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("rl3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("rl_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("rl_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("rl_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("rl_cdx").setVisible(ischeck);
                    }
                }
                break;
            case "井盖":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("rl_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("rl_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("rl_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("rl0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("rl1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("rl2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("rl3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("rl_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("rl_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("rl_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("rl_cdx").setVisible(ischeck);
                    }
                }
                break;
            case "电缆":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("rl_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("rl_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("rl_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("rl0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("rl1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("rl2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("rl3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("rl_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("rl_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("rl_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("rl_cdx").setVisible(ischeck);
                    }
                }
                break;
            case "消防栓":
                for (var i=0;i<yhjb.length;i++) {
                    if (yhjb[i] == "一般隐患") {
                        LoadLargeMap.map.getLayerById("rl_yb").setVisible(ischeck);
                    } else if (yhjb[i] == "较大隐患") {
                        LoadLargeMap.map.getLayerById("rl_jd").setVisible(ischeck);
                    } else if (yhjb[i] == "重大隐患") {
                        LoadLargeMap.map.getLayerById("rl_zd").setVisible(ischeck);
                    }else if (yhjb[i] == "健康") {
                        LoadLargeMap.map.getLayerById("rl0").setVisible(ischeck);
                    }else if (yhjb[i] == "一般") {
                        LoadLargeMap.map.getLayerById("rl1").setVisible(ischeck);
                    }else if (yhjb[i] == "较差") {
                        LoadLargeMap.map.getLayerById("rl2").setVisible(ischeck);
                    }else if (yhjb[i] == "危险") {
                        LoadLargeMap.map.getLayerById("rl3").setVisible(ischeck);
                    }else if (yhjb[i] == "超高限") {
                        LoadLargeMap.map.getLayerById("rl_cgx").setVisible(ischeck);
                    }else if (yhjb[i] == "高限") {
                        LoadLargeMap.map.getLayerById("rl_gx").setVisible(ischeck);
                    }else if (yhjb[i] == "低限") {
                        LoadLargeMap.map.getLayerById("rl_dx").setVisible(ischeck);
                    }else if (yhjb[i] == "超低限") {
                        LoadLargeMap.map.getLayerById("rl_cdx").setVisible(ischeck);
                    }
                }
                break;
            default:
                break;
        }

    },
    checkYxqsFieldVisible:function(yhType,ischeck){
        switch (yhType) {
            case "燃气":
                LoadLargeMap.map.getLayerById("rqzd").setVisible(ischeck);
                break;
            case "给水":
                LoadLargeMap.map.getLayerById("gszd").setVisible(ischeck);
                break;
            case "排水":
                LoadLargeMap.map.getLayerById("pszd").setVisible(ischeck);
                break;
            case "热力":
                LoadLargeMap.map.getLayerById("rlzd").setVisible(ischeck);
                break;
            default:
                break;
        }

    },
    checkSjgxFieldVisible:function(yhType,ischeck){
        switch (yhType) {
            case "燃气":
                LoadLargeMap.map.getLayerById("42").setVisible(ischeck);
                break;
            case "给水":
                LoadLargeMap.map.getLayerById("48").setVisible(ischeck);
                break;
            case "排水":
                LoadLargeMap.map.getLayerById("52").setVisible(ischeck);
                break;
            case "热力":
                LoadLargeMap.map.getLayerById("45").setVisible(ischeck);
                break;
            default:
                break;
        }

    },
    checkZnxdFieldVisible:function(yhType,ischeck){
        switch (yhType) {
            case "防护目标":
                //LoadLargeMap.map.getLayerById("rkjz_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("rkjz").setVisible(ischeck);
                break;
            case "产业集聚":
                //LoadLargeMap.map.getLayerById("cyjj_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("cyjj").setVisible(ischeck);
                break;
            case "设施老旧":
                //LoadLargeMap.map.getLayerById("sslj_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("sslj").setVisible(ischeck);
                break;
            case "隐患风险高":
                //LoadLargeMap.map.getLayerById("yhfx_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("yhfx").setVisible(ischeck);
                break;
            case "高预警区域":
                //LoadLargeMap.map.getLayerById("gyj_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("gyj").setVisible(ischeck);
                break;
            case "高压":
                //LoadLargeMap.map.getLayerById("gy_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("gy").setVisible(ischeck);
                break;
            case "燃气场站":
                //LoadLargeMap.map.getLayerById("rqcz_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("rqcz").setVisible(ischeck);
                break;
            case "用气餐饮场所":
                //LoadLargeMap.map.getLayerById("yqcy_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("yqcy").setVisible(ischeck);
                break;
            case "风险区域":
                //LoadLargeMap.map.getLayerById("fx_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("fx").setVisible(ischeck);
                break;
            case "相邻地下空间":
                //LoadLargeMap.map.getLayerById("xldxkj_qy").setVisible(ischeck);
                LoadLargeMap.map.getLayerById("xldxkj").setVisible(ischeck);
                break;
            default:
                break;
        }

    },
    //点击隐患类别CheckBox图层显隐
    checkYhjbVisible:function(yhType,yhjb,ischeck){
        switch (yhjb) {
            case "一般隐患":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_yb").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_yb").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_yb").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_yb").setVisible(ischeck);
                    }else if (yhType[i] == "井盖") {
                        LoadLargeMap.map.getLayerById("rq_yb").setVisible(ischeck);
                    }else if (yhType[i] == "电缆") {
                        LoadLargeMap.map.getLayerById("rq_yb").setVisible(ischeck);
                    }else if (yhType[i] == "消防栓") {
                        LoadLargeMap.map.getLayerById("rq_yb").setVisible(ischeck);
                    }
                }
                break;
            case "较大隐患":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_jd").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_jd").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_jd").setVisible(ischeck);
                    } else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_jd").setVisible(ischeck);
                    }else if (yhType[i] == "井盖") {
                        LoadLargeMap.map.getLayerById("rq_jd").setVisible(ischeck);
                    }else if (yhType[i] == "电缆") {
                        LoadLargeMap.map.getLayerById("rq_jd").setVisible(ischeck);
                    }else if (yhType[i] == "消防栓") {
                        LoadLargeMap.map.getLayerById("rq_jd").setVisible(ischeck);
                    }
                }
                break;
            case "重大隐患":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_zd").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_zd").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_zd").setVisible(ischeck);
                    } else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_zd").setVisible(ischeck);
                    }else if (yhType[i] == "井盖") {
                        LoadLargeMap.map.getLayerById("rq_zd").setVisible(ischeck);
                    }else if (yhType[i] == "电缆") {
                        LoadLargeMap.map.getLayerById("rq_zd").setVisible(ischeck);
                    }else if (yhType[i] == "消防栓") {
                        LoadLargeMap.map.getLayerById("rq_zd").setVisible(ischeck);
                    }
                }
                break;
            case "健康":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq0").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs0").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps0").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl0").setVisible(ischeck);
                    }
                }
                break;
            case "一般":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq1").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs1").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps1").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl1").setVisible(ischeck);
                    }
                }
                break;
            case "较差":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq2").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs2").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps2").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl2").setVisible(ischeck);
                    }
                }
                break;
            case "危险":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq3").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs3").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps3").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl3").setVisible(ischeck);
                    }
                }
                break;
            case "超高限":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_cgx").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_cgx").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_cgx").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_cgx").setVisible(ischeck);
                    }
                }
                break;
            case "高限":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_gx").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_gx").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_gx").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_gx").setVisible(ischeck);
                    }
                }
                break;
            case "低限":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_dx").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_dx").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_dx").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_dx").setVisible(ischeck);
                    }
                }
                break;
            case "超低限":
                for (var i=0;i<yhType.length;i++) {
                    if (yhType[i] == "燃气") {
                        LoadLargeMap.map.getLayerById("rq_cdx").setVisible(ischeck);
                    } else if (yhType[i] == "给水") {
                        LoadLargeMap.map.getLayerById("gs_cdx").setVisible(ischeck);
                    } else if (yhType[i] == "排水") {
                        LoadLargeMap.map.getLayerById("ps_cdx").setVisible(ischeck);
                    }else if (yhType[i] == "热力") {
                        LoadLargeMap.map.getLayerById("rl_cdx").setVisible(ischeck);
                    }
                }
                break;
            default:
                break;
        }
    },
    //燃气-点击隐患类别CheckBox图层显隐
    checkRqYhVisible:function(checkName,checkedList,ischeck){
        switch (checkName) {
            case "一般隐患":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "排查" && LoadLargeMap.map.getLayerById("rq_yb_pc")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_pc").setVisible(ischeck);
                    } else if (checkedList[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_yb_xj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_xj").setVisible(ischeck);
                    } else if (checkedList[i] == "预警" && LoadLargeMap.map.getLayerById("rq_yb_yj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_yj").setVisible(ischeck);
                    }else if (checkedList[i] == "上报" && LoadLargeMap.map.getLayerById("rq_yb_sb")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_sb").setVisible(ischeck);
                    }else if (checkedList[i] == "分析" && LoadLargeMap.map.getLayerById("rq_yb_fx")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_fx").setVisible(ischeck);
                    }
                }
                break;
            case "较大隐患":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "排查" && LoadLargeMap.map.getLayerById("rq_jd_pc")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_pc").setVisible(ischeck);
                    } else if (checkedList[i] == "巡检" && LoadLargeMap.map.getLayerById("rq_jd_xj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_xj").setVisible(ischeck);
                    } else if (checkedList[i] == "预警" && LoadLargeMap.map.getLayerById("rq_jd_yj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_yj").setVisible(ischeck);
                    }else if (checkedList[i] == "上报" && LoadLargeMap.map.getLayerById("rq_jd_sb")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_sb").setVisible(ischeck);
                    }else if (checkedList[i] == "分析" && LoadLargeMap.map.getLayerById("rq_jd_fx")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_fx").setVisible(ischeck);
                    }
                }
                break;
            case "重大隐患":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "排查" && LoadLargeMap.map.getLayerById("rq_zd_pc")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_pc").setVisible(ischeck);
                    } else if (checkedList[i] == "巡检" && LoadLargeMap.map.getLayerById("rq_zd_xj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_xj").setVisible(ischeck);
                    } else if (checkedList[i] == "预警" && LoadLargeMap.map.getLayerById("rq_zd_yj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_yj").setVisible(ischeck);
                    }else if (checkedList[i] == "上报" && LoadLargeMap.map.getLayerById("rq_zd_sb")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_sb").setVisible(ischeck);
                    }else if (checkedList[i] == "分析" && LoadLargeMap.map.getLayerById("rq_zd_fx")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_fx").setVisible(ischeck);
                    }
                }
                break;
            case "排查":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_pc").setVisible(ischeck);
                    } else if (checkedList[i] == "较大隐患" && LoadLargeMap.map.getLayerById("较大隐患")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_pc").setVisible(ischeck);
                    } else if (checkedList[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_pc").setVisible(ischeck);
                    }
                }
                break;
            case "巡检":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_xj").setVisible(ischeck);
                    } else if (checkedList[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_xj").setVisible(ischeck);
                    } else if (checkedList[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_xj").setVisible(ischeck);
                    }
                }
                break;
            case "预警":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_yj").setVisible(ischeck);
                    } else if (checkedList[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_yj").setVisible(ischeck);
                    } else if (checkedList[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_yj").setVisible(ischeck);
                    }
                }
                break;
            case "上报":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_sb")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_sb").setVisible(ischeck);
                    } else if (checkedList[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_sb")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_sb").setVisible(ischeck);
                    } else if (checkedList[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_sb")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_sb").setVisible(ischeck);
                    }
                }
                break;
            case "分析":
                for (var i=0;i<checkedList.length;i++) {
                    if (checkedList[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx")!=null) {
                        LoadLargeMap.map.getLayerById("rq_yb_fx").setVisible(ischeck);
                    } else if (checkedList[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx")!=null) {
                        LoadLargeMap.map.getLayerById("rq_jd_fx").setVisible(ischeck);
                    } else if (checkedList[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx")!=null) {
                        LoadLargeMap.map.getLayerById("rq_zd_fx").setVisible(ischeck);
                    }
                }
                break;
            default:
                break;
        }
    },
    //燃气-点击隐患级别、来源、状态图层显隐
    checkRqYh3jVisible:function(checkName,checkedList1,checkedList2,ischeck){
        switch (checkName) {
            case "一般隐患":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if(checkedList2[j] == "未处理"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_yb_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_yb_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_yb_yj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_yj_dcl"),ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_yb_sb_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_sb_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_sb_dcl"),ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_yb_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_fx_dcl"),ischeck);
                            }
                        }else if(checkedList2[j] == "处理中"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_yb_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_yb_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_yb_yj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_yj_clz"),ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_yb_sb_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_sb_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_sb_clz"),ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_yb_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_fx_clz"),ischeck);
                            }
                        }else if(checkedList2[j] == "已处理"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_yb_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_yb_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_yb_yj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_ycl").setVisible(ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_yb_sb_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_sb_ycl").setVisible(ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_yb_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "较大隐患":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if(checkedList2[j] == "未处理"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_jd_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_jd_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_jd_yj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_yj_dcl"),ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_jd_sb_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_sb_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_sb_dcl"),ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_jd_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_fx_dcl"),ischeck);
                            }
                        }else if(checkedList2[j] == "处理中"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_jd_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_jd_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_jd_yj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_yj_clz"),ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_jd_sb_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_sb_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_sb_clz"),ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_jd_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_fx_clz"),ischeck);
                            }
                        }else if(checkedList2[j] == "已处理"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_jd_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_jd_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_jd_yj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_ycl").setVisible(ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_jd_sb_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_sb_ycl").setVisible(ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_jd_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "重大隐患":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if(checkedList2[j] == "未处理"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_zd_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_zd_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_zd_yj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_yj_dcl"),ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_zd_sb_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_sb_dcl"),ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_zd_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_fx_dcl"),ischeck);
                            }
                        }else if(checkedList2[j] == "处理中"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_zd_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_zd_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_zd_yj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_yj_clz"),ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_zd_sb_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_sb_clz"),ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_zd_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_fx_clz"),ischeck);
                            }
                        }else if(checkedList2[j] == "已处理"){
                            if (checkedList1[i] == "排查" && LoadLargeMap.map.getLayerById("rq_zd_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "巡检"&& LoadLargeMap.map.getLayerById("rq_zd_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "预警" && LoadLargeMap.map.getLayerById("rq_zd_yj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_ycl").setVisible(ischeck);
                            }else if (checkedList1[i] == "上报" && LoadLargeMap.map.getLayerById("rq_zd_sb_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_ycl").setVisible(ischeck);
                            }else if (checkedList1[i] == "分析" && LoadLargeMap.map.getLayerById("rq_zd_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "排查":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "未处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_pc_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "处理中") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_pc_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "已处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "巡检":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "未处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_xj_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "处理中") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_xj_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "已处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "预警":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "未处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_yj_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_yj_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_yj_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "处理中") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_yj_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_yj_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_yj_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "已处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "上报":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "未处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_bs_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_bs_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_bs_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_bs_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_bs_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_bs_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_bs_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_bs_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_bs_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "处理中") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_bs_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_bs_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_bs_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_bs_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_bs_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_bs_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_bs_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_bs_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_bs_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "已处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_bs_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_bs_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_bs_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_bs_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_bs_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "分析":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "未处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_fx_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_fx_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_fx_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "处理中") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_fx_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_fx_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_fx_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "已处理") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            case "未处理":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "排查") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_pc_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_pc_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "巡检") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_xj_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_xj_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "预警") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_cdl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_yj_cdl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_cdl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_yj_cdl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_cdl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_yj_cdl"),ischeck);
                            }
                        }else if (checkedList2[j] == "上报") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_sb_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_sb_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_sb_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_sb_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_sb_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_sb_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_sb_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_sb_dcl"),ischeck);
                            }
                        }else if (checkedList2[j] == "分析") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_fx_dcl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_fx_dcl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx_dcl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_dcl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_fx_dcl"),ischeck);
                            }
                        }
                    }
                }
                break;
            case "处理中":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "排查") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_pc_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_pc_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "巡检") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_xj_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_xj_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "预警") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_cdl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_yj_cdl"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_cdl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_yj_cdl"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_cdl").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_yj_cdl"),ischeck);
                            }
                        }else if (checkedList2[j] == "上报") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_sb_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_sb_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_sb_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_sb_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_sb_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_sb_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_sb_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_sb_clz"),ischeck);
                            }
                        }else if (checkedList2[j] == "分析") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_yb_fx_clz"),ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_jd_fx_clz"),ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx_clz")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_clz").setVisible(ischeck);
                                //LoadLargeMap.flashYhLayer(LoadLargeMap.map.getLayerById("rq_zd_fx_clz"),ischeck);
                            }
                        }
                    }
                }
                break;
            case "已处理":
                for (var i=0;i<checkedList1.length;i++) {
                    for (var j=0;j<checkedList2.length;j++) {
                        if (checkedList2[j] == "排查") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_pc_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_pc_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_pc_ycl").setVisible(ischeck);
                            }
                        }else if (checkedList2[j] == "巡检") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_xj_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_xj_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_xj_ycl").setVisible(ischeck);
                            }
                        }else if (checkedList2[j] == "预警") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_yj_cdl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_yj_cdl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_yj_cdl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_yj_cdl").setVisible(ischeck);
                            }
                        }else if (checkedList2[j] == "上报") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_sb_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_sb_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_sb_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_sb_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_sb_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_sb_ycl").setVisible(ischeck);
                            }
                        }else if (checkedList2[j] == "分析") {
                            if (checkedList1[i] == "一般隐患" && LoadLargeMap.map.getLayerById("rq_yb_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_yb_fx_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "较大隐患" && LoadLargeMap.map.getLayerById("rq_jd_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_jd_fx_ycl").setVisible(ischeck);
                            } else if (checkedList1[i] == "重大隐患" && LoadLargeMap.map.getLayerById("rq_zd_fx_ycl")!=null) {
                                LoadLargeMap.map.getLayerById("rq_zd_fx_ycl").setVisible(ischeck);
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
    },
    //燃气-设备一张图权属单位和高中低压CheckBox图层显隐(checkValue当前勾选单位，isCheck是否勾选，checkedList权属单位选中的集合)
    checkRqQsdwGxVisile:function (checkValue,checkedList,isCheck) {
        LoadLargeMap.gxQsdwList=checkedList;
        LoadLargeMap.gxYllxList.forEach(function(item){
            switch (item) {
                case "低压":
                    switch (checkValue) {
                        case "东风中燃":
                            LoadLargeMap.map.getLayerById("rq_dy_zr").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_zr"))
                            break;
                        case "昆仑燃气":
                            LoadLargeMap.map.getLayerById("rq_dy_kl").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_kl"))
                            break;
                        case "中国燃气(丹江)":
                            LoadLargeMap.map.getLayerById("rq_dy_zgdj").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_zgdj"))
                            break;
                        case "中国燃气(滨江新区)":
                            LoadLargeMap.map.getLayerById("rq_dy_zgbj").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_zgbj"))
                            break;
                        default:
                            break;
                    }
                    break;
                case "中压":
                    switch (checkValue) {
                        case "东风中燃":
                            LoadLargeMap.map.getLayerById("rq_zy_zr").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_zr"))
                            break;
                        case "昆仑燃气":
                            LoadLargeMap.map.getLayerById("rq_zy_kl").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_kl"))
                            break;
                        case "中国燃气(丹江)":
                            LoadLargeMap.map.getLayerById("rq_zy_zgdj").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_zgdj"))
                            break;
                        case "中国燃气(滨江新区)":
                            LoadLargeMap.map.getLayerById("rq_zy_zgbj").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_zgbj"))
                            break;
                        default:
                            break;
                    }
                    break;
                case "高压":
                    switch (checkValue) {
                        case "东风中燃":
                            LoadLargeMap.map.getLayerById("rq_gy_zr").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_zr"))
                            break;
                        case "昆仑燃气":
                            LoadLargeMap.map.getLayerById("rq_gy_kl").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_kl"))
                            break;
                        case "中国燃气(丹江)":
                            LoadLargeMap.map.getLayerById("rq_gy_zgdj").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_zgdj"))
                            break;
                        case "中国燃气(滨江新区)":
                            LoadLargeMap.map.getLayerById("rq_gy_zgbj").setVisible(isCheck);
                            if(isCheck)
                                LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_zgbj"))
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        })
        if(LoadLargeMap.isCheckedGd==true){
            switch (checkValue) {
                case "东风中燃":
                    LoadLargeMap.map.getLayerById("rq_gd_zr").setVisible(isCheck);
                    break;
                case "昆仑燃气":
                    LoadLargeMap.map.getLayerById("rq_gd_kl").setVisible(isCheck);
                    break;
                case "中国燃气(丹江)":
                    LoadLargeMap.map.getLayerById("rq_gd_zgdj").setVisible(isCheck);
                    break;
                case "中国燃气(滨江新区)":
                    LoadLargeMap.map.getLayerById("rq_gd_zgbj").setVisible(isCheck);
                    break;
                default:
                    break;
            }
        }
    },
    //点击隐患类别CheckBox图层显隐（燃气）
    checkYhjbVisibleRq:function(yhjb,ischeck){
        switch (yhjb) {
            case "一般隐患":
                if(LoadLargeMap.map.getLayerById("54")!=null)
                    LoadLargeMap.map.getLayerById("54").setVisible(ischeck);
                break;
            case "较大隐患":
                if(LoadLargeMap.map.getLayerById("55")!=null)
                    LoadLargeMap.map.getLayerById("55").setVisible(ischeck);
                break;
            case "重大隐患":
                if(LoadLargeMap.map.getLayerById("56")!=null)
                    LoadLargeMap.map.getLayerById("56").setVisible(ischeck);
                break;
            default:
                break;
        }
    },
    //点击预警类别CheckBox图层显隐（燃气）
    checkYjjbVisibleRq:function(yjjb,ischeck){
        switch (yjjb) {
            case "超高限":
                if(LoadLargeMap.map.getLayerById("rq_cgx")!=null)
                    LoadLargeMap.map.getLayerById("rq_cgx").setVisible(ischeck);
                break;
            case "高限":
                if(LoadLargeMap.map.getLayerById("rq_gx")!=null)
                    LoadLargeMap.map.getLayerById("rq_gx").setVisible(ischeck);
                break;
            case "低限":
                if(LoadLargeMap.map.getLayerById("rq_dx")!=null)
                    LoadLargeMap.map.getLayerById("rq_dx").setVisible(ischeck);
                break;
            case "超低限":
                if(LoadLargeMap.map.getLayerById("rq_cdx")!=null)
                    LoadLargeMap.map.getLayerById("rq_cdx").setVisible(ischeck);
                break;
            default:
                break;
        }
    },
    //点击管线类别CheckBox图层显隐（高中低压力）
    checkYjjbVisibleYl:function(yjjb,ischeck){
        switch (yjjb) {
            case "低压":
                if(LoadLargeMap.map.getLayerById("rq_dy")!=null){
                    LoadLargeMap.map.getLayerById("rq_dy").setVisible(ischeck);
                    if(ischeck)
                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy"));
                }
                break;
            case "中压":
                if(LoadLargeMap.map.getLayerById("rq_zy")!=null){
                    LoadLargeMap.map.getLayerById("rq_zy").setVisible(ischeck);
                    if(ischeck)
                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy"));
                }
                break;
            case "高压":
                if(LoadLargeMap.map.getLayerById("rq_gy")!=null){
                    LoadLargeMap.map.getLayerById("rq_gy").setVisible(ischeck);
                    if(ischeck)
                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy"));
                }
                break;
            default:
                break;
        }
    },
    //点击健康级别CheckBox图层显隐（燃气）
    checkHealthVisibleRq:function(yjjb,ischeck){
        switch (yjjb) {
            case "健康":
                if(LoadLargeMap.map.getLayerById("rq0")!=null)
                    LoadLargeMap.map.getLayerById("rq0").setVisible(ischeck);
                break;
            case "一般":
                if(LoadLargeMap.map.getLayerById("rq1")!=null)
                    LoadLargeMap.map.getLayerById("rq1").setVisible(ischeck);
                break;
            case "较差":
                if(LoadLargeMap.map.getLayerById("rq2")!=null)
                    LoadLargeMap.map.getLayerById("rq2").setVisible(ischeck);
                break;
            case "危险":
                if(LoadLargeMap.map.getLayerById("rq3")!=null)
                    LoadLargeMap.map.getLayerById("rq3").setVisible(ischeck);
                break;
            default:
                break;
        }
    },
    //地图单击事件
    singleclick : function (){
        LoadLargeMap.click = LoadLargeMap.map.on("singleclick", (e) => {
            console.log( e.coordinate[0]+"," +e.coordinate[1]);
            if(!LoadLargeMap.rectangleFlag)
                LoadLargeMap.rectangleFlag=false;
            let flag = false;
            LoadLargeMap.closeFeatureInfo();
            LoadLargeMap.map.forEachLayerAtPixel(
                e.pixel,
                (layer,rgba) => {
                    if (flag) return;
                    if(layer instanceof ol.layer.Vector){
                        if (flag) return;
                        let features = layer.getFeatures(e.pixel).then(function(features){
                            if (flag) return;
                            if (features.length == 0) return;
                            //数据管理标注信息查看
                            if(layer.values_.type == "sjgx_label"){
                                var img = new Image();
                                img.src='../../system/attachFile/getFileById?fileId='+layer.values_.name;
                                var imgUrl=img.src;
                                if (img.complete) {
                                } else {
                                    img.onload = function () {
                                        var max_height = $(window).height() - 300;
                                        var max_width = $(window).width();
                                        var rate1 = max_height / img.height;
                                        var rate2 = max_width / img.width;
                                        var rate3 = 1;
                                        var rate = Math.min(rate1, rate2, rate3);
                                        var imgHeight = img.height * rate;
                                        var imgWidth = img.width * rate;
                                        var imgHtml = "<img src='" + imgUrl + "' width='" + imgWidth + "px' height='" + imgHeight + "px'/>";
                                        openLayer(imgWidth, imgHeight, imgHtml);
                                    }
                                }
                                function openLayer(imgWidth, imgHeight, imgHtml) {
                                    layui.layer.open({
                                        title: false,
                                        area: ['auto', 'auto'],
                                        skin: 'clear_style',
                                        btn: false,
                                        content: imgHtml
                                    })
                                }
                                return;
                            }
                            //打开视频
                            if(layer.values_.type == "sp_vector"){
                                let pros = features[0].getProperties();
                                layui.layer.open({
                                    title: pros.站点名称,
                                    area: ['50%', '70%'],
                                    skin: 'clear_style',
                                    btn: false,
                                    content: '<video id="video4" src="/images/yanshi/01.mp4" controls="controls" style="width:100%;background-color: #000000;" autoplay="autoplay">\n' +
                                        '                    </video>'
                                })
                                return;
                            }
                            let pros = features[0].getProperties();
                            LoadLargeMap.showFeatureInfo(e.json,pros);
                            LoadLargeMap.highLightVectorFeature(features[0]);
                            let height = 200;
                            if(LoadLargeMap.currentMapType!="隐患态势" && LoadLargeMap.currentMapType!="预警态势") {
                                $('#map_box').css({'left':e.originalEvent.clientX+'px'});
                                $('#map_box').css({'top':e.originalEvent.clientY-height+'px'});
                                if(LoadLargeMap.currentMapType=="运行趋势"){
                                    $('#mapLine_box').css({'left':e.originalEvent.clientX+'px'});
                                    $('#mapLine_box').css({'top':e.originalEvent.clientY-height+'px'});
                                    $('#map_box_yj').css({'left':e.originalEvent.clientX+'px'});
                                    $('#map_box_yj').css({'top':e.originalEvent.clientY-height+'px'});
                                }else if(LoadLargeMap.currentMapType=="一张图"){
                                    $('#mapLine_box').css({'left':e.originalEvent.clientX+'px'});
                                    $('#mapLine_box').css({'top':e.originalEvent.clientY-height+'px'});
                                    $('#map_box_yj').css({'left':e.originalEvent.clientX+'px'});
                                    $('#map_box_yj').css({'top':e.originalEvent.clientY-height+'px'});
                                }
                                if(LoadLargeMap.currentMapType=="管网一张图"){
                                    $('#mapPoint_box').css({'left':e.originalEvent.clientX+'px'});
                                    $('#mapPoint_box').css({'top':e.originalEvent.clientY-height+'px'});
                                    $('#map_box_cz').css({'left':e.originalEvent.clientX+'px'});
                                    $('#map_box_cz').css({'top':e.originalEvent.clientY-height+'px'});
                                }
                            }
                            flag = true;
                        });
                    }
                }
            );
        })
    },
    //热力图
    loadHeatVector:function (){
        var count = 400;
        var lon = new Array(count);
        var coordinates = new Array(count);
        var lat = new Array(count);
        var dataSource;
        $.ajax({
            url: "/aqyh/wTblHiddendangerInformationDetails/getList",
            type: 'get',
            /*            data: {
                            hiddendangerState: "未消隐"
                        },*/
            dataType: 'json',
            async: false,
            success: function(results) {
                dataSource = results.data;
                for (var i = 0; i < results.data.length; i++) {
                    lon[i] = results.data[i].xPoint;
                    lat[i] =  results.data[i].yPoint;
                }
            }
        });

        var feas = [];

        for (var i = 0, len = dataSource.length; i < len; i++) {
            var provinceInfo = dataSource[i];
            //支持传入 GeoJSON 规范数据类型：
            var fea = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon[i], lat[i]]
                }
            };
            feas.push(fea);
        }

        heatData = {
            "type": "FeatureCollection",
            "features": feas
        };

        var blur = 50;// document.getElementById('blur');
        var radius = 50;//document.getElementById('radius');
        //矢量图层 获取gejson数据
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(heatData, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:4326'
            })
        });
        // Heatmap热力图
        var vector = new ol.layer.Heatmap({
            source: vectorSource,
            blur: parseInt(blur.value, 10),
            radius: parseInt(radius.value, 10),
        });
        return vector;
    },
    //加载隐患数据源（参数类型，级别）
    getYhSource : function(yhType,yhLevel){
        let features = [];
        ajax_Method({
            url: "/aqyh/wTblHiddendangerInformationDetails/queryByTypeLevel",
            data: {
                yhType: yhType,
                yhLevel: yhLevel
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].xPoint , res.data[index].yPoint];
                    var date = null;
                    if(res.data[index].findTime!=null){
                        date = new Date(res.data[index].findTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    features.push(new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].xPoint,
                        Y坐标:res.data[index].yPoint,
                        showType:"隐患态势",
                        id:res.data[index].id,
                        所在区县:res.data[index].districtCounty,
                        权属单位:res.data[index].ownershipUnit,
                        隐患类别:res.data[index].hiddendangerCategory,
                        隐患类型:res.data[index].hiddendangerType,
                        隐患级别:res.data[index].hiddendangerLevel,
                        隐患来源:res.data[index].hiddendangerSouce,
                        隐患位置:res.data[index].locationDescription,
                        隐患原因:res.data[index].hiddendangerCause,
                        隐患状态:res.data[index].hiddendangerState,
                        上报时间:date,
                        处置建议:res.data[index].disposalSuggestions,
                        备注:res.data[index].remarks,
                    }))
                })
            }
        });
        return new ol.source.Vector({
            features: features
        });
    },
    //加载隐患数据源（来源）
    getYhSourceBySource : function(source){
        let features = [];
        ajax_Method({
            url: "/aqyh/wTblHiddendangerInformationDetails/queryBySource",
            data: {
                source: source
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].xPoint , res.data[index].yPoint];
                    var date = null;
                    if(res.data[index].findTime!=null){
                        date = new Date(res.data[index].findTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    features.push(new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].xPoint,
                        Y坐标:res.data[index].yPoint,
                        showType:"隐患一张图",
                        id:res.data[index].iD,
                        所在区县:res.data[index].districtCounty,
                        权属单位:res.data[index].ownershipUnit,
                        隐患类别:res.data[index].hiddendangerCategory,
                        隐患类型:res.data[index].hiddendangerType,
                        隐患级别:res.data[index].hiddendangerLevel,
                        隐患来源:res.data[index].hiddendangerSouce,
                        隐患位置:res.data[index].locationDescription,
                        隐患原因:res.data[index].hiddendangerCause,
                        隐患状态:res.data[index].hiddendangerState,
                        上报时间:date,
                        处置建议:res.data[index].disposalSuggestions,
                        备注:res.data[index].remarks,
                    }))
                })
            }
        });
        return new ol.source.Vector({
            features: features
        });
    },
    //获取隐患全部layer(按级别)
    getYhLayerByLevel:function(type){
        let features = [];
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        ajax_Method({
            url: "/aqyh/wTblHiddendangerInformationDetails/queryByTypeLevel",
            data: {
                yhType: type,
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].xPoint , res.data[index].yPoint];
                    var date = null;
                    if(res.data[index].findTime!=null){
                        date = new Date(res.data[index].findTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].xPoint,
                        Y坐标:res.data[index].yPoint,
                        showType:"隐患一张图",
                        id:res.data[index].iD,
                        所在区县:res.data[index].districtCounty,
                        权属单位:res.data[index].ownershipUnit,
                        隐患类别:res.data[index].hiddendangerCategory,
                        隐患类型:res.data[index].hiddendangerType,
                        隐患级别:res.data[index].hiddendangerLevel,
                        隐患来源:res.data[index].hiddendangerSouce,
                        隐患位置:res.data[index].locationDescription,
                        隐患原因:res.data[index].hiddendangerCause,
                        隐患状态:res.data[index].hiddendangerState,
                        上报时间:date,
                        处置建议:res.data[index].disposalSuggestions,
                        备注:res.data[index].remarks,
                    });
                    if(res.data[index].hiddendangerLevel == "一般隐患" ){
                        if(featuresDic.hasOwnProperty("54"))
                            featuresDic["54"].push(feature);
                        else
                            featuresDic["54"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患"){
                        if(featuresDic.hasOwnProperty("55"))
                            featuresDic["55"].push(feature);
                        else
                            featuresDic["55"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患"){
                        if(featuresDic.hasOwnProperty("56")){
                            featuresDic["56"].push(feature);
                        }else{
                            featuresDic["56"] = new Array(feature);
                        }
                    }
                })
                olLargeMapConfig.yhLayers.forEach(function(layer) {
                    if (featuresDic.hasOwnProperty(layer.values_.id)) {
                        switch (layer.values_.id) {
                            case "54":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["54"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "55":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["55"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "55":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["55"]
                                }))
                                load_layers.push(layer);
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    ////获取隐患全部layer(按级别和来源)
    getYhLayerByLevelSource:function(type){
        let features = [];
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        ajax_Method({
            url: "/aqyh/wTblHiddendangerInformationDetails/queryByTypeLevel",
            data: {
                yhType: type,
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].xPoint , res.data[index].yPoint];
                    var date = null;
                    if(res.data[index].findTime!=null){
                        date = new Date(res.data[index].findTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].xPoint,
                        Y坐标:res.data[index].yPoint,
                        showType:"隐患一张图",
                        id:res.data[index].iD,
                        所在区县:res.data[index].districtCounty,
                        权属单位:res.data[index].ownershipUnit,
                        隐患类别:res.data[index].hiddendangerCategory,
                        隐患类型:res.data[index].hiddendangerType,
                        隐患级别:res.data[index].hiddendangerLevel,
                        隐患来源:res.data[index].hiddendangerSouce,
                        隐患位置:res.data[index].locationDescription,
                        隐患原因:res.data[index].hiddendangerCause,
                        隐患状态:res.data[index].hiddendangerState,
                        上报时间:date,
                        处置建议:res.data[index].disposalSuggestions,
                        备注:res.data[index].remarks,
                    });
                    if(res.data[index].hiddendangerLevel == "一般隐患" ){
                        if(res.data[index].hiddendangerSouce == "排查"){
                            if(featuresDic.hasOwnProperty("rq_yb_pc"))
                                featuresDic["rq_yb_pc"].push(feature);
                            else
                                featuresDic["rq_yb_pc"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "巡检"){
                            if(featuresDic.hasOwnProperty("rq_yb_xj"))
                                featuresDic["rq_yb_xj"].push(feature);
                            else
                                featuresDic["rq_yb_xj"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "预警"){
                            if(featuresDic.hasOwnProperty("rq_yb_yj"))
                                featuresDic["rq_yb_yj"].push(feature);
                            else
                                featuresDic["rq_yb_yj"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "上报"){
                            if(featuresDic.hasOwnProperty("rq_yb_sb"))
                                featuresDic["rq_yb_sb"].push(feature);
                            else
                                featuresDic["rq_yb_sb"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "分析"){
                            if(featuresDic.hasOwnProperty("rq_yb_fx"))
                                featuresDic["rq_yb_fx"].push(feature);
                            else
                                featuresDic["rq_yb_fx"] = new Array(feature);
                        }
                    }else if(res.data[index].hiddendangerLevel == "较大隐患"){
                        if(res.data[index].hiddendangerSouce == "排查"){
                            if(featuresDic.hasOwnProperty("rq_jd_pc"))
                                featuresDic["rq_jd_pc"].push(feature);
                            else
                                featuresDic["rq_jd_pc"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "巡检"){
                            if(featuresDic.hasOwnProperty("rq_jd_xj"))
                                featuresDic["rq_jd_xj"].push(feature);
                            else
                                featuresDic["rq_jd_xj"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "预警"){
                            if(featuresDic.hasOwnProperty("rq_jd_yj"))
                                featuresDic["rq_jd_yj"].push(feature);
                            else
                                featuresDic["rq_jd_yj"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "上报"){
                            if(featuresDic.hasOwnProperty("rq_yb_sb"))
                                featuresDic["rq_jd_sb"].push(feature);
                            else
                                featuresDic["rq_jd_sb"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "分析"){
                            if(featuresDic.hasOwnProperty("rq_jd_fx"))
                                featuresDic["rq_jd_fx"].push(feature);
                            else
                                featuresDic["rq_jd_fx"] = new Array(feature);
                        }
                    }else if(res.data[index].hiddendangerLevel == "重大隐患"){
                        if(res.data[index].hiddendangerSouce == "排查"){
                            if(featuresDic.hasOwnProperty("rq_zd_pc"))
                                featuresDic["rq_zd_pc"].push(feature);
                            else
                                featuresDic["rq_zd_pc"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "巡检"){
                            if(featuresDic.hasOwnProperty("rq_zd_xj"))
                                featuresDic["rq_zd_xj"].push(feature);
                            else
                                featuresDic["rq_zd_xj"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "预警"){
                            if(featuresDic.hasOwnProperty("rq_zd_yj"))
                                featuresDic["rq_zd_yj"].push(feature);
                            else
                                featuresDic["rq_zd_yj"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "上报"){
                            if(featuresDic.hasOwnProperty("rq_zd_sb"))
                                featuresDic["rq_zd_sb"].push(feature);
                            else
                                featuresDic["rq_zd_sb"] = new Array(feature);

                        }else if(res.data[index].hiddendangerSouce == "分析"){
                            if(featuresDic.hasOwnProperty("rq_zd_fx"))
                                featuresDic["rq_zd_fx"].push(feature);
                            else
                                featuresDic["rq_zd_fx"] = new Array(feature);
                        }
                    }
                })
                olLargeMapConfig.rq_yhLayerByJbSource.forEach(function(layer) {
                    if (featuresDic.hasOwnProperty(layer.values_.id)) {
                        switch (layer.values_.id) {
                            case "rq_yb_pc":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_pc"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_yb_xj":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_xj"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_yb_yj":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_yj"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_yb_sb":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_sb"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_yb_fx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_fx"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_jd_pc":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_pc"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_jd_xj":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_xj"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_jd_yj":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_yj"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_jd_sb":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_sb"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_jd_fx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_fx"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_zd_pc":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_pc"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_zd_xj":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_xj"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_zd_yj":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_yj"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_zd_sb":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_sb"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rq_zd_fx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_fx"]
                                }))
                                load_layers.push(layer);
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    ////获取隐患全部layer(按级别和来源、处理状态)
    getYhLayerByLevelSourceState:function(type){
        let features = [];
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        ajax_Method({
            url: "/aqyh/wTblHiddendangerInformationDetails/queryByTypeLevel",
            data: {
                yhType: type,
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].xPoint , res.data[index].yPoint];
                    var date = null;
                    if(res.data[index].findTime!=null){
                        date = new Date(res.data[index].findTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].xPoint,
                        Y坐标:res.data[index].yPoint,
                        showType:"隐患一张图",
                        id:res.data[index].iD,
                        所在区县:res.data[index].districtCounty,
                        权属单位:res.data[index].ownershipUnit,
                        隐患类别:res.data[index].hiddendangerCategory,
                        隐患类型:res.data[index].hiddendangerType,
                        隐患级别:res.data[index].hiddendangerLevel,
                        隐患来源:res.data[index].hiddendangerSouce,
                        隐患位置:res.data[index].locationDescription,
                        隐患原因:res.data[index].hiddendangerCause,
                        隐患状态:res.data[index].hiddendangerState,
                        上报时间:date,
                        处置建议:res.data[index].disposalSuggestions,
                        备注:res.data[index].remarks,
                    });
                    if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_pc_dcl"))
                            featuresDic["rq_yb_pc_dcl"].push(feature);
                        else
                            featuresDic["rq_yb_pc_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_yb_pc_clz"))
                            featuresDic["rq_yb_pc_clz"].push(feature);
                        else
                            featuresDic["rq_yb_pc_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_pc_ycl"))
                            featuresDic["rq_yb_pc_ycl"].push(feature);
                        else
                            featuresDic["rq_yb_pc_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_xj_dcl"))
                            featuresDic["rq_yb_xj_dcl"].push(feature);
                        else
                            featuresDic["rq_yb_xj_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_yb_xj_clz"))
                            featuresDic["rq_yb_xj_clz"].push(feature);
                        else
                            featuresDic["rq_yb_xj_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_xj_ycl"))
                            featuresDic["rq_yb_xj_ycl"].push(feature);
                        else
                            featuresDic["rq_yb_xj_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_yj_dcl"))
                            featuresDic["rq_yb_yj_dcl"].push(feature);
                        else
                            featuresDic["rq_yb_yj_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_yb_yj_clz"))
                            featuresDic["rq_yb_yj_clz"].push(feature);
                        else
                            featuresDic["rq_yb_yj_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_yj_ycl"))
                            featuresDic["rq_yb_yj_ycl"].push(feature);
                        else
                            featuresDic["rq_yb_yj_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_sb_dcl"))
                            featuresDic["rq_yb_sb_dcl"].push(feature);
                        else
                            featuresDic["rq_yb_sb_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_yb_sb_clz"))
                            featuresDic["rq_yb_sb_clz"].push(feature);
                        else
                            featuresDic["rq_yb_sb_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_sb_ycl"))
                            featuresDic["rq_yb_sb_ycl"].push(feature);
                        else
                            featuresDic["rq_yb_sb_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_fx_dcl"))
                            featuresDic["rq_yb_fx_dcl"].push(feature);
                        else
                            featuresDic["rq_yb_fx_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_yb_fx_clz"))
                            featuresDic["rq_yb_fx_clz"].push(feature);
                        else
                            featuresDic["rq_yb_fx_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "一般隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_yb_pc_dcl"))
                            featuresDic["rq_yb_fx_ycl"].push(feature);
                        else
                            featuresDic["rq_yb_fx_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_pc_dcl"))
                            featuresDic["rq_jd_pc_dcl"].push(feature);
                        else
                            featuresDic["rq_jd_pc_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_jd_pc_clz"))
                            featuresDic["rq_jd_pc_clz"].push(feature);
                        else
                            featuresDic["rq_jd_pc_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_pc_ycl"))
                            featuresDic["rq_jd_pc_ycl"].push(feature);
                        else
                            featuresDic["rq_jd_pc_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_xj_dcl"))
                            featuresDic["rq_jd_xj_dcl"].push(feature);
                        else
                            featuresDic["rq_jd_xj_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_jd_xj_clz"))
                            featuresDic["rq_jd_xj_clz"].push(feature);
                        else
                            featuresDic["rq_jd_xj_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_xj_ycl"))
                            featuresDic["rq_jd_xj_ycl"].push(feature);
                        else
                            featuresDic["rq_jd_xj_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_yj_dcl"))
                            featuresDic["rq_jd_yj_dcl"].push(feature);
                        else
                            featuresDic["rq_jd_yj_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_jd_yj_clz"))
                            featuresDic["rq_jd_yj_clz"].push(feature);
                        else
                            featuresDic["rq_jd_yj_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_yj_ycl"))
                            featuresDic["rq_jd_yj_ycl"].push(feature);
                        else
                            featuresDic["rq_jd_yj_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_sb_dcl"))
                            featuresDic["rq_jd_sb_dcl"].push(feature);
                        else
                            featuresDic["rq_jd_sb_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_jd_sb_clz"))
                            featuresDic["rq_jd_sb_clz"].push(feature);
                        else
                            featuresDic["rq_jd_sb_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_sb_ycl"))
                            featuresDic["rq_jd_sb_ycl"].push(feature);
                        else
                            featuresDic["rq_jd_sb_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_fx_dcl"))
                            featuresDic["rq_jd_fx_dcl"].push(feature);
                        else
                            featuresDic["rq_jd_fx_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_jd_fx_clz"))
                            featuresDic["rq_jd_fx_clz"].push(feature);
                        else
                            featuresDic["rq_jd_fx_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "较大隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_jd_pc_dcl"))
                            featuresDic["rq_jd_fx_ycl"].push(feature);
                        else
                            featuresDic["rq_jd_fx_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_pc_dcl"))
                            featuresDic["rq_zd_pc_dcl"].push(feature);
                        else
                            featuresDic["rq_zd_pc_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_zd_pc_clz"))
                            featuresDic["rq_zd_pc_clz"].push(feature);
                        else
                            featuresDic["rq_zd_pc_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "排查" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_pc_ycl"))
                            featuresDic["rq_zd_pc_ycl"].push(feature);
                        else
                            featuresDic["rq_zd_pc_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_xj_dcl"))
                            featuresDic["rq_zd_xj_dcl"].push(feature);
                        else
                            featuresDic["rq_zd_xj_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_zd_xj_clz"))
                            featuresDic["rq_zd_xj_clz"].push(feature);
                        else
                            featuresDic["rq_zd_xj_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "巡检" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_xj_ycl"))
                            featuresDic["rq_zd_xj_ycl"].push(feature);
                        else
                            featuresDic["rq_zd_xj_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_yj_dcl"))
                            featuresDic["rq_zd_yj_dcl"].push(feature);
                        else
                            featuresDic["rq_zd_yj_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_zd_yj_clz"))
                            featuresDic["rq_zd_yj_clz"].push(feature);
                        else
                            featuresDic["rq_zd_yj_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "预警" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_yj_ycl"))
                            featuresDic["rq_zd_yj_ycl"].push(feature);
                        else
                            featuresDic["rq_zd_yj_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_sb_dcl"))
                            featuresDic["rq_zd_sb_dcl"].push(feature);
                        else
                            featuresDic["rq_zd_sb_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_zd_sb_clz"))
                            featuresDic["rq_zd_sb_clz"].push(feature);
                        else
                            featuresDic["rq_zd_sb_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "上报" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_sb_ycl"))
                            featuresDic["rq_zd_sb_ycl"].push(feature);
                        else
                            featuresDic["rq_zd_sb_ycl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "未处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_fx_dcl"))
                            featuresDic["rq_zd_fx_dcl"].push(feature);
                        else
                            featuresDic["rq_zd_fx_dcl"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "处理中" ){
                        if(featuresDic.hasOwnProperty("rq_zd_fx_clz"))
                            featuresDic["rq_zd_fx_clz"].push(feature);
                        else
                            featuresDic["rq_zd_fx_clz"] = new Array(feature);
                    }else if(res.data[index].hiddendangerLevel == "重大隐患" && res.data[index].hiddendangerSouce == "分析" && res.data[index].hiddendangerState == "已处理" ){
                        if(featuresDic.hasOwnProperty("rq_zd_pc_dcl"))
                            featuresDic["rq_zd_fx_ycl"].push(feature);
                        else
                            featuresDic["rq_zd_fx_ycl"] = new Array(feature);
                    }
                })
                olLargeMapConfig.rq_yhLayerByJbSourceState.forEach(function(layer) {
                    if (featuresDic.hasOwnProperty(layer.values_.id)) {
                        switch (layer.values_.id) {
                            case "rq_yb_pc_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_pc_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_xj_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_xj_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_yj_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_yj_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_sb_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_sb_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_fx_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_fx_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_pc_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_pc_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_xj_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_xj_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_yj_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_yj_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_sb_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_sb_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_fx_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_fx_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_pc_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_pc_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_xj_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_xj_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_yj_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_yj_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_sb_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_sb_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_fx_dcl":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_fx_dcl"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_pc_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_pc_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_xj_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_xj_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_yj_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_yj_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_sb_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_sb_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_yb_fx_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_yb_fx_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_pc_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_pc_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_xj_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_xj_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_yj_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_yj_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_sb_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_sb_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_jd_fx_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_jd_fx_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_pc_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_pc_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_xj_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_xj_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_yj_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_yj_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_sb_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_sb_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            case "rq_zd_fx_clz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_zd_fx_clz"]
                                }))
                                load_layers.push(layer);
                                //LoadLargeMap.flashYhLayer(layer,true);
                                break;
                            /*                            case "rq_yb_pc_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_yb_pc_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_yb_xj_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_yb_xj_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_yb_yj_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_yb_yj_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_yb_sb_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_yb_sb_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_yb_fx_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_yb_fx_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_jd_pc_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_jd_pc_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_jd_xj_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_jd_xj_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_jd_yj_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_jd_yj_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_jd_sb_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_jd_sb_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_jd_fx_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_jd_fx_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_zd_pc_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_zd_pc_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_zd_xj_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_zd_xj_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_zd_yj_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_zd_yj_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_zd_sb_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_zd_sb_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;
                                                        case "rq_zd_fx_ycl":
                                                            layer.setSource(new ol.source.Vector({
                                                                features: featuresDic["rq_zd_fx_ycl"]
                                                            }))
                                                            load_layers.push(layer);
                                                            break;*/
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    //获取隐患全部layer(按来源)
    getYhLayerBySource:function(type){
        let features = [];
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        ajax_Method({
            url: "/aqyh/wTblHiddendangerInformationDetails/queryByTypeLevel",
            data: {
                yhType: type,
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].xPoint , res.data[index].yPoint];
                    var date = null;
                    if(res.data[index].findTime!=null){
                        date = new Date(res.data[index].findTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].xPoint,
                        Y坐标:res.data[index].yPoint,
                        showType:"隐患一张图",
                        id:res.data[index].id,
                        所在区县:res.data[index].districtCounty,
                        权属单位:res.data[index].ownershipUnit,
                        隐患类别:res.data[index].hiddendangerCategory,
                        隐患类型:res.data[index].hiddendangerType,
                        隐患级别:res.data[index].hiddendangerLevel,
                        隐患来源:res.data[index].hiddendangerSouce,
                        隐患位置:res.data[index].locationDescription,
                        隐患原因:res.data[index].hiddendangerCause,
                        隐患状态:res.data[index].hiddendangerState,
                        上报时间:date,
                        处置建议:res.data[index].disposalSuggestions,
                        备注:res.data[index].remarks,
                    });
                    if(res.data[index].hiddendangerSouce == "分析" ){
                        if(featuresDic.hasOwnProperty("11"))
                            featuresDic["11"].push(feature);
                        else
                            featuresDic["11"] = new Array(feature);
                    }else if(res.data[index].hiddendangerSouce == "排查"){
                        if(featuresDic.hasOwnProperty("12"))
                            featuresDic["12"].push(feature);
                        else
                            featuresDic["12"] = new Array(feature);
                    }else if(res.data[index].hiddendangerSouce == "巡检"){
                        if(featuresDic.hasOwnProperty("13")){
                            featuresDic["13"].push(feature);
                        }else{
                            featuresDic["13"] = new Array(feature);
                        }
                    }
                    else if(res.data[index].hiddendangerSouce == "举报"){
                        if(featuresDic.hasOwnProperty("14")){
                            featuresDic["14"].push(feature);
                        }else{
                            featuresDic["14"] = new Array(feature);
                        }
                    }else if(res.data[index].hiddendangerSouce == "预警"){
                        if(featuresDic.hasOwnProperty("15")){
                            featuresDic["15"].push(feature);
                        }else{
                            featuresDic["15"] = new Array(feature);
                        }
                    }else if(res.data[index].hiddendangerSouce == "应急"){
                        if(featuresDic.hasOwnProperty("16")){
                            featuresDic["16"].push(feature);
                        }else{
                            featuresDic["16"] = new Array(feature);
                        }
                    }else if(res.data[index].hiddendangerSouce == "上报"){
                        if(featuresDic.hasOwnProperty("17")){
                            featuresDic["17"].push(feature);
                        }else{
                            featuresDic["17"] = new Array(feature);
                        }
                    }
                })
                olLargeMapConfig.yhBySourceLayers.forEach(function(layer) {
                    if (featuresDic.hasOwnProperty(layer.values_.id)) {
                        switch (layer.values_.id) {
                            case "11":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["11"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "12":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["12"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "13":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["13"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "14":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["14"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "15":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["15"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "16":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["16"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "17":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["17"]
                                }))
                                load_layers.push(layer);
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    //报警feature
    getYjSource:function(yjType,yjLevel){
        let features = [];
        ajax_Method({
            url: "/aqyj/wTblAlarmInfo/getAlarmBy",
            data: {
                linetype: yjType,
                info: yjLevel,
                alarmStatus:"未处理"
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    var date = null;
                    if(res.data[index].recieveTime!=null){
                        date = new Date(res.data[index].recieveTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    let coordinates=[res.data[index].lng , res.data[index].lat];
                    features.push(new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        id:res.data[index].iD,
                        showType:"预警态势",
                        所属单位:res.data[index].alarmUnit,
                        预警等级:res.data[index].alarmClass,
                        预警时间:date,
                        业务领域:res.data[index].linetype,
                        预警站点:res.data[index].station,
                        预警类型:res.data[index].info,
                        预警值:res.data[index].alarmValue,
                        预警阈值:res.data[index].limitValue,
                        处置状态:res.data[index].alarmStatus
                    }))
                })
            }
        });
        return new ol.source.Vector({
            features: features
        });
    },
    //获取报警全部layer
    getYjLayer:function(){
        let features = [];
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        const gifUrl1 = '/images/柳林路站点/一级报警.gif';
        const gifUrl2 = '/images/柳林路站点/三级报警.gif';
        ajax_Method({
            url: "/aqyj/wTblAlarmInfo/getAlarmBy",
            data: {"linetype":"燃气","alarmStatus":"未处理"},
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    var date = null;
                    if(res.data[index].recieveTime!=null){
                        date = new Date(res.data[index].recieveTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    let coordinates=[res.data[index].lng , res.data[index].lat];
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        id:res.data[index].iD,
                        showType:"预警态势",
                        所属单位:res.data[index].alarmUnit,
                        预警等级:res.data[index].alarmClass,
                        预警时间:date,
                        业务领域:res.data[index].linetype,
                        预警站点:res.data[index].station,
                        预警类型:res.data[index].info,
                        预警值:res.data[index].alarmValue,
                        预警阈值:res.data[index].limitValue,
                        处置状态:res.data[index].alarmStatus
                    })
                    if(res.data[index].info == "超高限报警"){
                        /*                      // 使用Gifler将链接转化为gif图片
                                              const gif1 = new gifler(gifUrl1);
                                              // gif图片按刷新
                                              gif1.frames(
                                                  document.createElement('canvas'),
                                                  function (ctx, frame) {
                                                      if (!feature.getStyle()) {
                                                          feature.setStyle(
                                                              new ol.style.Style({
                                                                  image: new ol.style.Icon({
                                                                      img: ctx.canvas,
                                                                      imgSize: [frame.width, frame.height],
                                                                      opacity: 0.8,
                                                                      scale:0.3
                                                                  }),
                                                              })
                                                          );
                                                      }
                                                      ctx.clearRect(0, 0, frame.width, frame.height);
                                                      ctx.drawImage(frame.buffer, frame.x, frame.y);
                                                     // map.render();
                                                  },
                                                  true
                                              );*/
                        if(featuresDic.hasOwnProperty("rq_cgx"))
                            featuresDic["rq_cgx"].push(feature);
                        else
                            featuresDic["rq_cgx"] = new Array(feature);
                    }else if( res.data[index].info == "高限报警"){
                        if(featuresDic.hasOwnProperty("rq_gx"))
                            featuresDic["rq_gx"].push(feature);
                        else
                            featuresDic["rq_gx"] = new Array(feature);
                    }else if( res.data[index].info == "低限报警"){
                        if(featuresDic.hasOwnProperty("rq_dx")){
                            featuresDic["rq_dx"].push(feature);
                        }else{
                            featuresDic["rq_dx"] = new Array(feature);
                        }
                    }else if(res.data[index].info == "超低限报警"){
                        if(featuresDic.hasOwnProperty("rq_cdx"))
                            featuresDic["rq_cdx"].push(feature);
                        else
                            featuresDic["rq_cdx"] = new Array(feature);
                    }
                })
                olLargeMapConfig.yjtsLayers.forEach(function(layer) {
                    if(featuresDic.hasOwnProperty(layer.values_.id)){
                        switch (layer.values_.id) {
                            case "rq_cgx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_cgx"]
                                }))
                                load_layers.push(layer);
                                LoadLargeMap.flashYjLayer(layer,true);
                                break;
                            case "rq_gx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_gx"]
                                }))
                                load_layers.push(layer);
                                LoadLargeMap.flashYjLayer(layer,true);
                                break;
                            case "rq_dx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_dx"]
                                }))
                                load_layers.push(layer);
                                LoadLargeMap.flashYjLayer(layer,true);
                                break;
                            case "rq_cdx":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rq_cdx"]
                                }))
                                load_layers.push(layer);
                                LoadLargeMap.flashYjLayer(layer,true);
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    //未处理报警
    getWclyjSource:function(){
        let features = [];
        ajax_Method({
            url: "/aqyj/wTblAlarmInfo/getAlarmBy",
            data: {
                alarmStatus: "未处理",
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    var date = null;
                    if(res.data[index].recieveTime!=null){
                        date = new Date(res.data[index].recieveTime);
                        date = date.format("yyyy-MM-dd hh:mm:ss");
                    }
                    let coordinates=[res.data[index].lng , res.data[index].lat];
                    features.push(new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        id:res.data[index].iD,
                        showType:"预警态势",
                        所属单位:res.data[index].alarmUnit,
                        预警等级:res.data[index].alarmClass,
                        预警时间:date,
                        业务领域:res.data[index].linetype,
                        预警站点:res.data[index].station,
                        预警类型:res.data[index].info,
                        预警值:res.data[index].alarmValue,
                        预警阈值:res.data[index].limitValue,
                        处置状态:res.data[index].alarmStatus
                    }))
                })
            }
        });
        return new ol.source.Vector({
            features: features
        });
    },
    //监测feature
    getJcSource:function(jcType){
        let features = [];
        ajax_Method({
            url: "/ssjc/wTblStation/getParamByStation",
            data: {
                stationTypeName: jcType
            },
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    var points =[];
                    $.each(res.data[0].points, (index1, item1) => {
                        if(item1!=null){
                            points.push([item1.name,item1.id,item1.unit]);
                        }
                    });
                    let coordinates=[res.data[index].lng , res.data[index].lat];
                    features.push(new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        id:res.data[index].iD,
                        showType:"运行趋势",
                        code:res.data[index].code,
                        所属领域:jcType,
                        站点名称:res.data[index].name,
                        所属区域:res.data[index].area,
                        详细地址:res.data[index].address,
                        站点类型:res.data[index].stationTypeName,
                        监测指标:points
                    }))
                })
            }
        });
        return new ol.source.Vector({
            features: features
        });
    },
    //加载巡检管理数据源()
    getXjSource : function(){
        let features= [];
        ajax_Method({
            url: "/json/wTblXjData.json",
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].lon , res.data[index].lat];
                    res.data[index].kssj;
                    features.push(new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:res.data[index].lon,
                        Y坐标:res.data[index].lat,
                        showType:"巡检管理",
                        id:res.data[index].id,
                        任务名称:res.data[index].name,
                        所属领域:res.data[index].type,
                        隐患来源:res.data[index].yhly,
                        巡检人员:res.data[index].xjry,
                        任务描述:res.data[index].rwms,
                        处理状态:res.data[index].clzt,
                        开始时间:res.data[index].kssj,
                        结束时间:res.data[index].jssj,
                    }))
                })
            }
        });
        return new ol.source.Vector({
            features: features
        });
    },
    //加载巡检管理图层
    getXjLayer : function(){
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        ajax_Method({
            url: "/aqyh/wTblXjry/getXjry",
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[item.ssgjs[0].lng , item.ssgjs[0].lat];
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        X坐标:item.ssgjs[0].lng,
                        Y坐标:item.ssgjs[0].lat,
                        showType:"巡检管理",
                        id:res.data[index].iD,
                        巡检人员:res.data[index].name,
                        所属企业:res.data[index].szdw,
                        联系电话:res.data[index].telephone,
                        巡检里程:item.ssgjs[0].xjlc,
                        在线时长:item.ssgjs[0].zxsc
                    })
                    if(res.data[index].szdw == "昆仑燃气"){
                        if(featuresDic.hasOwnProperty("xjgl1"))
                            featuresDic["xjgl1"].push(feature);
                        else
                            featuresDic["xjgl1"] = new Array(feature);
                    }else if( res.data[index].szdw == "中燃燃气"){
                        if(featuresDic.hasOwnProperty("xjgl2"))
                            featuresDic["xjgl2"].push(feature);
                        else
                            featuresDic["xjgl2"] = new Array(feature);
                    }
                })
                olLargeMapConfig.xj_layers.forEach(function(layer) {
                    if(featuresDic.hasOwnProperty(layer.values_.id)){
                        switch (layer.values_.id) {
                            case "xjgl1":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["xjgl1"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "xjgl2":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["xjgl2"]
                                }))
                                load_layers.push(layer);
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    //加载巡检管理图层通过api
    getXjLayerByZr : function(data){
        let featuresZr=new Array();
        let feature;
        let xjLayer;
        let loadLayers=[];
        LoadLargeMap.loadXjLayers = [];
        $.each(data.data, (index, item) => {
            let coordinates = [item.lon, item.lat];
            feature = new ol.Feature({
                geometry: new ol.geom.Point(coordinates),
                X坐标: item.lon,
                Y坐标: item.lat,
                showType: "巡检管理",
                id: item.gid,
                姓名:item.truename,
                手机号码:item.phone,
                所属企业:"中燃",
                所属部门:item.groupname,
                状态:item.lon == ""?"离线":"在线",
                开始时间:'',
                结束时间:'',
                今日里程:'',
                有效里程:'',
                有效覆盖里程:'',
                在线时长:'',
                有效时长:''
                /*                开始时间:item.startTime,
                                结束时间:item.endTime,
                                今日里程:item.mileage==""?"0":item.mileage + "米",
                                有效里程:item.effectiveMileage==""?"0":item.effectiveMileage+ "米",
                                有效覆盖里程:item.effectiveCoverMileage==""?"0":item.effectiveCoverMileage + "米",
                                在线时长:item.onLineDuration==""?"0":item.onLineDuration+ "小时",
                                有效时长:item.effectiveDuration==""?"0":item.effectiveDuration + "小时"*/
            })
            //feature.setStyle(olLargeMapStyle.xjgl1_Style);
            xjLayer = new ol.layer.Vector({
                id:item.gid,
                type:"xjgl",
                name:"巡检管理",
                style:olLargeMapStyle.xjgl1_Style,
                source: new ol.source.Vector({
                    features: [feature]
                }),
            });
            loadLayers.push(xjLayer);
            //featuresZr.push(feature);
        })
        /*        let xjryLayer=olLargeMapConfig.xj_layers[0];
                xjryLayer.setSource(new ol.source.Vector({
                    features: featuresZr
                }));*/
        LoadLargeMap.loadXjLayers = loadLayers;
        return loadLayers;
    },
    //加载巡检管理图层通过数据库
    getDataXjLayerByZr : function(data){
        let featuresZr=new Array();
        let feature;
        let xjLayer;
        let loadLayers=[];
        LoadLargeMap.loadXjLayers = [];
        $.each(data.data, (index, item) => {
            let coordinates = [item.lon, item.lat];
            feature = new ol.Feature({
                geometry: new ol.geom.Point(coordinates),
                X坐标: item.lon,
                Y坐标: item.lat,
                showType: "巡检管理",
                id: item.gid,
                姓名:item.truename,
                手机号码:item.phone,
                所属企业:"中燃",
                所属部门:item.groupname,
                状态:item.lon == ""?"离线":"在线",
                /*                今日里程:item.wTblHiddendangerHistoricalList[0].mileage + "米",
                                有效里程:item.wTblHiddendangerHistoricalList[0].effectiveMileage+ "米",
                                有效覆盖里程:item.wTblHiddendangerHistoricalList[0].effectiveCoverMileage + "米",*/
                今日里程:  item.wTblHiddendangerHistoricalList[0].mileage=="0"?"0公里":(parseFloat(item.wTblHiddendangerHistoricalList[0].mileage)/1000).toFixed(5) + "公里",
                有效里程:item.wTblHiddendangerHistoricalList[0].effectiveMileage=="0"?"0公里":(parseFloat(item.wTblHiddendangerHistoricalList[0].effectiveMileage)/1000).toFixed(5)+ "公里",
                有效覆盖里程:item.wTblHiddendangerHistoricalList[0].effectiveCoverMileage=="0"?"0公里":(parseFloat(item.wTblHiddendangerHistoricalList[0].effectiveCoverMileage)/1000).toFixed(5) + "公里",
                在线时长:item.wTblHiddendangerHistoricalList[0].onLineDuration+ "小时",
                有效时长:item.wTblHiddendangerHistoricalList[0].effectiveDuration  + "小时",
                在线时长:item.wTblHiddendangerHistoricalList[0].onLineDuration+ "小时",
                有效时长:item.wTblHiddendangerHistoricalList[0].effectiveDuration  + "小时"
            })
            //feature.setStyle(olLargeMapStyle.xjgl1_Style);
            xjLayer = new ol.layer.Vector({
                id:item.gid,
                type:"xjgl",
                name:"巡检管理",
                style:olLargeMapStyle.xjgl1_Style,
                source: new ol.source.Vector({
                    features: [feature]
                }),
            });
            loadLayers.push(xjLayer);
            //featuresZr.push(feature);
        })
        /*        let xjryLayer=olLargeMapConfig.xj_layers[0];
                xjryLayer.setSource(new ol.source.Vector({
                    features: featuresZr
                }));*/
        LoadLargeMap.loadXjLayers = loadLayers;
        return loadLayers;
    },

    //绘制巡检轨迹
    xjrygjLayerList:[],
    xjrygjLayer : new ol.layer.Vector({
        source: new ol.source.Vector(),
    }),
    //绘制巡检轨迹读取数据库数据
    drawXjgj:function (xjryId,startTime,endTime) {
        LoadLargeMap.map.removeLayer(LoadLargeMap.xjrygjLayer);
        LoadLargeMap.xjrygjLayer=new ol.layer.Vector({
            source: new ol.source.Vector(),
        });
        var pointList = [];
        var pointCoord;
        $.ajax({
            url: "/aqyh/wTblXjry/getXjrygj",
            type: "post",
            data: {xjryId: xjryId, startTime: startTime, endTime:endTime},
            dataType: 'json',
            async: false,
            success: function (res) {
                for (var i = 0; i < res.data[0].ssgjs.length; i++) {
                    pointCoord = [parseFloat(res.data[0].ssgjs[i].lng), parseFloat(res.data[0].ssgjs[i].lat)];
                    pointList.push(pointCoord);
                }

                LoadLargeMap.map.addLayer(LoadLargeMap.xjrygjLayer);
                var lineString = new ol.geom.LineString(pointList);
                var line = new ol.Feature({
                    geometry: lineString,
                });
                var style;
                if(res.data[0].szdw=="中燃燃气"){
                    style = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "#0000CD",
                            width: 4,
                        }),
                    });
                }else if(res.data[0].szdw=="昆仑燃气"){
                    style = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "#00ffff",
                            width: 4,
                        }),
                    });
                }
                line.setStyle(style);
                LoadLargeMap.xjrygjLayer.getSource().addFeature(line);
            }
        })

    },
    //绘制巡检轨迹读取api接口数据
    drawXjgjByZr:function (xjryId,startTime,endTime) {
        LoadLargeMap.xjrygjLayerList.forEach(function (layer) {
            LoadLargeMap.map.removeLayer(layer);
        });
        LoadLargeMap.closeFeatureInfo();
        LoadLargeMap.xjrygjLayerList = [];
        var tempLayer;
        var pointList = [];
        var pointCoord;
        //查询api提供的接口
        $.ajax({
            url: "/Xjgl/zr/getXjrygj",
            type: "post",
            data: {userIds: xjryId, startTime: startTime, endTime:endTime},
            dataType: 'json',
            async: false,
            success: function (res) {
                if(res == null || res[0].points==null ||res[0].points.length==0){
                    layer.alert("无巡检路径！");
                    return;
                }
                $.each(res[0].points, (index, item) => {
                    /*                    var r1 = Math.random()*255;
                                        var g1 = Math.random()*255;
                                        var b1 = Math.random()*255;*/
                    tempLayer=new ol.layer.Vector({
                        id:xjryId+"xjgj",
                        source: new ol.source.Vector(),
                        style : new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#79CB4F',//"rgba("+r1+", "+g1+", "+b1+")",
                                width: 4,
                            }),
                        })
                    });
                    for (var i = 0; i < item.length; i++) {
                        pointCoord = [parseFloat(item[i].lon), parseFloat(item[i].lat)];
                        pointList.push(pointCoord);
                    }
                    var lineString = new ol.geom.LineString(pointList);
                    var line = new ol.Feature({
                        geometry: lineString,
                    });
                    tempLayer.getSource().addFeature(line);
                    LoadLargeMap.xjrygjLayerList.push(tempLayer)
                    LoadLargeMap.map.addLayer(tempLayer);
                    LoadLargeMap.flashSbyztLayer(tempLayer);
                });

            }
        })
        //读取本地数据库当前轨迹
        /*$.ajax({
            url: "/aqyh/wTblHiddendangerHistoricalLocation/queryCurdateLocation",
            type: "post",
            data: {userid: xjryId},
            dataType: 'json',
            async: false,
            success: function (res) {
                if(res == null ||res.data.length==0 || res.data[0].wTblHiddendangerHistoricalLocationList.length==0){
                    layer.alert("无巡检路径！");
                    return;
                }
                $.each(res.data[0].wTblHiddendangerHistoricalLocationList, (index, item) => {
                    pointCoord = [parseFloat(item.lon), parseFloat(item.lat)];
                    pointList.push(pointCoord);

                });
                tempLayer=new ol.layer.Vector({
                    id:xjryId+"xjgj",
                    source: new ol.source.Vector(),
                    style : new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#0000ff',
                            width: 4,
                        }),
                    })
                });
                var lineString = new ol.geom.LineString(pointList);
                var line = new ol.Feature({
                    geometry: lineString,
                });
                tempLayer.getSource().addFeature(line);
                LoadLargeMap.xjrygjLayerList.push(tempLayer)
                LoadLargeMap.map.addLayer(tempLayer);

            }
        })*/
    },
    //加载智能选点数据源
    getZnxdSource:function (name){
        let features= [];
        switch (name) {
            //人口密集
            case "rkjz_qy":
                features=znxdData.check_one;
                break;
            case "rkjz":
                features=znxdData.check_one1;
                break;
            //产业集聚
            case "cyjj_qy":
                features=znxdData.check_two;
                break;
            case "cyjj":
                features=znxdData.check_two1;
                break;
            //设施老旧
            case "sslj_qy":
                features=znxdData.check_three;
                break;
            case "sslj":
                features=znxdData.check_three1;
                break;
            //隐患风险高
            case "yhfx_qy":
                features=znxdData.check_four;
                break;
            case "yhfx":
                features=znxdData.check_four1;
                break;
            //高预警区域
            case "gyj_qy":
                features=znxdData.check_five;
                break;
            case "gyj":
                features=znxdData.check_five1;
                break;
            //高压/次高压管线
            case "gy_qy":
                features=znxdData.check_six;
                break;
            case "gy":
                features=znxdData.check_six1;
                break;
            //燃气场站
            case "rqcz_qy":
                features=znxdData.check_seven;
                break;
            case "rqcz":
                features=znxdData.check_seven1;
                break;
            //用气餐饮场所
            case "yqcy_qy":
                features=znxdData.check_eight;
                break;
            case "yqcy":
                features=znxdData.check_eight1;
                break;
            //风险区域/管段
            case "fx_qy":
                features=znxdData.check_nine;
                break;
            case "fx":
                features=znxdData.check_nine1;
                break;
            //相邻地下空间
            case "xldxkj_qy":
                features=znxdData.check_ten;
                break;
            case "xldxkj":
                features=znxdData.check_ten1;
                break;
            default:
                break;
        }
        return new ol.source.Vector({
            features: features
        });
    },
    //加载场站数据源（模拟）
    getCzqySource:function (name){
        let features= [];
        switch (name) {
            //门站
            case "csmz":
                features=czquData.check_one;
                break;
            //储气站
            case "rqccz":
                features=czquData.check_two;
                break;
            //加气站
            case "rqjqz":
                features=czquData.check_three;
                break;
            //调压站
            case "qytyz":
                features=czquData.check_four;
                break;
            default:
                break;
        }
        return new ol.source.Vector({
            features: features
        });
    },
    //加载场站数据
    getCzLayer:function () {
        let features = [];
        let featuresDic=new Array();
        let feature;
        let load_layers=[];
        ajax_Method({
            url: "/ssjc/wTblFacility/getList",
            successCallback(res) {
                $.each(res.data, (index, item) => {
                    let coordinates=[res.data[index].lng , res.data[index].lat];
                    feature = new ol.Feature({
                        geometry:new ol.geom.Point(coordinates),
                        id:res.data[index].iD,
                        showType:"场站监测",
                        场站名称:res.data[index].name,
                        场站类型:res.data[index].czType,
                        场站位置:res.data[index].location,
                        供气能力:res.data[index].gasSupply,
                        供气类型:res.data[index].gasType,
                        所属单位:res.data[index].unit,
                    })
                    if(res.data[index].czType == "门站"){
                        if(featuresDic.hasOwnProperty("csmz"))
                            featuresDic["csmz"].push(feature);
                        else
                            featuresDic["csmz"] = new Array(feature);
                    }else if( res.data[index].czType == "储气站"){
                        if(featuresDic.hasOwnProperty("rqccz"))
                            featuresDic["rqccz"].push(feature);
                        else
                            featuresDic["rqccz"] = new Array(feature);
                    }else if( res.data[index].czType == "调压站"){
                        if(featuresDic.hasOwnProperty("qytyz")){
                            featuresDic["qytyz"].push(feature);
                        }else{
                            featuresDic["qytyz"] = new Array(feature);
                        }
                    }else if(res.data[index].czType == "加气站"){
                        if(featuresDic.hasOwnProperty("rqjqz"))
                            featuresDic["rqjqz"].push(feature);
                        else
                            featuresDic["rqjqz"] = new Array(feature);
                    }
                })
                olLargeMapConfig.czssLayers.forEach(function(layer) {
                    if(featuresDic.hasOwnProperty(layer.values_.id)){
                        switch (layer.values_.id) {
                            case "csmz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["csmz"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rqccz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rqccz"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "qytyz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["qytyz"]
                                }))
                                load_layers.push(layer);
                                break;
                            case "rqjqz":
                                layer.setSource(new ol.source.Vector({
                                    features: featuresDic["rqjqz"]
                                }))
                                load_layers.push(layer);
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });
        return load_layers;
    },
    //动态加载样式
    getVectorStyle:function (type,scale){
        var style;
        switch (type) {
            case "一般隐患":
                style =new ol.style.Style({
                    //形状
                    image: new ol.style.Icon({
                        src:'/systemStatic/style/img/yhImage/ybyh.png',
                        scale:scale
                    })
                });
                break;
            case "较大隐患":
                style =new ol.style.Style({
                    //形状
                    image: new ol.style.Icon({
                        src:'/systemStatic/style/img/yhImage/jdyh.png',
                        scale:scale
                    })
                });
                break;
            case "重大隐患":
                style = new ol.style.Style({
                    //形状
                    image: new ol.style.Icon({
                        src:'/systemStatic/style/img/yhImage/zdyh.png',
                        scale:scale
                    })
                });
                break;
            case "巡检管理":
                style = new ol.style.Style({
                    //形状
                    image: new ol.style.Icon({
                        src:'/systemStatic/style/img/yhImage/xjry.png',
                        scale:scale
                    })
                });
                break;
                defalt:
                    break;
        }
        return style;
    },
    //监听地图缩放级别
    moveendListen:function (pidType){
        var scale,yhScale,bjScale,jcScale,czScale,xjScale,znxdScale;
        //LoadLargeMap.map.on("moveend",function(e){
        LoadLargeMap.map.getView().on('change:resolution',function(e){
            var zoom = LoadLargeMap.map.getView().getZoom();
            if(zoom >= 18){
                yhScale=1.2;
                bjScale=1.7;
                jcScale=0.5;
                czScale=0.5;
                xjScale=0.95;
                znxdScale=1.1;
                scale =1.6;
            }else if(zoom < 18 && zoom >= 17){
                yhScale=1.1;
                bjScale=1.6;
                jcScale=0.48;
                czScale=0.48;
                xjScale=0.9;
                znxdScale=1;
                scale=1.5;
            }else if(zoom < 17 && zoom >= 16){
                yhScale=1;
                bjScale=1.5;
                jcScale=0.47;
                czScale=0.47;
                xjScale=0.85;
                znxdScale=0.9;
                scale=1.4;
            }else if(zoom < 16 && zoom >= 15){
                yhScale=0.9;
                bjScale=1.4;
                jcScale=0.45;
                czScale=0.45;
                xjScale=0.8;
                znxdScale=0.8;
                scale=1.3;
            }else if( zoom < 15 && zoom >= 14){
                yhScale=0.8;
                bjScale=1.35;
                jcScale=0.4;
                czScale=0.4;
                xjScale=0.75;
                znxdScale=0.7;
                scale=1.2;
            }else if(zoom < 14 && zoom >= 13){
                yhScale=0.7;
                bjScale=1.3;
                jcScale=0.35;
                czScale=0.35;
                xjScale=0.7;
                znxdScale=0.6;
                scale=1.1;
            }else if(zoom < 13 && zoom >= 12){
                yhScale=0.6;
                bjScale=1.2;
                jcScale=0.3;
                czScale=0.3;
                xjScale=0.65;
                znxdScale=0.5;
                scale=1;
            }else if(zoom < 12 && zoom >= 11){
                yhScale=0.5;
                bjScale=1;
                jcScale=0.25;
                czScale=0.25;
                xjScale=0.6;
                znxdScale=0.4;
                scale=0.9;
            }else if(zoom < 11 && zoom >= 10){
                yhScale=0.4;
                bjScale=0.8;
                jcScale=0.2;
                czScale=0.2;
                xjScale=0.55;
                znxdScale=0.3;
                scale=0.7;
            }else if( zoom < 10){
                yhScale=0.3;
                bjScale=0.6;
                jcScale=0.15;
                czScale=0.15;
                xjScale=0.5;
                znxdScale=0.2;
                scale=0.5;
            }

            switch (pidType) {
                //隐患卡
                case "隐患态势":
                /*                    LoadLargeMap.map.getLayerById("rq_yb").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("gs_yb").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("ps_yb").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("rl_yb").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("rq_jd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("gs_jd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("ps_jd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("rl_jd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("rq_zd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("gs_zd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("ps_zd").getStyle().getImage().setScale(scale);
                                    LoadLargeMap.map.getLayerById("rl_zd").getStyle().getImage().setScale(scale);
                                    break;*/
                case "隐患一张图":
                    if(LoadLargeMap.map.getLayerById("rq_yb_pc_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_pc_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_xj_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_xj_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_yj_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_yj_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_sb_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_sb_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_fx_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_fx_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_pc_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_pc_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_xj_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_xj_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_yj_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_yj_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_sb_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_sb_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_fx_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_fx_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_pc_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_pc_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_xj_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_xj_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_yj_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_yj_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_sb_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_sb_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_fx_dcl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_fx_dcl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_pc_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_pc_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_xj_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_xj_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_yj_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_yj_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_sb_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_sb_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_fx_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_fx_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_pc_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_pc_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_xj_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_xj_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_yj_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_yj_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_sb_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_sb_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_fx_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_fx_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_pc_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_pc_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_xj_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_xj_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_yj_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_yj_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_sb_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_sb_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_fx_clz")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_fx_clz").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_pc_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_pc_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_xj_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_xj_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_yj_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_yj_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_sb_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_sb_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_yb_fx_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_yb_fx_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_pc_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_pc_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_xj_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_xj_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_yj_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_yj_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_sb_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_sb_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_jd_fx_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_jd_fx_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_pc_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_pc_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_xj_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_xj_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_yj_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_yj_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_sb_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_sb_ycl").getStyle().getImage().setScale(yhScale);
                    if(LoadLargeMap.map.getLayerById("rq_zd_fx_ycl")!=null)
                        LoadLargeMap.map.getLayerById("rq_zd_fx_ycl").getStyle().getImage().setScale(yhScale);
                    break;
                /*if(LoadLargeMap.map.getLayerById("rq_yb_pc")!=null)
                    LoadLargeMap.map.getLayerById("rq_yb_pc").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_yb_xj")!=null)
                    LoadLargeMap.map.getLayerById("rq_yb_xj").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_yb_yj")!=null)
                    LoadLargeMap.map.getLayerById("rq_yb_yj").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_yb_sb")!=null)
                    LoadLargeMap.map.getLayerById("rq_yb_sb").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_yb_fx")!=null)
                    LoadLargeMap.map.getLayerById("rq_yb_fx").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_jd_pc")!=null)
                    LoadLargeMap.map.getLayerById("rq_jd_pc").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_jd_xj")!=null)
                    LoadLargeMap.map.getLayerById("rq_jd_xj").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_jd_yj")!=null)
                    LoadLargeMap.map.getLayerById("rq_jd_yj").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_jd_sb")!=null)
                    LoadLargeMap.map.getLayerById("rq_jd_sb").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_jd_fx")!=null)
                    LoadLargeMap.map.getLayerById("rq_jd_fx").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_zd_pc")!=null)
                    LoadLargeMap.map.getLayerById("rq_zd_pc").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_zd_xj")!=null)
                    LoadLargeMap.map.getLayerById("rq_zd_xj").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_zd_yj")!=null)
                    LoadLargeMap.map.getLayerById("rq_zd_yj").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_zd_sb")!=null)
                    LoadLargeMap.map.getLayerById("rq_zd_sb").getStyle().getImage().setScale(scale);
                if(LoadLargeMap.map.getLayerById("rq_zd_fx")!=null)
                    LoadLargeMap.map.getLayerById("rq_zd_fx").getStyle().getImage().setScale(scale);
                break;*/
                /*                   if(LoadLargeMap.map.getLayerById("54")!=null)
                                       LoadLargeMap.map.getLayerById("54").getStyle().getImage().setScale(yhScale);
                                   if(LoadLargeMap.map.getLayerById("55")!=null)
                                       LoadLargeMap.map.getLayerById("55").getStyle().getImage().setScale(yhScale);
                                   if(LoadLargeMap.map.getLayerById("56")!=null)
                                       LoadLargeMap.map.getLayerById("56").getStyle().getImage().setScale(yhScale);
                                   break;*/
                case "巡检管理":
                    LoadLargeMap.loadXjLayers.forEach(function(layer){
                        if(LoadLargeMap.map.getLayerById(layer.get("id"))!=null )
                            LoadLargeMap.map.getLayerById(layer.get("id")).getStyle().getImage().setScale(xjScale);
                    });
                    break;

                /*                   if(LoadLargeMap.map.getLayerById("xjgl1")!=null)
                                       LoadLargeMap.map.getLayerById("xjgl1").getStyle().getImage().setScale(xjScale);
                                   if(LoadLargeMap.map.getLayerById("xjgl2")!=null)
                                       LoadLargeMap.map.getLayerById("xjgl2").getStyle().getImage().setScale(xjScale);
                                   break;*/
                case "健康分析":
                    break;
                //预警卡
                case "预警态势":
                case "安全预警":
                case "预测预警":
                case "预警分析":
                    if(LoadLargeMap.map.getLayerById("rq_cgx")!=null)
                        LoadLargeMap.map.getLayerById("rq_cgx").getStyle().getImage().setScale(bjScale);
                    if(LoadLargeMap.map.getLayerById("rq_gx")!=null)
                        LoadLargeMap.map.getLayerById("rq_gx" ).getStyle().getImage().setScale(bjScale);
                    if(LoadLargeMap.map.getLayerById("rq_dx")!=null)
                        LoadLargeMap.map.getLayerById("rq_dx" ).getStyle().getImage().setScale(bjScale);
                    if(LoadLargeMap.map.getLayerById("rq_cdx")!=null)
                        LoadLargeMap.map.getLayerById("rq_cdx").getStyle().getImage().setScale(bjScale);
                    /*LoadLargeMap.map.getLayerById("gs_cgx").getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("gs_gx" ).getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("gs_dx" ).getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("gs_cdx").getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("ps_cgx").getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("ps_gx" ).getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("ps_dx" ).getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("ps_cdx").getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("rl_cgx").getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("rl_gx" ).getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("rl_dx" ).getStyle().getImage().setScale(scale);
                    LoadLargeMap.map.getLayerById("rl_cdx").getStyle().getImage().setScale(scale);*/
                    break;
                //监测卡
                case "运行趋势":
                    if(LoadLargeMap.map.getLayerById("33")!=null)
                        LoadLargeMap.map.getLayerById("33").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("34")!=null)
                        LoadLargeMap.map.getLayerById("34").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("35")!=null)
                        LoadLargeMap.map.getLayerById("35").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("36")!=null)
                        LoadLargeMap.map.getLayerById("36").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("44")!=null)
                        LoadLargeMap.map.getLayerById("44").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("wd")!=null)
                        LoadLargeMap.map.getLayerById("wd").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("yw")!=null)
                        LoadLargeMap.map.getLayerById("yw").getStyle().getImage().setScale(scale);
                    break;
                /*                    LoadLargeMap.map.getLayerById("rqzd").getStyle().getImage().setScale(scale/4);
                                    LoadLargeMap.map.getLayerById("gszd").getStyle().getImage().setScale(scale/4);
                                    LoadLargeMap.map.getLayerById("pszd").getStyle().getImage().setScale(scale/4);
                                    LoadLargeMap.map.getLayerById("rlzd").getStyle().getImage().setScale(scale/4);
                                    break;*/
                case "一张图":
                    if(LoadLargeMap.map.getLayerById("33")!=null)
                        LoadLargeMap.map.getLayerById("33").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("34")!=null)
                        LoadLargeMap.map.getLayerById("34").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("35")!=null)
                        LoadLargeMap.map.getLayerById("35").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("36")!=null)
                        LoadLargeMap.map.getLayerById("36").getStyle().getImage().setScale(jcScale);
                    if(LoadLargeMap.map.getLayerById("44")!=null)
                        LoadLargeMap.map.getLayerById("44").getStyle().getImage().setScale(jcScale);
                    if(LoadLargeMap.map.getLayerById("wd")!=null)
                        LoadLargeMap.map.getLayerById("wd").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("yw")!=null)
                        LoadLargeMap.map.getLayerById("yw").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("rq_cgx")!=null)
                        LoadLargeMap.map.getLayerById("rq_cgx").getStyle().getImage().setScale(bjScale);
                    if(LoadLargeMap.map.getLayerById("rq_gx")!=null)
                        LoadLargeMap.map.getLayerById("rq_gx" ).getStyle().getImage().setScale(bjScale);
                    if(LoadLargeMap.map.getLayerById("rq_dx")!=null)
                        LoadLargeMap.map.getLayerById("rq_dx" ).getStyle().getImage().setScale(bjScale);
                    if(LoadLargeMap.map.getLayerById("rq_cdx")!=null)
                        LoadLargeMap.map.getLayerById("rq_cdx").getStyle().getImage().setScale(bjScale);
                    break;
                    /*                    LoadLargeMap.map.getLayerById("2").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("3").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("4").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("5").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("39").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("11").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("12").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("13").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("14").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("40").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("28").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("36").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("7").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("8").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("9").getStyle().getImage().setScale(scale/4);
                                        LoadLargeMap.map.getLayerById("38").getStyle().getImage().setScale(scale/4);*/
                    break;
                case "设备卡":
                    break;
                case "智能选点":
                    if(LoadLargeMap.map.getLayerById("rkjz")!=null)
                        LoadLargeMap.map.getLayerById("rkjz").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("cyjj")!=null)
                        LoadLargeMap.map.getLayerById("cyjj").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("sslj")!=null)
                        LoadLargeMap.map.getLayerById("sslj").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("yhfx")!=null)
                        LoadLargeMap.map.getLayerById("yhfx").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("gyj")!=null)
                        LoadLargeMap.map.getLayerById("gyj").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("gy")!=null)
                        LoadLargeMap.map.getLayerById("gy").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("rqcz")!=null)
                        LoadLargeMap.map.getLayerById("rqcz").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("yqcy")!=null)
                        LoadLargeMap.map.getLayerById("yqcy").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("fx")!=null)
                        LoadLargeMap.map.getLayerById("fx").getStyle().getImage().setScale(znxdScale);
                    if(LoadLargeMap.map.getLayerById("xldxkj")!=null)
                        LoadLargeMap.map.getLayerById("xldxkj").getStyle().getImage().setScale(znxdScale);

                    break;
                //数据管理卡
                case "管网一张图":
                    if(LoadLargeMap.map.getLayerById("csmz")!=null)
                        LoadLargeMap.map.getLayerById("csmz").getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("rqccz")!=null)
                        LoadLargeMap.map.getLayerById("rqccz" ).getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("rqjqz")!=null)
                        LoadLargeMap.map.getLayerById("rqjqz" ).getStyle().getImage().setScale(scale);
                    if(LoadLargeMap.map.getLayerById("qytyz")!=null)
                        LoadLargeMap.map.getLayerById("qytyz").getStyle().getImage().setScale(scale);
                    /*                    LoadLargeMap.map.getLayerById("42").getStyle().getStroke().setWidth(scale*2);
                                        LoadLargeMap.map.getLayerById("45").getStyle().getStroke().setWidth(scale*2);
                                        LoadLargeMap.map.getLayerById("48").getStyle().getStroke().setWidth(scale*2);
                                        LoadLargeMap.map.getLayerById("52").getStyle().getStroke().setWidth(scale*2);
                                        LoadLargeMap.map.getLayerById("43").getStyle().getImage().setRadius(scale*2);
                                        LoadLargeMap.map.getLayerById("46").getStyle().getImage().setRadius(scale*2);
                                        LoadLargeMap.map.getLayerById("49").getStyle().getImage().setRadius(scale*2);
                                        LoadLargeMap.map.getLayerById("53").getStyle().getImage().setRadius(scale*2);*/
                    break;
                case "数据更新":
                    break;
                case "档案管理":
                    break;
                default:
                    break;
            }
        })
    },
    removeArray :function(array,val) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val) {
                index = i;
                break;
            }
        }
        if(index != -1)
            array.splice(index,1)
    },
    //设置图层树是否勾选
    setLayerVisible:function(event, treeId, treeNode){
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var treeChecked = treeObj.getCheckedNodes(true);
        var nodes = treeObj.getChangeCheckedNodes();
        var layers= LoadLargeMap.map.getLayers();
        var dyFlag = false;
        var zyFlag = false;
        var gyFlag = false;
        nodes.forEach(function(node){
            var checkId=node.id;
            var checked=node.checked;
            node.checkedOld=node.checked;
            layers.forEach(function(layer){
                if(!dyFlag && (layer.get("id") == "rq_dy_zr" || layer.get("id") == "rq_dy_kl" || layer.get("id") == "rq_dy_zgdj" ||layer.get("id") == "rq_dy_zgbj")){
                    if(checkId == "rq_dy"){
                        if(checked==true){
                            LoadLargeMap.gxYllxList.push("低压");
                            LoadLargeMap.gxQsdwList.forEach(function (item) {
                                switch (item) {
                                    case "东风中燃":
                                        LoadLargeMap.map.getLayerById("rq_dy_zr").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_zr"))
                                        break;
                                    case "昆仑燃气":
                                        LoadLargeMap.map.getLayerById("rq_dy_kl").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_kl"))
                                        break;
                                    case "中国燃气(丹江)":
                                        LoadLargeMap.map.getLayerById("rq_dy_zgdj").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_zgdj"))
                                        break;
                                    case "中国燃气(滨江新区)":
                                        LoadLargeMap.map.getLayerById("rq_dy_zgbj").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_dy_zgbj"))
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }else{
                            LoadLargeMap.removeArray(LoadLargeMap.gxYllxList,"低压");
                            LoadLargeMap.gxQsdwList.forEach(function (item) {
                                switch (item) {
                                    case "东风中燃":
                                        LoadLargeMap.map.getLayerById("rq_dy_zr").setVisible(false);
                                        break;
                                    case "昆仑燃气":
                                        LoadLargeMap.map.getLayerById("rq_dy_kl").setVisible(false);
                                        break;
                                    case "中国燃气(丹江)":
                                        LoadLargeMap.map.getLayerById("rq_dy_zgdj").setVisible(false);
                                        break;
                                    case "中国燃气(滨江新区)":
                                        LoadLargeMap.map.getLayerById("rq_dy_zgbj").setVisible(false);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                        dyFlag = true;
                    }
                }else if(!zyFlag && (layer.get("id") == "rq_zy_zr" || layer.get("id") == "rq_zy_kl" || layer.get("id") == "rq_zy_zgdj" ||layer.get("id") == "rq_zy_zgbj")){
                    if(checkId == "rq_zy"){
                        if(checked==true){
                            LoadLargeMap.gxYllxList.push("中压");
                            LoadLargeMap.gxQsdwList.forEach(function (item) {
                                switch (item) {
                                    case "东风中燃":
                                        LoadLargeMap.map.getLayerById("rq_zy_zr").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_zr"))
                                        break;
                                    case "昆仑燃气":
                                        LoadLargeMap.map.getLayerById("rq_zy_kl").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_kl"))
                                        break;
                                    case "中国燃气(丹江)":
                                        LoadLargeMap.map.getLayerById("rq_zy_zgdj").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_zgdj"))
                                        break;
                                    case "中国燃气(滨江新区)":
                                        LoadLargeMap.map.getLayerById("rq_zy_zgbj").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_zy_zgbj"))
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }else{
                            LoadLargeMap.removeArray(LoadLargeMap.gxYllxList,"中压");
                            LoadLargeMap.gxQsdwList.forEach(function (item) {
                                switch (item) {
                                    case "东风中燃":
                                        LoadLargeMap.map.getLayerById("rq_zy_zr").setVisible(false);
                                        break;
                                    case "昆仑燃气":
                                        LoadLargeMap.map.getLayerById("rq_zy_kl").setVisible(false);
                                        break;
                                    case "中国燃气(丹江)":
                                        LoadLargeMap.map.getLayerById("rq_zy_zgdj").setVisible(false);
                                        break;
                                    case "中国燃气(滨江新区)":
                                        LoadLargeMap.map.getLayerById("rq_zy_zgbj").setVisible(false);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                        zyFlag = true;
                    }
                }else if(!gyFlag && (layer.get("id") == "rq_gy_zr" || layer.get("id") == "rq_gy_kl" || layer.get("id") == "rq_gy_zgdj" ||layer.get("id") == "rq_gy_zgbj")){
                    if(checkId == "rq_gy"){
                        if(checked==true){
                            LoadLargeMap.gxYllxList.push("高压");
                            LoadLargeMap.gxQsdwList.forEach(function (item) {
                                switch (item) {
                                    case "东风中燃":
                                        LoadLargeMap.map.getLayerById("rq_gy_zr").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_zr"))
                                        break;
                                    case "昆仑燃气":
                                        LoadLargeMap.map.getLayerById("rq_gy_kl").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_kl"))
                                        break;
                                    case "中国燃气(丹江)":
                                        LoadLargeMap.map.getLayerById("rq_gy_zgdj").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_zgdj"))
                                        break;
                                    case "中国燃气(滨江新区)":
                                        LoadLargeMap.map.getLayerById("rq_gy_zgbj").setVisible(true);
                                        LoadLargeMap.flashSbyztLayer(LoadLargeMap.map.getLayerById("rq_gy_zgbj"))
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }else{
                            LoadLargeMap.removeArray(LoadLargeMap.gxYllxList,"高压");
                            LoadLargeMap.gxQsdwList.forEach(function (item) {
                                switch (item) {
                                    case "东风中燃":
                                        LoadLargeMap.map.getLayerById("rq_gy_zr").setVisible(false);
                                        break;
                                    case "昆仑燃气":
                                        LoadLargeMap.map.getLayerById("rq_gy_kl").setVisible(false);
                                        break;
                                    case "中国燃气(丹江)":
                                        LoadLargeMap.map.getLayerById("rq_gy_zgdj").setVisible(false);
                                        break;
                                    case "中国燃气(滨江新区)":
                                        LoadLargeMap.map.getLayerById("rq_gy_zgbj").setVisible(false);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                        gyFlag = true;
                    }
                }else if((layer.get("id") == "rq_gd_zr" || layer.get("id") == "rq_gd_kl" || layer.get("id") == "rq_gd_zgdj" ||layer.get("id") == "rq_gd_zgbj")){
                    if(checkId == "rq_gd"){
                        if(checked)
                            LoadLargeMap.isCheckedGd = true;
                        else
                            LoadLargeMap.isCheckedGd = false;
                        LoadLargeMap.gxQsdwList.forEach(function (item) {
                            switch (item) {
                                case "东风中燃":
                                    LoadLargeMap.map.getLayerById("rq_gd_zr").setVisible(checked);
                                    break;
                                case "昆仑燃气":
                                    LoadLargeMap.map.getLayerById("rq_gd_kl").setVisible(checked);
                                    break;
                                case "中国燃气(丹江)":
                                    LoadLargeMap.map.getLayerById("rq_gd_zgdj").setVisible(checked);
                                    break;
                                case "中国燃气(滨江新区)":
                                    LoadLargeMap.map.getLayerById("rq_gd_zgbj").setVisible(checked);
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                }else if(layer.get("id")==checkId){
                    if(checkId == "rq_cgx" || checkId == "rq_gx" || checkId == "rq_dx" || checkId == "rq_cdx"){
                        LoadLargeMap.flashYjLayer(LoadLargeMap.map.getLayerById(checkId),checked);
                    }
                    if(checked==true){
                        layer.setVisible(true);
                    }else{
                        layer.setVisible(false);
                    }
                    if(layer.get("type")=="xjgl"){
                        if(LoadLargeMap.map.getLayerById(checkId+"xjgj")!=null)
                            LoadLargeMap.map.getLayerById(checkId+"xjgj").setVisible(checked);
                        /*                        var xjryFeature = layer.getSource().getFeatures()[0];
                                                if(checked && (xjryFeature.values_.X坐标!="" || xjryFeature.values_.Y坐标!="")){
                                                    LoadLargeMap.flyToFeature([xjryFeature.values_.X坐标, xjryFeature.values_.Y坐标]);
                                                }*/
                    }
                }/*else if(layer.get("id")=="zrxjry"){
                    var xjrySource = layer.values_.source;
                    var features = xjrySource.getFeatures();  //获取源数据中要素的集合
                    features.forEach(function (item) {
                        if(item.values_.id == checkId){
                            if(checked==true){
                                item.setStyle(olLargeMapStyle.xjgl1_Style);
                            }else{
                                item.setStyle(null);
                            }
                        }
                     });
                    layer.changed()
                }*/
            })
        });
        /*        var zdTypeIds=[33,34,35,20,21,22,23,25,26,27,28,30,31,32]
                var flag = false;
                if(LoadLargeMap.currentMapType=="一张图") {
                    nodes.forEach(function(node){
                        var checkId=node.id;
                        var checked=node.checked;
                        node.checkedOld=node.checked;
                        if(zdTypeIds.indexOf(parseInt(checkId)) > -1){
                            flag =true;
                        }else{
                            layers.forEach(function(layer){
                                if(layer.get("id")==checkId){
                                    if(checked==true)
                                        layer.setVisible(true);
                                    else
                                        layer.setVisible(false);
                                }
                            })
                        }

                    })
                    if(flag){
                        var layerGs = '';
                        var layerPs = '';
                        var layerRq = '';
                        var layerRl = '';
                        treeChecked.forEach(function (node) {
                            if (node.pId == 1) {
                                layerRq += node.id + ","
                            } else if (node.pId == 2) {
                                layerGs += node.id + ","
                            } else if (node.pId == 3) {
                                layerPs += node.id + ","
                            } else if (node.pId == 4) {
                                layerRl += node.id + ","
                            }
                        });
                        if (layerRq != '')
                            layerRq = layerRq.substr(0, layerRq.length - 1);
                        if (layerGs != '')
                            layerGs = layerGs.substr(0, layerGs.length - 1);
                        if (layerPs != '')
                            layerPs = layerPs.substr(0, layerPs.length - 1);
                        if (layerRl != '')
                            layerRl = layerRl.substr(0, layerRl.length - 1);

                        olMapConfig.jcLayers.forEach(function (layer) {
                            LoadLargeMap.map.removeLayer(layer);
                        });
                        olMapConfig.jcLayers.forEach(function (layer) {
                            LoadLargeMap.map.addLayer(layer);
                            if(layer.values_.type=="rq_vector")
                                layer.setSource(LoadMap.getVecSource(layerRq != '' ? layerRq : '0', "rq_vector"))
                            if(layer.values_.type=="gs_vector")
                                layer.setSource(LoadMap.getVecSource(layerGs != '' ? layerGs : '0', "gs_vector"))
                            if(layer.values_.type=="ps_vector")
                                layer.setSource(LoadMap.getVecSource(layerPs != '' ? layerPs : '0', "ps_vector"))
                            if(layer.values_.type=="rl_vector")
                                layer.setSource(LoadMap.getVecSource(layerRl != '' ? layerRl : '0', "rl_vector"))
                        });
                    }

                }else{
                    nodes.forEach(function(node){
                        var checkId=node.id;
                        var checked=node.checked;
                        node.checkedOld=node.checked;
                        layers.forEach(function(layer){
                            if(layer.get("id")==checkId){
                                if(checked==true)
                                    layer.setVisible(true);
                                else
                                    layer.setVisible(false);
                            }
                        })
                    });
                }*/
    },
    //加载展示页的地图图层
    loadLayer:function(pidType,load_layers){
        var layerTreeSetting={
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey:"id",
                }
            },
            view: {
                selectedMulti: false
            },
            callback: {
                onCheck: LoadLargeMap.setLayerVisible
            }
        };
        switch (pidType) {
            //隐患卡
            case "隐患态势":
                featurInfo=$("#map_");
                //加载燃气各级隐患图层
                load_layers = load_layers.concat( LoadLargeMap.getYhLayerByLevel("燃气"));
                /*                olLargeMapConfig.rq_yhLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadLargeMap.getYhSource("燃气",layer.values_.name));
                                    layer.setVisible(true);
                                });
                                //加载给水各级隐患图层
                                olLargeMapConfig.gs_yhLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadLargeMap.getYhSource("给水",layer.values_.name));
                                    layer.setVisible(false);
                                });
                                //加载排水各级隐患图层
                                olLargeMapConfig.ps_yhLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadLargeMap.getYhSource("排水",layer.values_.name));
                                    layer.setVisible(false);
                                });
                                //加载热力各级隐患图层
                                olLargeMapConfig.rl_yhLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadLargeMap.getYhSource("热力",layer.values_.name));
                                    layer.setVisible(false);
                                });*/
                break;
            case "隐患一张图":
                featurInfo=$("#map_box");
                /*              $.ajax({
                                  url: "/json/wTblYhyztTree.json",
                                  type: 'get',
                                  success: function (data) {
                                      var zNodes = data.data;
                                      // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                                      $.fn.zTree.init($("#treeDemo"), layerTreeSetting, zNodes);

                                  }
                              })*/

                //load_layers = load_layers.concat( LoadLargeMap.getYhLayerByLevelSource("燃气"));
                load_layers = load_layers.concat( LoadLargeMap.getYhLayerByLevelSourceState("燃气"));
                //load_layers = load_layers.concat( LoadLargeMap.getYhLayerByLevel("燃气"));
                //load_layers = load_layers.concat( LoadLargeMap.getYhLayerBySource("燃气"));
                /*                olLargeMapConfig.yhLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadMap.getVecSource(layer.values_.id,layer.values_.type));
                                });
                                olLargeMapConfig.yhBySourceLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadLargeMap.getYhSourceBySource(layer.values_.name));
                                    layer.setVisible(false);
                                });*/
                /*                olMapConfig.gxLayers.forEach(function(layer){
                                    if(layer.values_.id == 42 || layer.values_.id == 45 || layer.values_.id == 48 || layer.values_.id == 52){
                                        load_layers.push(layer);
                                        layer.setVisible(false);
                                    }
                                });*/
                break;
            case "巡检管理":
                featurInfo=$("#map_box");
                ajax_Method({
                    url: "/Xjgl/getXjryTree",
                    type: 'get',
                    successCallback(data) {
                        $.fn.zTree.init($("#treeDemo"), layerTreeSetting, data);
                    }
                })
                load_layers.push(olMapConfig.gxLayersByYl[0]);
                load_layers.push(olMapConfig.gxLayersByYl[1]);
                load_layers.push(olMapConfig.gxLayersByYl[2]);
                var datetime = new Date();
                var year = datetime.getFullYear();
                var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                ajax_Method({
                    url: "/aqyh/wTblHiddendangerPolling/queryXjry",
                    type: 'get',
                    data: {
                        addtime: year+month+date
                    },
                    successCallback(data) {
                        load_layers = load_layers.concat( LoadLargeMap.getDataXjLayerByZr(data));
                    }
                })

                /*                ajax_Method({
                                    url: "/Xjgl/zr/getXjry",
                                    type: 'get',
                                    successCallback(data) {
                                        load_layers = load_layers.concat( LoadLargeMap.getXjLayerByZr(data));
                                    }
                                })*/
                //load_layers = load_layers.concat( LoadLargeMap.getXjLayer());
                /*                olLargeMapConfig.xj_layers[0].setSource(LoadLargeMap.getXjSource());
                                load_layers.push(olLargeMapConfig.xj_layers[0]);*/
                break;
            case "健康分析":
                featurInfo=$("#map_box");
                //加载燃气各级隐患图层
                load_layers.push(olLargeMapConfig.gxHealthLayers[0]);
                load_layers.push(olLargeMapConfig.gxHealthLayers[1]);
                load_layers.push(olLargeMapConfig.gxHealthLayers[2]);
                load_layers.push(olLargeMapConfig.gxHealthLayers[3]);
                /*                olLargeMapConfig.gxHealthLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    if(layer.values_.id=="rl0" ||layer.values_.id=="rl1" || layer.values_.id=="rl2" || layer.values_.id=="rl3")
                                        layer.setVisible(true);
                                    else
                                        layer.setVisible(false);
                                });*/
                break;
            case "研判分析":
                break;
            case "占压分析":
                break;
            case "超期分析":
                featurInfo=$("#map_box");
                load_layers.push(olLargeMapConfig.gxCqLayers[0]);
                load_layers.push(olLargeMapConfig.gxCqLayers[1]);
                load_layers.push(olLargeMapConfig.gxCqLayers[2]);
                load_layers.push(olLargeMapConfig.gxCqLayers[3]);
                /*                olLargeMapConfig.gxCqLayers.forEach(function(layer){
                                    load_layers.push(layer);
                /!*                    if(layer.values_.id=="rq05" ||layer.values_.id=="gs05" || layer.values_.id=="ps05" || layer.values_.id=="rl05")
                                        layer.setVisible(true);
                                    else
                                        layer.setVisible(false);*!/
                                });*/
                break;
            case "合规性":
                olMapConfig.gxLayers.forEach(function(layer){
                    if(layer.values_.id=="45" ||layer.values_.id=="47" || layer.values_.id=="49" || layer.values_.id=="51")
                        load_layers.push(layer);
                });
                break;
            //预警卡
            case "预警态势":
            /*                var wclLayer = olLargeMapConfig.wclyjLayers[0];
                            wclLayer.setSource(LoadLargeMap.getWclyjSource());
                            load_layers.push(wclLayer);*/
            case "安全预警":
            case "预测预警":
            case "预警分析":
                featurInfo=$("#map_box");
                //加载燃气各级预警
                olLargeMapConfig.yjtsLayers.forEach(function(layer){
                    load_layers.push(layer);
                    layer.setSource(LoadLargeMap.getYjSource(layer.values_.type,layer.values_.name));
                    if(layer.values_.id=="rq_cgx" || layer.values_.id=="rq_gx" || layer.values_.id=="rq_dx" || layer.values_.id=="rq_cdx")
                        layer.setVisible(true);
                    else
                        layer.setVisible(false);
                });
                break;
            //监测卡
            case "运行趋势":
                featurInfo=$("#map_box");
                /*                olMapConfig.gxLayers.forEach(function(layer) {
                                    if (layer.values_.id == "42") {
                                        load_layers.push(layer);
                                    }
                                });*/
                load_layers.push(olMapConfig.gxLayersByYl[0]);
                load_layers.push(olMapConfig.gxLayersByYl[1]);
                load_layers.push(olMapConfig.gxLayersByYl[2]);
                load_layers = load_layers.concat( LoadMap.getNewJcFeatures("监测"));
                load_layers = load_layers.concat( LoadLargeMap.getYjLayer());
                break;
            case "一张图":
                featurInfo=$("#map_box");
                $.ajax({
                    url: "/json/wTblYxyztTree.json",
                    type: 'get',
                    success: function (data) {
                        var zNodes = data.data;
                        // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                        $.fn.zTree.init($("#treeDemo"), layerTreeSetting, zNodes);

                    }
                })
                /*                $.ajax({
                                    url: "/tree/get/ListTree",
                                    type: 'post',
                                    dataType:'json',
                                    data:{pidType:"监测"},
                                    success: function (data) {
                                        var zNodes = data.data;
                                        // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                                        $.fn.zTree.init($("#treeDemo"), layerTreeSetting, zNodes);
                                    }
                                })*/
                /*                olMapConfig.gxLayers.forEach(function(layer) {
                                    if (layer.values_.id == "42") {
                                        load_layers.push(layer);
                                    }
                                });*/
                load_layers.push(olMapConfig.gxLayersByYl[0]);
                load_layers.push(olMapConfig.gxLayersByYl[1]);
                load_layers.push(olMapConfig.gxLayersByYl[2]);
                load_layers = load_layers.concat( LoadMap.getNewJcFeatures("监测"));
                //加载燃气各级预警
                load_layers = load_layers.concat( LoadLargeMap.getYjLayer());
                break;
            case "设备卡":
                break;
            case "智能选点":
                olLargeMapConfig.znxdLayers.forEach(function(layer){
                    load_layers.push(layer);
                    layer.setSource(LoadLargeMap.getZnxdSource(layer.values_.id));
                    if(layer.values_.id=="rkjz_qy" || layer.values_.id=="rkjz")
                        layer.setVisible(true);
                    else
                        layer.setVisible(false);
                });
                break;
            //数据管理卡
            case "管网一张图":
                //featurInfo=$("#featureInfo");
                featurInfo=$("#map_box");
                pointFeatureInfo=$("#mapPoint_box");
                czFeatureInfo=$("#map_box_cz");
                $.ajax({
                    url: "/json/wTblGwyztYlTree.json",
                    type: 'get',
                    success: function (data) {
                        var zNodes = data.data;
                        // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                        $.fn.zTree.init($("#treeDemo"), layerTreeSetting, zNodes);

                    }
                })
                /*                $.ajax({
                                    url: "/tree/get/ListTree",
                                    type: 'post',
                                    dataType:'json',
                                    data:{pidType:"地下管网"},
                                    success: function (data) {
                                        var zNodes = data.data;
                                        // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                                        $.fn.zTree.init($("#treeDemo"), layerTreeSetting, zNodes);
                                    }
                                })*/
                //load_layers.push(olMapConfig.gxLayers[0]);
                //load_layers.push(olMapConfig.gxLayers[1]);
                /*                olMapConfig.gxLayersByYl.forEach(function(layer){
                                    load_layers.push(layer);
                                    if(layer.values_.id=="rq_gd")
                                        layer.setVisible(false);
                                });*/
                olMapConfig.gxLayersByQsdwYl.forEach(function(layer){
                    load_layers.push(layer);
                    if(layer.values_.id=="rq_gd_kl" || layer.values_.id=="rq_gd_zr" || layer.values_.id=="rq_gd_zgbj" || layer.values_.id=="rq_gd_zgdj")
                        layer.setVisible(false);
                });
                load_layers = load_layers.concat( LoadLargeMap.getCzLayer());
                /*                olLargeMapConfig.czssLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                    layer.setSource(LoadLargeMap.getCzqySource(layer.values_.id));
                                });*/
                /*                olMapConfig.gxLayers.forEach(function(layer){
                                    load_layers.push(layer);
                                });*/
                break;
            case "数据更新":
                load_layers.push(olMapConfig.gxLayersByYl[0]);
                load_layers.push(olMapConfig.gxLayersByYl[1]);
                load_layers.push(olMapConfig.gxLayersByYl[2]);

                /*                load_layers.push(olMapConfig.gxLayers[0]);
                                olMapConfig.gxLayers[0].setVisible(true);*/
                /*                olMapConfig.gxLayers.forEach(function(layer){
                                    if(layer.values_.id == "42" || layer.values_.id == "45" || layer.values_.id == "48"|| layer.values_.id == "52" ){
                                        load_layers.push(layer);
                                        if(layer.values_.id=="42")
                                            layer.setVisible(true);
                                        else
                                            layer.setVisible(false);
                                    }
                                });*/
                break;
            case "档案管理":
                break;
            default:
                break;
        }
        return load_layers;
    },
    //切换天地图，arcgis,影像图
    switchBaseMap:function (index){
        if(index == 0){
            LoadLargeMap.map.getLayerById("arcgisLayer").setVisible(false);
            LoadLargeMap.map.getLayerById("baseLayerV").setVisible(true);
            LoadLargeMap.map.getLayerById("baseLayerB").setVisible(true);
            LoadLargeMap.map.getLayerById("baseLayerW").setVisible(false);
            // $('#mapPoint_box .tc_title').css('color','#000')
            $('#mapPoint_box ul li').css('color','#000')
        }else if(index == 1){
            LoadLargeMap.map.getLayerById("arcgisLayer").setVisible(true);
            LoadLargeMap.map.getLayerById("baseLayerV").setVisible(false);
            LoadLargeMap.map.getLayerById("baseLayerB").setVisible(false);
            LoadLargeMap.map.getLayerById("baseLayerW").setVisible(false);
            $('#mapPoint_box ul li').css('color','#fff')
        }else if(index == 2){
            LoadLargeMap.map.getLayerById("arcgisLayer").setVisible(false);
            LoadLargeMap.map.getLayerById("baseLayerV").setVisible(false);
            LoadLargeMap.map.getLayerById("baseLayerB").setVisible(true);
            LoadLargeMap.map.getLayerById("baseLayerW").setVisible(true);
            $('#mapPoint_box ul li').css('color','#fff')
        }
    },
    //切换超期管线
    switchCqGx:function (cqsj){
        if(cqsj == "0-5年"){
            LoadLargeMap.map.getLayerById("rq05").setVisible(true);
            /*
                        LoadLargeMap.map.getLayerById("gs05").setVisible(true);
                        LoadLargeMap.map.getLayerById("ps05").setVisible(true);
                        LoadLargeMap.map.getLayerById("rl05").setVisible(true);
            */
            LoadLargeMap.map.getLayerById("rq10").setVisible(false);
            /* LoadLargeMap.map.getLayerById("gs10").setVisible(false);
             LoadLargeMap.map.getLayerById("ps10").setVisible(false);
             LoadLargeMap.map.getLayerById("rl10").setVisible(false);
        */     LoadLargeMap.map.getLayerById("rq15").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs15").setVisible(false);
            LoadLargeMap.map.getLayerById("ps15").setVisible(false);
            LoadLargeMap.map.getLayerById("rl15").setVisible(false);
*/            LoadLargeMap.map.getLayerById("rq20").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs20").setVisible(false);
            LoadLargeMap.map.getLayerById("ps20").setVisible(false);
            LoadLargeMap.map.getLayerById("rl20").setVisible(false);
*/        }else if(cqsj == "5-10年"){
            LoadLargeMap.map.getLayerById("rq05").setVisible(false);
            /* LoadLargeMap.map.getLayerById("gs05").setVisible(false);
             LoadLargeMap.map.getLayerById("ps05").setVisible(false);
             LoadLargeMap.map.getLayerById("rl05").setVisible(false);
 */            LoadLargeMap.map.getLayerById("rq10").setVisible(true);
            /*LoadLargeMap.map.getLayerById("gs10").setVisible(true);
            LoadLargeMap.map.getLayerById("ps10").setVisible(true);
            LoadLargeMap.map.getLayerById("rl10").setVisible(true);
*/            LoadLargeMap.map.getLayerById("rq15").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs15").setVisible(false);
            LoadLargeMap.map.getLayerById("ps15").setVisible(false);
            LoadLargeMap.map.getLayerById("rl15").setVisible(false);
      */      LoadLargeMap.map.getLayerById("rq20").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs20").setVisible(false);
            LoadLargeMap.map.getLayerById("ps20").setVisible(false);
            LoadLargeMap.map.getLayerById("rl20").setVisible(false);
*/        }else if(cqsj == "10-15年"){
            LoadLargeMap.map.getLayerById("rq05").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs05").setVisible(false);
            LoadLargeMap.map.getLayerById("ps05").setVisible(false);
            LoadLargeMap.map.getLayerById("rl05").setVisible(false);
*/            LoadLargeMap.map.getLayerById("rq10").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs10").setVisible(false);
            LoadLargeMap.map.getLayerById("ps10").setVisible(false);
            LoadLargeMap.map.getLayerById("rl10").setVisible(false);
*/            LoadLargeMap.map.getLayerById("rq15").setVisible(true);
            /*LoadLargeMap.map.getLayerById("gs15").setVisible(true);
            LoadLargeMap.map.getLayerById("ps15").setVisible(true);
            LoadLargeMap.map.getLayerById("rl15").setVisible(true);
      */      LoadLargeMap.map.getLayerById("rq20").setVisible(false);
            /*LoadLargeMap.map.getLayerById("gs20").setVisible(false);
            LoadLargeMap.map.getLayerById("ps20").setVisible(false);
            LoadLargeMap.map.getLayerById("rl20").setVisible(false);
*/        }else if(cqsj == "15-20年"){
            LoadLargeMap.map.getLayerById("rq05").setVisible(false);
            /*   LoadLargeMap.map.getLayerById("gs05").setVisible(false);
               LoadLargeMap.map.getLayerById("ps05").setVisible(false);
               LoadLargeMap.map.getLayerById("rl05").setVisible(false);
   */            LoadLargeMap.map.getLayerById("rq10").setVisible(false);
            /* LoadLargeMap.map.getLayerById("gs10").setVisible(false);
             LoadLargeMap.map.getLayerById("ps10").setVisible(false);
             LoadLargeMap.map.getLayerById("rl10").setVisible(false);
 */            LoadLargeMap.map.getLayerById("rq15").setVisible(false);
            /*  LoadLargeMap.map.getLayerById("gs15").setVisible(false);
              LoadLargeMap.map.getLayerById("ps15").setVisible(false);
              LoadLargeMap.map.getLayerById("rl15").setVisible(false);
  */            LoadLargeMap.map.getLayerById("rq20").setVisible(true);
            /* LoadLargeMap.map.getLayerById("gs20").setVisible(true);
             LoadLargeMap.map.getLayerById("ps20").setVisible(true);
             LoadLargeMap.map.getLayerById("rl20").setVisible(true);
 */        }
    },
    trace:function (){
        var routeCoords = [
            [110.77881465,32.6419878],
            [110.78046117,32.6414066],
            [110.78227718,32.6399538],
            [110.78247089,32.6397359],
            [110.7838752,32.63864634],
            [110.7856186,32.6384526 ]
            /*            [110.777705583236, 32.64196518285],
                        [110.77697400876, 32.63456838752],
                        [110.777690404969, 32.6456019662],
                        [110.77390876135, 32.6543929573],
                        [110.771710694995, 32.645629676],
                        [110.772714151255, 32.6245676326],
                        [110.767696756839, 32.654750465],
                        [110.767658446785, 32.6498835419],
                        [110.787870307434, 32.65199320663]*/
        ];
        var route = new ol.geom.LineString(routeCoords);
        var routeLength = routeCoords.length;
        var routeFeature = new ol.Feature({
            type: 'route',
            geometry: route
        });
        var geoMarker = new ol.Feature({
            type: 'geoMarker',
            geometry: new ol.geom.Point(routeCoords[0])
        });
        var startMarker = new ol.Feature({
            type: 'icon',
            geometry: new ol.geom.Point(routeCoords[0])
        });
        var endMarker = new ol.Feature({
            type: 'icon',
            geometry: new ol.geom.Point(routeCoords[routeLength - 1])
        });
        const position = startMarker.getGeometry().clone();
        var styles = {
            'route': new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6, color: [237, 212, 0, 0.8]
                })
            }),
            'icon': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src:'/systemStatic/style/img/yhImage/xjry.png',
                    scale:0.2
                })
            }),
            'geoMarker': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    src:'/systemStatic/style/img/yhImage/xjry.png',
                    scale:0.2
                })
            })
        };
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [ geoMarker, startMarker, endMarker]
            }),
            style: function(feature) {
                return styles[feature.get('type')];
            }
        });
        LoadLargeMap.map.addLayer(vectorLayer);

        let distance = 0;
        let lastTime = Date.now();
        /*vectorLayer.on('postrender',function(event){
            const speed = 100;
            const time = event.frameState.time;
            const elapsedTime = time - lastTime;
            distance = (distance + (speed * elapsedTime) / 1e6) % 2;
            lastTime = time;

            const currentCoordinate = route.getCoordinateAt(
                distance > 1 ? 2 - distance : distance
            );
            position.setCoordinates(currentCoordinate);
            const vectorContext = ol.render.getVectorContext(event);
            vectorContext.setStyle(styles.geoMarker);
            vectorContext.drawGeometry(position);
            // tell OpenLayers to continue the postrender animation
            LoadLargeMap.map.render();
        })*/
        // hide geoMarker and trigger map render through change event
        geoMarker.setGeometry(null);
    },
    //*******数据更新画线*********
    sjgxLayers:[],
    //定位
    flyToLine : function(lineStr,pointStr){
        for(var i=0; i<LoadLargeMap.sjgxLayers.length;i++){
            LoadLargeMap.map.removeLayer(LoadLargeMap.sjgxLayers[i]);
        }
        LoadLargeMap.sjgxLayers=[];
        if (lineStr == null || lineStr == "")
            return;
        var pointList;
        var arrPointtemp;
        var point;
        var pointTemp;
        var pointCoord;
        var arrLinetemp = lineStr.split('|');
        for (var i = 0; i < arrLinetemp.length; i++) {
            pointList = new Array();
            if (arrLinetemp[i] != "") {
                arrPointtemp = arrLinetemp[i].split(',');
                for (var j = 0; j < arrPointtemp.length; j++) {
                    point = arrPointtemp[j];
                    if (point != "") {
                        pointTemp = point.split(' ');
                        pointCoord = [parseFloat(pointTemp[0]), parseFloat(pointTemp[1])];
                        pointList.push(pointCoord);
                    }
                }
                LoadLargeMap.addLineLayer(pointList);
            }
        }
        if(pointStr!=null)
            LoadLargeMap.addLable(pointStr)
    },
    addLineLayer(pointList) {
        var source = new ol.source.Vector();
        var lineLayer = new ol.layer.Vector({
            source: source,
        });
        LoadLargeMap.map.addLayer(lineLayer);
        var layers = LoadLargeMap.map.getLayers();
        var lineString = new ol.geom.LineString(pointList);
        var line = new ol.Feature({
            geometry: lineString,
        });
        var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "#00ff00",
                width: 2,
            }),
        });
        //line.setStyle(this.createLabelStyle(line))
        line.setStyle(style);
        source.addFeature(line);
        LoadLargeMap.sjgxLayers.push(lineLayer);
    },

    /*创建点标注*/
    addLable: function (pointStr) {
        var locate;
        for (var i = 0; i < pointStr.length; i++) {
            if(pointStr[i]["dtbz"]==null)
                continue;
            locate = pointStr[i]["dtbz"].split(',');
            var x = parseFloat(locate[0]);
            var y = parseFloat(locate[1]);
            var point = new ol.geom.Point( [x,y]);
            var pointFeature = new ol.Feature(point);
            pointFeature.setStyle(
                new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 30],              //锚点
                        anchorOrigin:'top-right',       //锚点源
                        anchorXUnits: 'fraction',       //锚点X值单位
                        anchorYUnits: 'pixels',         //锚点Y值单位
                        offsetOrigin: 'top-right',      //偏移原点
                        crossOrigin: 'anonymous',
                        //src: '../../system/attachFile/getFileById?fileId='+pointStr[i]["sgtp"],
                        src:'/images/yanshi/进度框-白字.png',
                        //scale: 0.02
                    }),
                    text: new ol.style.Text({
                        text: pointStr[i]["lczt"]+"%",
                        scale: 1,
                        fill: new ol.style.Fill({
                            color: '#FFFFFF'
                        }),
                        /*                        stroke: new ol.style.Stroke({
                                                    color: '#FFFFFF',
                                                    width: 3.5
                                                }),*/
                        offsetX: 0,
                        offsetY: -20,
                    })
                })
            );
            var source = new ol.source.Vector();
            var lineLayer = new ol.layer.Vector({
                type:"sjgx_label",
                source: source,
                name: pointStr[i]["sgtp"],
            });
            source.addFeature(pointFeature);
            LoadLargeMap.map.addLayer(lineLayer);
            LoadLargeMap.sjgxLayers.push(lineLayer);
        }
    },
    /*创建标注样式
    *@param{object}  feature  标注要素
    *@return {object} 返回创建的标注样式对象
    */
    createLabelStyle(feature) {
        //返回一个样式
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "#00ff00",
                width: 2,
            }),
            //图标样式
            image: new ol.style.Icon({
                anchor: [10, 18],      //设置图标偏移
                scale: 0.6,      // 图标缩小显示
                anchorOrigin: 'top-right',     //标注样式的起点位置
                anchorXUnits: 'pixels',    //X方向单位：分数
                anchorYUnits: 'pixels',     //Y方向单位：像素
                offsetOrigin: 'bottom-left',   //偏移起点位置的方向
                opacity: 0.9,    //透明度
                src: feature.get('img')     //图片路径
            }),
            //文本样式
            text: new ol.style.Text({
                textAlign: 'center',     //对齐方式
                textBaseline: 'middle',    //文本基线
                font: 'normal 12px 微软雅黑',     //字体样式
                text: feature.get('name'),    //文本内容
                offsetY: -25,    // Y轴偏置
                fill: new ol.style.Fill({        //填充样式
                    color: '#ffffff'
                }),
                backgroundFill: new ol.style.Fill({      // 填充背景
                    color: '#ff00ff'
                }),
                padding: [2, 5, 2, 5],
            }),
            // 设置层级
            zIndex: 199
        });
    },
    // 定位到范围
     positionExtent(sys) {
    //定位范围
     LoadLargeMap.view.fit(sys, {
        duration: 2000,//动画的持续时间,
        callback: function () {
            alert("positionExtent compete !")
        },
    });
}
    //****************
};
//初始化地图
LoadLargeMap.mapInit = function (_callback, config) {
    LoadLargeMap.currentMapType = config.pidType;
    let load_layers=[];
    //加载底图
    load_layers.push(olLargeMapConfig.dtLayers[0]);
    load_layers.push(olLargeMapConfig.dtLayers[1]);
    load_layers.push(olLargeMapConfig.dtLayers[2]);
    load_layers.push(olLargeMapConfig.dtLayers[3]);
    olLargeMapConfig.dtLayers[0].setVisible(true);
    olLargeMapConfig.dtLayers[1].setVisible(false);
    olLargeMapConfig.dtLayers[2].setVisible(false);
    olLargeMapConfig.dtLayers[3].setVisible(false);
    //加载高亮图层
    load_layers.push(LoadLargeMap.highlightL);
    //加载展示页的地图图层
    load_layers = LoadLargeMap.loadLayer(config.pidType,load_layers);
    LoadLargeMap.map = new ol.Map({
        target: 'mapDiv',
        view: LoadLargeMap.view,
        layers: load_layers
    });
    //地图单击事件
    LoadLargeMap.singleclick();
    LoadLargeMap.moveendListen(config.pidType);
    /*    if(config.pidType == "巡检管理"){
            LoadLargeMap.trace();
        }*/
    LoadLargeMap.flashHighLight(true);
};
