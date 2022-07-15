package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gxcontrol;

import java.util.List;

public interface GxcontrolService {
    int insert(Gxcontrol gxcontrol);
    List<Gxcontrol> select();
    int update(String width,String gid,String color,String iocn);
    int delete(String id);
}
