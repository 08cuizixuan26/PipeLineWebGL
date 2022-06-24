package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Yspoints;

public interface YspointsService {
    Object insert(Gdmodel record);
    Object update(Gdmodel record);
    Object delete(Integer[] ids);
    Object selectByGdbh(String gdbh);
    Object updateState(Integer gid,String delState,String updState);
    Object getMaxNum();
}
