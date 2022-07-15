package com.ruoyi.hdsw.controller;

import com.alibaba.fastjson.JSON;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.hdsw.mapper.YslinesMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.model.Yslines;
import com.ruoyi.hdsw.service.YslinesService;
import com.ruoyi.hdsw.service.YspointsService;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

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
            String guandian = record.getGuandian();
            Gxmodel gxmodel1 = new Gxmodel();
            gxmodel1.setGeom(record.getGeom());
            gxmodel1.setGuandian(record.getGuandian());
            List<Gxmodel> spoint = yslinesService.spoint(guandian);
            for (Gxmodel gxmodel : spoint) {
                gxmodel1.setPipeid(gxmodel.getPipeid());
                String s = JSON.toJSONString(gxmodel.getGeom());
                int null1 = s.lastIndexOf("(");
                int null2 = s.indexOf(")");
                String ssa = s.substring(null1 + 1, null2);
                int i = ssa.indexOf(",");
                String substring = ssa.substring(0, i);
                String substring1 = ssa.substring(i + 1);
                String geom1 = gxmodel1.getGeom().toString();
                StringBuffer stringBuilder1 = new StringBuffer(geom1);
                int null3 = geom1.lastIndexOf(")");
                StringBuffer insert = stringBuilder1.insert(null3 - 1, "," + substring1);
                String qi = insert.toString();
                gxmodel1.setGeom(qi);
                yslinesService.update(gxmodel1);
            }
            Gxmodel gxmodel2 = new Gxmodel();

            gxmodel2.setGeom(record.getGeom());
            gxmodel2.setGuandian(record.getGuandian());
            List<Gxmodel> epoint = yslinesService.epoint(guandian);
            for (Gxmodel epoint1 : epoint) {
                gxmodel2.setPipeid(epoint1.getPipeid());
                String s = JSON.toJSONString(epoint1.getGeom());
                int null1 = s.lastIndexOf("(");
                int null2 = s.indexOf(")");
                String ssa = s.substring(null1 + 1, null2);
                int i = ssa.indexOf(",");
                String substring = ssa.substring(0, i);
                String substring1 = ssa.substring(i + 1);
                String geom1 = gxmodel2.getGeom().toString();
                StringBuffer stringBuilder1 = new StringBuffer(geom1);
                int null3 = geom1.lastIndexOf("(");
                StringBuffer insert = stringBuilder1.insert(null3 + 1, substring + ",");
                String zong = insert.toString();
                gxmodel2.setGeom(zong);
                yslinesService.update(gxmodel2);
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 删除
     **/
    @PostMapping("/delete")
    public AjaxResult delete(@RequestParam(value = "pipeid[]") String[] pipeid) {
        try {
            return AjaxResult.success(yslinesService.delete(pipeid));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 废弃
     **/
    @PostMapping("/disCard")
    public AjaxResult disCard(@RequestParam(value = "pipeid[]") String[] pipeid) {
        try {
            if (ObjectUtils.isNotEmpty(pipeid)) {
                return AjaxResult.success(yslinesService.disCard(pipeid));
            } else {
                return AjaxResult.error("所传参数为空");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 恢复
     **/
    @PostMapping("/recover")
    public AjaxResult recover(@RequestParam(value = "pipeid[]") String[] pipeid) {
        try {
            if (ObjectUtils.isNotEmpty(pipeid)) {
                return AjaxResult.success(yslinesService.recover(pipeid));
            } else {
                return AjaxResult.error("所传参数为空");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }

    /**
     * 在线中间插入点
     **/
    @PostMapping("/interruptLine")
    public AjaxResult interruptLine(@RequestParam(value = "gxbh") String gxbh, @RequestParam(value = "gdbh") String gdbh) {
        try {
            return AjaxResult.success(yslinesService.interruptLine(gxbh, gdbh));
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
            return AjaxResult.success(yslinesService.getMaxNum());
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
            return AjaxResult.success(yslinesService.selectByState(delState, updState));
        } catch (Exception e) {
            e.printStackTrace();
            return AjaxResult.error(e.getMessage());
        }
    }
}
