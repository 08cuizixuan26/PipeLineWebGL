package com.ruoyi.hdsw.controller;

import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.hdsw.mapper.YspointsMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Yspoints;
import com.ruoyi.hdsw.service.YspointsService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/hdsw/yspoint")
public class YspointsController {
    @Autowired
    private YspointsService yspointsService;
    /**
     * 插入
     **/
    @PostMapping("/insert")
    @ResponseBody
    public AjaxResult insert(@RequestBody Gdmodel record) {
        try {
            return AjaxResult.success(yspointsService.insert(record));
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
    public AjaxResult update(@RequestBody Gdmodel record) {
        try {
            return AjaxResult.success(yspointsService.update(record));
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
            return AjaxResult.success(yspointsService.delete(ids));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }
    /**
     * 获取最大编号
     **/
    @GetMapping("/getMaxnum")
    public AjaxResult getMaxnum() {
        try {
            return AjaxResult.success(yspointsService.getMaxNum());
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }
    /**
     * 查询未更新
     **/
    @GetMapping("/selectByState")
    public AjaxResult selectByState(String delState, String updState) {
        try {
            return AjaxResult.success(yspointsService.selectByState(delState,updState));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }
    /**
     * 更新update状态
     **/
    @PostMapping("/batchUpdate")
    public AjaxResult batchUpdate(@RequestParam(value = "updState") String updState) {
        try {
            if (ObjectUtils.isNotEmpty(updState)) {
                return AjaxResult.success(yspointsService.batchUpdateState(updState));
            } else {
                return AjaxResult.error("所传参数为空");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }
}
