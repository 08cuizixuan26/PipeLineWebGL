package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Yslines;

public interface YslinesService {
    Object insert(Yslines record);
    Object update(Yslines record);
    Object delete(Integer[] ids);
}
