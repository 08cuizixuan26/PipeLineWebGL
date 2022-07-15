package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gxmodel;

import java.util.List;

public interface WslinesService {
    Object insert(Gxmodel record);

    Object update(Gxmodel record);

    Object delete(String[] pipeid);

    Object disCard(String[] pipeid);

    Object recover(String[] pipeid);

    Object selectByGxbh(String gxbh);

    Object interruptLine(String gxbh, String gdbh);

    Object updateState(String gid, String delState, String updState);

    Object getMaxNum();

    Object selectByState(String delState, String updState);

    List<Gxmodel> spoint(String spoint);

    List<Gxmodel> epoint(String epoint);

    /**
     * 根据管线编号或道路获取管线数据
     * @param pipeid 管线编号
     * @param road 道路
     * @return List<Gxmodel>
     */
    List<Gxmodel> selectDiscardLines(String pipeid, String road);
}
