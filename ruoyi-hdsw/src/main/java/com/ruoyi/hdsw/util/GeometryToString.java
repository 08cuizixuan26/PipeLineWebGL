package com.ruoyi.hdsw.util;

import java.util.Map;

public class GeometryToString {
    public static String pointToString(String lon,String lat){
        return "POINT("+lon+" " +lat+ ")";
    }

    /**
     *
     * @param pointMap
     * @return multilinestring ((10.02 20.01, 10.32 23.98,
    11.92 25.64), (9.55 23.75, 15.36 30.11))'
     */
    public static String lineToString(Map<String[],String[]> pointMap){
        String lineGeo = "multilinestring(";
        for(Map.Entry<String[], String[]> entry : pointMap.entrySet()){
            String[] mapKey = entry.getKey();
            String[] mapValue = entry.getValue();
            System.out.println(mapKey+":"+mapValue);
            lineGeo += "(" +mapKey[0]+ " "+ mapKey[1]+","+mapValue[0]+ " "+ mapValue[1]+")" + ",";
        }
        lineGeo = lineGeo.substring(0,lineGeo.length()-1);
        lineGeo +=")";
        return lineGeo;
    }
}
