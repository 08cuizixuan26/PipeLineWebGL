package com.ruoyi.hdsw.controller;

import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.hdsw.mapper.YslinesMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.model.Yslines;
import com.ruoyi.hdsw.service.YslinesService;
import com.ruoyi.hdsw.service.YspointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/hdsw/ysline")
public class YslinesController {
    @Autowired
    private YslinesService yslinesService;
    @Autowired
    private YspointsService yspointsService;
    /**
     * 插入
     **/
    @PostMapping("/insert")
    @ResponseBody
    public AjaxResult insert(@RequestBody Gxmodel record) {
        try {
            return AjaxResult.success(yslinesService.insert(record));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 更新
     **/
    @PostMapping("/update")
    @ResponseBody
    public AjaxResult update(@RequestBody Gxmodel record) {
        try {
            return AjaxResult.success(yslinesService.update(record));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 删除
     **/
    @PostMapping("/delete")
    public AjaxResult delete(@RequestParam(value = "ids[]") Integer[] ids) {
        try {
            return AjaxResult.success(yslinesService.delete(ids));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 在线中间插入点
     **/
    @PostMapping("/interruptLine")
    @ResponseBody
    public AjaxResult interruptLine(@RequestParam(value = "gxbh") String gxbh,@RequestParam(value = "gdbh") String gdbh) {
        try {
            return AjaxResult.success(yslinesService.interruptLine(gxbh,gdbh));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }
}
