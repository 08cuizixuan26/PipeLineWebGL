package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Gsline;

public interface GslineService {
    Object insert(Gsline record);
    Object update(Gsline record);
    Object delete(Integer[] ids);
}
