package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gspoint;

public interface GspointService {
    Object insert(Gspoint record);
    Object update(Gspoint record);
    Object delete(Integer[] ids);
}
