package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.YspointsMapper;
import com.ruoyi.hdsw.model.Yspoints;
import com.ruoyi.hdsw.service.YspointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class YspointsServiceImpl implements YspointsService {
    @Autowired
    private YspointsMapper yspointsMapper;
    @Override
    public Object insert(Yspoints record) {
        return yspointsMapper.insertSelective(record);
    }

    @Override
    public Object update(Yspoints record) {
        return yspointsMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return yspointsMapper.batchDelete(Arrays.asList(ids));
    }
}