function Common_layer(url, title, width, height) {
    if (height == '' || height == undefined) {
        height = width;
    }
    layui.use('layer', function () {
        top.layer.open({
            title: title,
            type: 2,
            closeBtn: 1,//关闭按钮
            shade: 0.5,
            anim: 2,
            btn: ['关闭'],
            area: [width, height],
            content: url,
        })
    })
}
function viewImg_layer(url, title, width, height) {
    if (height == '' || height == undefined) {
        height = width;
    }
    layui.use('layer', function () {
        top.layer.open({
            title: title,
            type: 1,
            closeBtn: 0,//关闭按钮
            shade: 0.5,
            anim: 2,
            btn: ['关闭'],
            area: [width, height],
            content: url,
        })
    })
}
function viewImg_inform(url, title, width, height) {
    if (height == '' || height == undefined) {
        height = width;
    }
    layui.use('layer', function () {
        top.layer.open({
            title: title,
            type: 2,
            // closeBtn: 2,//关闭按钮
            shade: 0.5,
            anim: 2,
            // btn: ['取消','发送'],
            area: [width, height],
            content: url,
        })
    })
}
//用于跳转工艺
function flowChart(ID,name){
    layui.use('layer', function () {
        top.layui.index.openTabsPage('/ssjc/wTblRealTimeData/artwork?ID='+ID+'&name='+name,name+'工艺图');
    })
}

function alarmEvent() {
    var url = '/getWater/getAlarmDialog';
    Common_layer(url, '报警事件列表', '80%', '90%')
}

//用于标记是修改还是删除或是查看等等
// (0,0) 第一个参数表示是修改还是删除或者其他，第二个参数表示是选择没选择数据或者是选择了几条
function flag_Method(mark, flag) {
    //修改
    if (mark == 0 && flag == 0) {
        var str = '请选择你要修改的数据';
        Confirm_layer(str)
    } else if (mark == 0 && flag == 1) {
        var str = '一次只能修改一条数据';
        Confirm_layer(str)
    }
    // 删除
    if (mark == 1 && flag == 0) {
        var str = '请选择你要删除的数据';
        Confirm_layer(str)
    }
    //判端是否上报
    if (mark == 2 && flag == 0) {
        var str = '所选数据已上报，请重新选择';
        Confirm_layer(str)
    }

    //查看
    if (mark == 3 && flag == 0) {
        var str = '请选择你要查看的数据';
        Confirm_layer(str)
    } else if (mark == 3 && flag == 1) {
        var str = '一次只能查看一条数据';
        Confirm_layer(str)
    }

    //上报
    if (mark == 4 && flag == 0) {
        var str = '请选择要上报的数据';
        Confirm_layer(str)
    } else if (mark == 4 && flag == 1) {
        var str = '请选择一条数据进行上报';
        Confirm_layer(str)
    }

    //导出
    if (mark == 5 && flag == 0) {
        var str = '请选择要导出的数据';
        Confirm_layer(str)
    } else if (mark == 5 && flag == 1) {
        var str = '一次只能导出一条数据';
        Confirm_layer(str)
    }
}

//用于弹出提示信息
function Confirm_layer(str) {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            title: "提示信息",
            content: str,
            icon: 5,
            yes: function (index) {
                layer.close(index)
            },
            cancel: function (index) {
                layer.close(index)
            }
        });
    })
}

//日期时间封装
function Date_layer(id, type) {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#' + id
            , type: type
            , trigger: 'click'
        });
    })
}

layui.use(['element', 'form'], function () {
    var element = layui.element;
    var form = layui.form;
})
