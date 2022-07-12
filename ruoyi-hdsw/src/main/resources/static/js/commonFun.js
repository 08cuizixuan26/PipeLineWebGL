//ajax方法
ajax_Method = ({
                   url,
                   type = 'get',
                   data = {},
                   async = false,
                   dataType = 'json',
                   contentType = "application/json",
                   successCallback
               }) => {
    $.ajax({
        url,
        type,
        data,
        async,
        dataType,
        contentType,
        success(res) {
            successCallback(res)
        },
        error: () => {
            console.log("服务器错误")
        }
    })
}


//table表格方法
table_Method = ({tableId, data, where = {}, cols, height, cellMinWidth, limit,limits, pageNum, pageSize, successCallback}) => {
    layui.use('table', () => {
        let table = layui.table;
        table.render({
            elem: "#" + tableId,
            data: data, //数据接口
            page: true, //开启分页
            checkbox: true,
            height: height,
            cellMinWidth: cellMinWidth,
            limit: limit,
            limits:limits,
            where: where,
            id: tableId,
            request: {
                pageName: pageNum, //页码
                limitName: pageSize //每页几条
            },
            cols: cols,
            // done: (res) => {
            //     successCallback(res.count);
            // }
            done: function(res, curr, count){
            $('.layui-laypage-limits').hide();
        }
        });
    })
}
table_ClickRow = ({tableId, successCallback}) => {
    layui.use('table', () => {
        let table = layui.table;
        table.on("row(" + tableId + ")", (obj) => {
            successCallback(obj.data);
        })
    })
}

//单击行工具事件
table_tool = ({tableId, successCallback}) => {
    layui.use('table', () => {
        let table = layui.table;
        table.on("tool(" + tableId + ")", (obj) => {
            successCallback(obj);
        })
    })
}
//日期时间方法
layuiDate = ({id, type, value}) => {
    layui.use('laydate', () => {
        let laydate = layui.laydate;
        laydate.render({
            elem: `#${id}`
            , type: `${type}`
            , value: `${value}`
            , trigger: 'click'
        });
    })
}
//表单赋值事件可以用于回显数据
form_Val = ({formFilter, res}) => {
    layui.use('form', function () {
        var form = layui.form;
        form.val("" + formFilter + "", res)
    })
}
//提交表单事件
submit_Form = ({successCallback}) => {
    layui.use('form', function () {
        var form = layui.form;
        form.on("submit(*)", function (data) {
            successCallback(data);
        })
    })
}
tdTitle = () => {
    $('th').each(function (index, element) {
        $(element).attr('title', $(element).text());
    });
    $('td').each(function (index, element) {
        $(element).attr('title', $(element).text());
    });
}

/**
 * 生成UUID
 */
function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}