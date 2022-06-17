package com.ruoyi.hdsw.controller;

import com.ruoyi.common.utils.uuid.IdUtils;
import com.ruoyi.hdsw.model.Gxtype;
import com.ruoyi.hdsw.service.impl.GxtypeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@Api(value = "业务类型管理", description = "业务类型管理")
@RequestMapping("/hdsw/gxtype")
public class GxtypeController {
    @Autowired
    private GxtypeServiceImpl gxtypeService;

    /**
     * 查找
     */
    @ApiOperation("业务管理查询功能")
    @RequestMapping(value = "/select",method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public Object select() {
        List<Gxtype> select = gxtypeService.select();
        return select;
    }

    /**
     * 添加
     */
    @ApiOperation("业务管理添加功能")
    @ApiImplicitParam(name="name",value="类型",dataType="string")
    @RequestMapping(value = "/insert",method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public Object insert(String name) {
        String id = IdUtils.fastSimpleUUID();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(date);
        int i = gxtypeService.insert(id, name, time);
        return i;
    }

    /**
     * 删除
     */
    @ApiOperation("业务管理删除功能")
    @ApiImplicitParam(name="id",value="id",dataType="string")
    @RequestMapping(value = "/delete",method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public Object delete(String id) {
        int i = gxtypeService.delete(id);
        return i;
    }

    /**
     * 修改
     */
    @ApiOperation("业务管理修改功能")
    @ApiImplicitParams({
            @ApiImplicitParam(name="id",value="id",dataType="string"),
            @ApiImplicitParam(name="name",value="类型",dataType="string")})
    @RequestMapping(value = "/update",method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public Object update(String id, String name) {
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(date);
        return gxtypeService.update(id, name, time);
    }

}
