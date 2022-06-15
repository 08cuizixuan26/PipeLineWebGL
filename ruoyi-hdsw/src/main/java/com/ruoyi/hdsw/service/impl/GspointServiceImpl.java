package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.GspointMapper;
import com.ruoyi.hdsw.model.Gspoint;
import com.ruoyi.hdsw.service.GspointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class GspointServiceImpl implements GspointService {
    @Autowired
    private GspointMapper gspointMapper;
    @Override
    public Object insert(Gspoint record) {
        return gspointMapper.insertSelective(record);
    }

    @Override
    public Object update(Gspoint record) {
        return gspointMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return gspointMapper.batchDelete(Arrays.asList(ids));
    }
}
