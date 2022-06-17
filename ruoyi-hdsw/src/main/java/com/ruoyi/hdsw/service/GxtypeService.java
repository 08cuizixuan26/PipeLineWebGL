package com.ruoyi.hdsw.service;


import com.ruoyi.hdsw.model.Gxtype;

import java.util.List;

public interface GxtypeService {
    int insert(String id,String name,String time);
    int delete(String id);
    List<Gxtype> select();
    int update(String id,String name,String time );
}
