package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.GslineMapper;
import com.ruoyi.hdsw.model.Gsline;
import com.ruoyi.hdsw.service.GslineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class GslineServiceImpl implements GslineService{
    @Autowired
    private GslineMapper gslineMapper;
    @Override
    public Object insert(Gsline record) {
        return gslineMapper.insertSelective(record);
    }

    @Override
    public Object update(Gsline record) {
        return gslineMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return gslineMapper.batchDelete(Arrays.asList(ids));
    }
}
