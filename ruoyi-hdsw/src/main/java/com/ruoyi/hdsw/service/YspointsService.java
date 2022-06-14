package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Yspoints;

public interface YspointsService {
    Object insert(Yspoints record);
    Object update(Yspoints record);
    Object delete(Integer[] ids);
}
