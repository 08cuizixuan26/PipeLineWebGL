package com.ruoyi.hdsw.service;

import com.ruoyi.hdsw.model.Wslines;

public interface WslinesService {
    Object insert(Wslines record);
    Object update(Wslines record);
    Object delete(Integer[] ids);
}
