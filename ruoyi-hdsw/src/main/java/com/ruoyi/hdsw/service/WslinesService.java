package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.model.Wslines;

public interface WslinesService {
    Object insert(Gxmodel record);
    Object update(Gxmodel record);
    Object delete(Integer[] ids);
    Object selectByGxbh(String gxbh);
    Object interruptLine(String gxbh,String gdbh);
    Object updateState(Integer gid,String delState,String updState);
    Object getMaxNum();
    Object selectByState(String delState,String updState);
}
