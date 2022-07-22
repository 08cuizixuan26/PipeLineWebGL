package com.ruoyi.hdsw.controller;

import com.baomidou.mybatisplus.core.toolkit.ClassUtils;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.service.*;
import com.ruoyi.hdsw.util.ExcelException;
import com.ruoyi.hdsw.util.ExcelUtils;
import com.ruoyi.hdsw.util.GetProperty;
import com.ruoyi.hdsw.util.POIExcelUtil;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("/hdsw/excel")
public class ExcelController {
    @Autowired
    private GetProperty property;
    @Autowired
    private GslineService gslineService;
    @Autowired
    private GspointService gspointService;
    @Autowired
    private WslinesService wslinesService;
    @Autowired
    private WspointsService wspointsService;
    @Autowired
    private YslinesService yslinesService;
    @Autowired
    private YspointsService yspointsService;
    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void downloadExcelByName(String type, HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            String path = "";
            String urlPath = ClassUtils.getDefaultClassLoader().getResource("static/file").getPath().replaceAll("%20","");//解决路径中含有空格的情况
            urlPath = java.net.URLDecoder.decode(urlPath,"utf-8"); //解决路径包含中文的情况
            String fileName = "point.xls";
            if(type.equals("0")){
                path = urlPath + "/point.xls";
                fileName = "point.xls";
            }else if(type.equals("1")){
                path = urlPath + "/line.xls";
                fileName = "line.xls";
            }

            HSSFWorkbook hssfWorkbook = ExcelUtils.createHSSFWorkbook(path);
            if (hssfWorkbook != null) {
                //获取第一个sheet
                HSSFSheet sheet = hssfWorkbook.getSheetAt(0);
                ExcelUtils.setResponseHeader(response, fileName);
                OutputStream os = response.getOutputStream();
                hssfWorkbook.write(os);
                os.flush();
                ;
                os.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/readPoint", method = RequestMethod.POST)
    public AjaxResult readPoint(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException, ExcelException, ParseException {
        byte [] byteArr=file.getBytes();
        InputStream in = new ByteArrayInputStream(byteArr);
        LinkedHashMap<String, String> map = new LinkedHashMap();
        map.put("expNo", "expNo");
        map.put("feature", "feature");
        map.put("subsid", "subsid");
        map.put("elevation", "elevation");
        map.put("sureH", "sureH");
        map.put("botDepth", "botDepth");
        map.put("covType", "covType");
        map.put("covDn", "covDn");
        map.put("covMeat", "covMeat");
        map.put("wchaMeat", "wchaMeat");
        map.put("wchaType", "wchaType");
        map.put("foDeep", "foDeep");
        map.put("wchaDn", "wchaDn");
        map.put("bTime", "bTime");
        map.put("offcNo", "offcNo");
        map.put("rotation", "rotation");
        map.put("x", "x");
        map.put("y", "y");
        map.put("owner", "owner");
        map.put("road", "road");
        map.put("geom", "geom");
        map.put("delState", "delState");
        map.put("updState", "updState");
        map.put("type", "type");
        String[] uniqueFields = {"expNo","feature","subsid","elevation","sureH","botDepth","covType","covDn","covMeat",
                "wchaMeat","wchaType","foDeep","wchaDn","bTime","offcNo","rotation","x","y","owner","road","geom",
                "delState","updState","type"};
        List<Gdmodel> gdmodels = POIExcelUtil.excelToList(in, 0, Gdmodel.class, map, uniqueFields);
        String type="";
        for(Gdmodel gdmodel : gdmodels){
            type = gdmodel.getType().toString().trim();
            if(type.equals("给水")){
                int max = (int) gspointService.getMaxNum() + 1;
                gdmodel.setExpNo("GSP" + max);
                gspointService.insert(gdmodel);
            }else if(type.equals("污水")){
                int max = (int) wspointsService.getMaxNum() + 1;
                gdmodel.setExpNo("WSP" + max);
                wspointsService.insert(gdmodel);
            }else if(type.equals("雨水")){
                int max = (int) yspointsService.getMaxNum() + 1;
                gdmodel.setExpNo("YSP" + max);
                yspointsService.insert(gdmodel);
            }
        }
        return AjaxResult.success("操作成功",type);
    }
    @RequestMapping(value = "/readLine", method = RequestMethod.POST)
    public Object readLine(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException, ExcelException, ParseException {
        byte [] byteArr=file.getBytes();
        InputStream in = new ByteArrayInputStream(byteArr);
        LinkedHashMap<String, String> map = new LinkedHashMap();
        map.put("shapeLeng", "shapeLeng");
        map.put("pipeid", "pipeid");
        map.put("sPoint", "sPoint");
        map.put("ePoint", "ePoint");
        map.put("sDeep", "sDeep");
        map.put("eDeep", "eDeep");
        map.put("material", "material");
        map.put("dType", "dType");
        map.put("dS", "dS");
        map.put("flowdirect", "flowdirect");
        map.put("sHeight", "sHeight");
        map.put("eHeight", "eHeight");
        map.put("bTime", "bTime");
        map.put("state", "state");
        map.put("type", "type");
        map.put("road", "road");
        map.put("owner", "owner");
        map.put("geom", "geom");
        map.put("style", "style");
        map.put("delState", "delState");
        map.put("updState", "updState");
        String[] uniqueFields = {"shapeLeng","pipeid","sPoint","ePoint","sDeep","eDeep","material",
                "dType","dS","flowdirect","sHeight","eHeight","bTime","state","type","road","owner","geom","style","delState","updState"};
        List<Gxmodel> gxmodels = POIExcelUtil.excelToList(in, 0, Gxmodel.class, map, uniqueFields);
        String type="";
        for(Gxmodel gxmodel : gxmodels){
            type=gxmodel.getType().toString();
            if(type.equals("给水")){
                int max = (int) gslineService.getMaxNum() + 1;
                gxmodel.setPipeid("GSL" + max);
                gslineService.insert(gxmodel);
            }else if(type.equals("污水")){
                int max = (int) gslineService.getMaxNum() + 1;
                gxmodel.setPipeid("WSL" + max);
                wslinesService.insert(gxmodel);
            }else if(type.equals("雨水")){
                int max = (int) gslineService.getMaxNum() + 1;
                gxmodel.setPipeid("YSL" + max);
                yslinesService.insert(gxmodel);
            }
        }
        return AjaxResult.success("操作成功",type);
    }

}
