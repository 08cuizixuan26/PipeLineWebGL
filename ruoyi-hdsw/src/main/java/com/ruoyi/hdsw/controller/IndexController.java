package com.ruoyi.hdsw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping("/hdsw")
    public String hdsw() {
        return "hdsw";
    }
}
