package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.GxtypeMapper;
import com.ruoyi.hdsw.model.Gxtype;
import com.ruoyi.hdsw.service.GxtypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class GxtypeServiceImpl implements GxtypeService {
    @Autowired
    private GxtypeMapper gxtypeMapper;

    @Override
    public int insert(String id,String name,String time) {
        return gxtypeMapper.insert(id,name,time);
    }

    @Override
    public int delete(String id) {
        return gxtypeMapper.delete(id);
    }

    @Override
    public List<Gxtype> select() {
        return gxtypeMapper.select();
    }

    @Override
    public int update(String id,String name,String time ) {
        return gxtypeMapper.update(id,name,time);
    }
}
