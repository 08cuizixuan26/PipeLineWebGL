package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Wspoints;

public interface WspointsService {
    Object insert(Wspoints record);
    Object update(Wspoints record);
    Object delete(Integer[] ids);
}
