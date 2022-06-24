package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gxmodel;

public interface GslineService {
    Object insert(Gxmodel record);
    Object update(Gxmodel record);
    Object delete(Integer[] ids);
    Object selectByGxbh(String gxbh);
    Object interruptLine(String gxbh,String gdbh);
    Object updateState(Integer gid,String delState,String updState);
    Object getMaxNum();
}
