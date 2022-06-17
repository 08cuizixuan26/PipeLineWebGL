package com.ruoyi.hdsw.controller;

import com.ruoyi.common.utils.uuid.IdUtils;
import com.ruoyi.hdsw.model.Gxtype;
import com.ruoyi.hdsw.service.impl.GxtypeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/hdsw/gxtype")
public class GxtypeController {
    @Autowired
    private GxtypeServiceImpl gxtypeService;

    /**
     * 查找
     */
    @RequestMapping("/select")
    @ResponseBody
    public Object select() {
        List<Gxtype> select = gxtypeService.select();
        return select;
    }

    /**
     * 添加
     */
    @RequestMapping("/insert")
    @ResponseBody
    public Object insert(String id, String name) {
        id = IdUtils.fastSimpleUUID();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(date);
        int i = gxtypeService.insert(id, name, time);
        return i;
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @ResponseBody
    public Object delete(String id) {
        int i = gxtypeService.delete(id);
        return i;
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @ResponseBody
    public Object update(String id, String name) {
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(date);
        return gxtypeService.update(id, name, time);
    }

}
