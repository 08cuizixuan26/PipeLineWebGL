package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.GxcontrolMapper;
import com.ruoyi.hdsw.model.Gxcontrol;
import com.ruoyi.hdsw.service.GxcontrolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class GxcontrolServiceImpl implements GxcontrolService {

    @Autowired
    private GxcontrolMapper gxcontrolMapper;


    @Override
    public int insert(Gxcontrol gxcontrol) {
        return gxcontrolMapper.insert(gxcontrol);
    }

    @Override
    public List<Gxcontrol> select() {
        return gxcontrolMapper.select();
    }

    @Override
    public int update(String width,String gid,String color,String iocn) {
        return gxcontrolMapper.update(width,gid,color,iocn);
    }

    @Override
    public int delete(String id) {
        return gxcontrolMapper.delete(id);
    }
}
