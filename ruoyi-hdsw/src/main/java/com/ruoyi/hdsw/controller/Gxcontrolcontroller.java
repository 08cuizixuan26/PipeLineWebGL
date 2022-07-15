package com.ruoyi.hdsw.controller;

import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.utils.uuid.IdUtils;
import com.ruoyi.hdsw.model.Gxcontrol;
import com.ruoyi.hdsw.model.Gxtype;
import com.ruoyi.hdsw.service.impl.GxcontrolServiceImpl;
import com.ruoyi.hdsw.service.impl.GxtypeServiceImpl;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/hdsw/gxcontrol")
public class Gxcontrolcontroller {
    @Autowired
    private GxcontrolServiceImpl gxcontrolService;



    @RequestMapping("/gdtype")
    public String  gdtype() {
        return "hdGis/gdtype";
    }


    /**
     * 查找
     */
    @RequestMapping("/select")
    @ResponseBody
    public Object select() {
        List<Gxcontrol> select = gxcontrolService.select();
        return select;
    }

    /**
     * 添加
     */
    @RequestMapping("/insert")
    @ResponseBody
    public Object insert(Gxcontrol gxcontrol) {
        int i = gxcontrolService.insert(gxcontrol);
        return i;
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @ResponseBody
    public Object delete(String id) {
        int i = gxcontrolService.delete(id);
        return i;
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @ResponseBody
    public AjaxResult update(String width,String gid,String color,String iocn) {

        return AjaxResult.success(gxcontrolService.update(width,gid,color,iocn));

    }

}
