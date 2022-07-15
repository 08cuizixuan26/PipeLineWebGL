/**
 * Copyright (C), 2015-2018, XXX有限公司
 * FileName: ExcelUtils
 * Author:   18142
 * Date:     2018/5/21 17:44
 * Description: excel工具
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.ruoyi.hdsw.util;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 〈excel工具〉
 *
 * @author 陈成湖
 * @create 2018/5/21
 * @since 1.0.0
 */
public class ExcelUtils {


    //private static Logger logger = Logger.getLogger(ExcelUtils.class);

    private static String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};

    private static HSSFWorkbook workbook = null;

    public static HSSFWorkbook createHSSFWorkbook(String path) {
        HSSFWorkbook book = null;
        try {
            FileInputStream file = new FileInputStream(path);
            BufferedInputStream bis = new BufferedInputStream(file);
            POIFSFileSystem pfs = new POIFSFileSystem(bis);
            book = new HSSFWorkbook(pfs);
            workbook = book;
        } catch (Exception e) {
            //logger.error("获取excel模板失败:" + e.getMessage());
            e.printStackTrace();
        } finally {
            return book;
        }
    }

    //发送响应流方法
    public static void setResponseHeader(HttpServletResponse response, String fileName) {
        try {
            try {
                fileName = new String(fileName.getBytes(), "ISO8859-1");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            response.setContentType("application/octet-stream;charset=ISO8859-1");
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //数据填充，
    public static void updateSheetData(HSSFSheet sheet, Map<String, Object> map, String dateTime) {
        //日期
        Calendar cal = Calendar.getInstance();
        String[] time = dateTime.split("-");
        int year = 0, month = 0, date = 0;
        if (time.length == 3) {
            year = Integer.parseInt(time[0]);
            month = Integer.parseInt(time[1]);
            year = Integer.parseInt(time[2]);
        } else if (dateTime.length() == 8) {
            year = Integer.parseInt(dateTime.substring(0, 4));
            month = Integer.parseInt(dateTime.substring(4, 6));
            date = Integer.parseInt(dateTime.substring(6, 8));
        } else {
            return;
        }
        cal.set(year, month - 1, date);
        int y = cal.get(Calendar.YEAR);
        int m = cal.get(Calendar.MONTH) + 1;
        int d = cal.get(Calendar.DATE);

        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) w = 0;
        String week = weekDays[w];
        String dataTime = y + "年" + m + "月" + d + "日（" + week + ")";
        sheet.getRow(1).getCell(0).setCellValue(dataTime);
        //天气
        Map<String, Object> weather = (Map<String, Object>) map.get("weather");

        sheet.getRow(1).getCell(10).setCellValue("天气：" + weather.get("weather"));
        sheet.getRow(1).getCell(12).setCellValue(weather.get("minimum") + "°C/" + weather.get("highest") + "°C");

        //九个水厂
        Object nineWater = map.get("nineWaterWorks");
        if (nineWater != null) {
            List<Map<String, Object>> list = (List<Map<String, Object>>) nineWater;
            for (int i = 0; i < 9; i++) {
                Map<String, Object> nineMap = list.get(i);
                HSSFRow row = sheet.getRow(4 + i);
                row.getCell(2).setCellValue(nineMap.get("TotalProduction").toString());
                row.getCell(3).setCellValue(nineMap.get("houseWater").toString());
                row.getCell(4).setCellValue(nineMap.get("firstWater").toString());
                row.getCell(5).setCellValue(nineMap.get("maxPressure").toString());
                row.getCell(7).setCellValue(nineMap.get("minPressure").toString());
            }
        }
        //小计
        String smallTotal = map.get("smallTotal").toString();
        sheet.getRow(13).getCell(2).setCellValue(smallTotal);
        //呼钢水厂
        Map<String, Object> callSteelWorks = (Map<String, Object>) map.get("callSteelWorks");
        sheet.getRow(14).getCell(2).setCellValue(callSteelWorks.get("TotalProduction").toString());
        sheet.getRow(14).getCell(3).setCellValue(callSteelWorks.get("houseWater").toString());
        sheet.getRow(14).getCell(4).setCellValue(callSteelWorks.get("firstWater").toString());
        sheet.getRow(14).getCell(5).setCellValue(callSteelWorks.get("maxPressure").toString());
        sheet.getRow(14).getCell(7).setCellValue(callSteelWorks.get("minPressure").toString());
        //地下水厂
        String undergroundWaterTotal = map.get("undergroundWaterTotal").toString();
        sheet.getRow(15).getCell(2).setCellValue(undergroundWaterTotal);
        //金河水厂
        Map<String, Object> JinheWater = (Map<String, Object>) map.get("JinheWater");
        //市区
        Map<String, Object> shiqu = (Map<String, Object>) JinheWater.get("shiqu");
        sheet.getRow(17).getCell(2).setCellValue(shiqu.get("TotalProduction").toString());
        sheet.getRow(17).getCell(3).setCellValue(shiqu.get("onePhase").toString());
        sheet.getRow(17).getCell(4).setCellValue(shiqu.get("twoPhase").toString());
        sheet.getRow(17).getCell(6).setCellValue(shiqu.get("maxPressure").toString());
        sheet.getRow(17).getCell(8).setCellValue(shiqu.get("minPressure").toString());
        //石化
        Map<String, Object> shihua = (Map<String, Object>) JinheWater.get("shihua");
        sheet.getRow(18).getCell(2).setCellValue(shihua.get("TotalProduction").toString());
        sheet.getRow(18).getCell(3).setCellValue(shihua.get("onePhase").toString());
        sheet.getRow(18).getCell(4).setCellValue(shihua.get("twoPhase").toString());
        sheet.getRow(18).getCell(6).setCellValue(shihua.get("maxPressure").toString());
        sheet.getRow(18).getCell(8).setCellValue(shihua.get("minPressure").toString());
        //小计
        Map<String, Object> xiaoji = (Map<String, Object>) JinheWater.get("smallTotal");
        sheet.getRow(19).getCell(2).setCellValue(xiaoji.get("TotalProduction").toString());
        sheet.getRow(19).getCell(3).setCellValue(xiaoji.get("onePhase").toString());
        sheet.getRow(19).getCell(4).setCellValue(xiaoji.get("twoPhase").toString());
        //总计
        sheet.getRow(20).getCell(2).setCellValue(map.get("allTotal").toString());
        //巴彦站
        Map<String, Object> bayan = (Map<String, Object>) map.get("bayan");
        sheet.getRow(21).getCell(2).setCellValue(bayan.get("TotalProduction").toString());
        sheet.getRow(21).getCell(4).setCellValue(bayan.get("single").toString());
        sheet.getRow(21).getCell(5).setCellValue(bayan.get("maxPressure").toString());
        sheet.getRow(21).getCell(7).setCellValue(bayan.get("minPressure").toString());
        //兴安站
        Map<String, Object> xingan = (Map<String, Object>) map.get("xingan");
        sheet.getRow(22).getCell(2).setCellValue(xingan.get("TotalProduction").toString());
        sheet.getRow(22).getCell(4).setCellValue(xingan.get("single").toString());
        sheet.getRow(22).getCell(5).setCellValue(xingan.get("maxPressure").toString());
        sheet.getRow(22).getCell(7).setCellValue(xingan.get("minPressure").toString());
        //预沉厂
        Map<String, Object> preSinkingPlant = (Map<String, Object>) map.get("preSinkingPlant");
        sheet.getRow(4).getCell(12).setCellValue(preSinkingPlant.get("waterIntake").toString());
        sheet.getRow(4).getCell(13).setCellValue(preSinkingPlant.get("waterLevel").toString());
        //托县春花水厂供水量
        sheet.getRow(8).getCell(12).setCellValue(map.get("chunhuaWater").toString());
        //金海水库
        Map<String, Object> jinhai = (Map<String, Object>) map.get("jinhai");
        sheet.getRow(14).getCell(11).setCellValue(jinhai.get("waterLevel").toString());
        sheet.getRow(14).getCell(12).setCellValue(jinhai.get("totalCapacity").toString());
        sheet.getRow(14).getCell(13).setCellValue(jinhai.get("effectiveCapacity").toString());
        sheet.getRow(16).getCell(12).setCellValue(jinhai.get("potassiumInstant").toString());
        sheet.getRow(16).getCell(13).setCellValue(jinhai.get("potassiumDay").toString());
        sheet.getRow(17).getCell(12).setCellValue(jinhai.get("carbonInstant").toString());
        sheet.getRow(17).getCell(13).setCellValue(jinhai.get("carbonDay").toString());
        //大青山
        Map<String, Object> lushMountain = (Map<String, Object>) map.get("lushMountain");
        sheet.getRow(21).getCell(11).setCellValue(lushMountain.get("waterSupply").toString());
        sheet.getRow(21).getCell(13).setCellValue(lushMountain.get("electricity").toString());
        //备注
        sheet.getRow(24).getCell(0).setCellValue("注：" + map.get("remark").toString());
        //用户信息
        Map<String, Object> userMap = (Map<String, Object>) map.get("user");
        String createUser = userMap.get("createUser").toString();
        String director = userMap.get("director").toString();
        String dispatch = userMap.get("dispatch").toString();
        sheet.getRow(25).getCell(3).setCellValue(createUser);
        sheet.getRow(25).getCell(7).setCellValue(director);
        sheet.getRow(25).getCell(12).setCellValue(dispatch);
    }

    public static void updateSheetDataDay(HSSFSheet sheet, Map<String, Object> map, String dateTime) {
        //日期
        Calendar cal = Calendar.getInstance();
        String[] time = dateTime.split("-");
        int year = 0, month = 0, date = 0;
        if (time.length == 3) {
            year = Integer.parseInt(time[0]);
            month = Integer.parseInt(time[1]);
            date = Integer.parseInt(time[2]);
        } else if (dateTime.length() == 8) {
            year = Integer.parseInt(dateTime.substring(0, 4));
            month = Integer.parseInt(dateTime.substring(4, 6));
            date = Integer.parseInt(dateTime.substring(6, 8));
        } else {
            return;
        }
        cal.set(year, month - 1, date);
        int y = cal.get(Calendar.YEAR);
        int m = cal.get(Calendar.MONTH) + 1;
        int d = cal.get(Calendar.DATE);

        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) w = 0;
        String week = weekDays[w];
        String dataTime = y + "年" + m + "月" + d + "日（" + week + ")";
        sheet.getRow(1).getCell(0).setCellValue(dataTime);
        //天气
        Map<String, Object> weather = (Map<String, Object>) map.get("weather");

        sheet.getRow(1).getCell(13).setCellValue("天气：" + weather.get("weather") + "    " + weather.get("minimum") + "°C/" + weather.get("highest") + "°C");
        //九个水厂
        Object nineWater = map.get("nineWaterWorks");
        if (nineWater != null) {
            List<Map<String, Object>> list = (List<Map<String, Object>>) nineWater;
            for (int i = 0; i < 9; i++) {
                Map<String, Object> nineMap = list.get(i);
                HSSFRow row = sheet.getRow(4 + i);
                row.getCell(3).setCellValue(nineMap.get("TotalProduction").toString());
                row.getCell(4).setCellValue(nineMap.get("houseWater").toString());
                row.getCell(5).setCellValue(nineMap.get("firstWater").toString());
                row.getCell(8).setCellValue(nineMap.get("maxPressure").toString());
                row.getCell(10).setCellValue(nineMap.get("minPressure").toString());
            }
        }
        //小计
        String smallTotal = map.get("smallTotal").toString();
        sheet.getRow(13).getCell(3).setCellValue(smallTotal);
        //呼钢水厂
        Map<String, Object> callSteelWorks = (Map<String, Object>) map.get("callSteelWorks");
        sheet.getRow(14).getCell(3).setCellValue(callSteelWorks.get("TotalProduction").toString());
        sheet.getRow(14).getCell(4).setCellValue(callSteelWorks.get("houseWater").toString());
        sheet.getRow(14).getCell(5).setCellValue(callSteelWorks.get("firstWater").toString());
        sheet.getRow(14).getCell(8).setCellValue(callSteelWorks.get("maxPressure").toString());
        sheet.getRow(14).getCell(10).setCellValue(callSteelWorks.get("minPressure").toString());
        /*城市补压和甲兰板*/
        sheet.getRow(15).getCell(3).setCellValue(map.get("totleSanShuise").toString());
        sheet.getRow(15).getCell(8).setCellValue(map.get("factory_pressure_max").toString());
        sheet.getRow(15).getCell(10).setCellValue(map.get("factory_pressure_min").toString());
//        sheet.getRow(16).getCell(3).setCellValue(map.get("chengshiWater").toString());
        //地下水厂合计
        String undergroundWaterTotal = map.get("undergroundWaterTotal").toString();
        sheet.getRow(16).getCell(3).setCellValue(undergroundWaterTotal);
        //金河水厂
        Map<String, Object> JinheWater = (Map<String, Object>) map.get("JinheWater");
        //市区
        Map<String, Object> shiqu = (Map<String, Object>) JinheWater.get("shiqu");
        Map<String, Object> jinshuiyi = (Map<String, Object>) JinheWater.get("jinshui");
        sheet.getRow(18).getCell(3).setCellValue(shiqu.get("TotalProduction").toString());
        sheet.getRow(18).getCell(4).setCellValue(shiqu.get("onePhase").toString());
        sheet.getRow(19).getCell(4).setCellValue(shiqu.get("twoPhase").toString());
        sheet.getRow(18).getCell(7).setCellValue(jinshuiyi.get("inletYiQi").toString());
        sheet.getRow(18).getCell(9).setCellValue(shiqu.get("maxPressure").toString());
        sheet.getRow(18).getCell(11).setCellValue(shiqu.get("minPressure").toString());
        //石化
        Map<String, Object> shihua = (Map<String, Object>) JinheWater.get("shihua");
        Map<String, Object> jinshuier = (Map<String, Object>) JinheWater.get("jinshui");
        sheet.getRow(19).getCell(3).setCellValue(shihua.get("TotalProduction").toString());
        sheet.getRow(18).getCell(5).setCellValue(shihua.get("onePhase").toString());
        sheet.getRow(19).getCell(5).setCellValue(shihua.get("twoPhase").toString());
        sheet.getRow(19).getCell(7).setCellValue(jinshuier.get("inletErQi").toString());
        sheet.getRow(19).getCell(9).setCellValue(shihua.get("maxPressure").toString());
        sheet.getRow(19).getCell(11).setCellValue(shihua.get("minPressure").toString());
        //小计
        Map<String, Object> xiaoji = (Map<String, Object>) map.get("smallTotalMap");
        sheet.getRow(20).getCell(3).setCellValue(xiaoji.get("TotalProduction").toString());
        sheet.getRow(20).getCell(4).setCellValue(xiaoji.get("TotalProductionShiqu").toString());
        sheet.getRow(20).getCell(5).setCellValue(xiaoji.get("TotalProductionShiHua").toString());
        sheet.getRow(20).getCell(7).setCellValue(xiaoji.get("TotalProductionJinshui").toString());
        //总计
        sheet.getRow(21).getCell(3).setCellValue(map.get("diBiaoTotal").toString());
        //巴彦站
        Map<String, Object> bayan = (Map<String, Object>) map.get("bayan");
        sheet.getRow(19).getCell(14).setCellValue(bayan.get("TotalProduction").toString());
        sheet.getRow(19).getCell(15).setCellValue(bayan.get("single").toString());
        sheet.getRow(19).getCell(16).setCellValue(bayan.get("maxPressure").toString());
        sheet.getRow(19).getCell(17).setCellValue(bayan.get("minPressure").toString());
        //兴安站
        Map<String, Object> xingan = (Map<String, Object>) map.get("xingan");
        sheet.getRow(20).getCell(14).setCellValue(xingan.get("TotalProduction").toString());
        sheet.getRow(20).getCell(15).setCellValue(xingan.get("single").toString());
        sheet.getRow(20).getCell(16).setCellValue(xingan.get("maxPressure").toString());
        sheet.getRow(20).getCell(17).setCellValue(xingan.get("minPressure").toString());
        //预沉厂
        Map<String, Object> preSinkingPlant = (Map<String, Object>) map.get("preSinkingPlant");
        sheet.getRow(4).getCell(15).setCellValue(preSinkingPlant.get("waterIntake").toString());
        sheet.getRow(4).getCell(17).setCellValue(preSinkingPlant.get("waterLevel").toString());
        //托县春花水厂供水量
        sheet.getRow(7).getCell(16).setCellValue(map.get("chunhuaWater").toString());
        //金海水库
        Map<String, Object> jinhai = (Map<String, Object>) map.get("jinhai");
        sheet.getRow(12).getCell(14).setCellValue(jinhai.get("waterLevel").toString());
        sheet.getRow(12).getCell(16).setCellValue(jinhai.get("totalCapacity").toString());
        sheet.getRow(12).getCell(17).setCellValue(jinhai.get("effectiveCapacity").toString());
        sheet.getRow(14).getCell(15).setCellValue(jinhai.get("potassiumInstant").toString());
        sheet.getRow(14).getCell(16).setCellValue(jinhai.get("potassiumDay").toString());
        sheet.getRow(15).getCell(15).setCellValue(jinhai.get("carbonInstant").toString());
        sheet.getRow(15).getCell(16).setCellValue(jinhai.get("carbonDay").toString());
        //大青山
        Map<String, Object> lushMountain = (Map<String, Object>) map.get("lushMountain");
        sheet.getRow(22).getCell(15).setCellValue(lushMountain.get("waterSupply").toString());
        sheet.getRow(22).getCell(17).setCellValue(lushMountain.get("electricity").toString());
        //日总产量
        sheet.getRow(22).getCell(3).setCellValue(map.get("allTotal").toString());
        sheet.getRow(25).getCell(0).setCellValue(map.get("chengshiWaterse").toString());
//        sheet.getRow(25).getCell(1).setCellValue(map.get("yinJiWaterse").toString());
        //用户信息
        Map<String, Object> userMap = (Map<String, Object>) map.get("user");
        String createUser = userMap.get("createUser").toString();
        String director = userMap.get("director").toString();
        String dispatch = userMap.get("dispatch").toString();
        sheet.getRow(27).getCell(4).setCellValue(createUser);
        sheet.getRow(27).getCell(10).setCellValue(director);
        sheet.getRow(27).getCell(15).setCellValue(dispatch);
    }

    //判断cell所属数据格式转换为字符串
    public static String getCellValue(Cell cell) {
        String cellStrData = null;
        FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
        if (null == cell) {
            return null;
        } else {
            switch (cell.getCellType()) {
                case HSSFCell.CELL_TYPE_NUMERIC: // 日期或者数字
                    if (cell.getCellStyle().getDataFormat() == 57) {
                        // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
                        double value = cell.getNumericCellValue();
                        Date date = DateUtil
                                .getJavaDate(value);
                        cellStrData = sdf.format(date);
                    } else {
                        // 数字的处理
                        Double cellData = cell.getNumericCellValue();
                        cellStrData = String.valueOf(cellData);
                    }
                    break;
                case HSSFCell.CELL_TYPE_STRING: // 字符串(删除所有空白字符)
                    cellStrData = cell.getStringCellValue().replaceAll("\\s*", "");
                    break;
                case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
                    cellStrData = String.valueOf(cell.getBooleanCellValue());
                    break;
                case HSSFCell.CELL_TYPE_FORMULA: // 公式
                    System.out.println(cell.getCellFormula());
                    evaluator.evaluateFormulaCell(cell);
                    DecimalFormat df = new DecimalFormat("#0.0000");
                    System.out.println(cell.getNumericCellValue());
                    cellStrData = String.valueOf(df.format(cell.getNumericCellValue()));
                    break;
                case HSSFCell.CELL_TYPE_BLANK: // 空值
                    break;
                case HSSFCell.CELL_TYPE_ERROR: // 故障
                    break;
                default:
                    break;
            }
        }
        return cellStrData;
    }

    //返回字符在字符串中第N次出现时的位置
    public static int getIndex(String ac, String str, int ind) {
        Pattern pattern = Pattern.compile(ac);
        Matcher findMatcher = pattern.matcher(str);
        int number = 0;
        while (findMatcher.find()) {
            number++;
            if (number == ind) {
                break;
            }
        }
        int i = findMatcher.start();
        return i;
    }
}