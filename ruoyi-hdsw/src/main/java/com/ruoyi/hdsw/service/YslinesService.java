package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.model.Yslines;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface YslinesService {
    Object insert(Gxmodel record);
    Object update(Gxmodel record);
    Object delete(String[] pipeid);
    Object selectByGxbh(String gxbh);
    Object interruptLine(String gxbh,String gdbh);
    Object updateState(String pipeid,String delState,String updState);
    Object getMaxNum();
    Object selectByState(String delState,String updState);
    List<Gxmodel> spoint(String spoint);
    List<Gxmodel> epoint(String epoint);
}
