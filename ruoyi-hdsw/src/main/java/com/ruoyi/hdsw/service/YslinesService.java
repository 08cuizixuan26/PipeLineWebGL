package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.model.Yslines;

public interface YslinesService {
    Object insert(Gxmodel record);
    Object update(Gxmodel record);
    Object delete(Integer[] ids);
}
