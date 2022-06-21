package com.ruoyi.hdsw.controller;

import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.hdsw.model.Gspoint;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 页面跳转
 */
@RequestMapping(value = "/get/tiaozhuan")
@Controller
public class PageTturnsController {
    /*
     * 管线数据添加 跳转
     */
    @RequestMapping("/gxsjzj")
    public String  gxsjzj() {
        return "hdGis/gxsjzj";
    }
    @RequestMapping("/gxsjUpdate")
    public String  gxsjUpdate() {
        return "hdGis/gxsjUpdate";
    }

}
