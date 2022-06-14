package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.YslinesMapper;
import com.ruoyi.hdsw.model.Yslines;
import com.ruoyi.hdsw.service.YslinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class YslinesServiceImpl implements YslinesService {
    @Autowired
    private YslinesMapper yslinesMapper;
    @Override
    public Object insert(Yslines record) {
        return yslinesMapper.insertSelective(record);
    }

    @Override
    public Object update(Yslines record) {
        return yslinesMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return yslinesMapper.batchDelete(Arrays.asList(ids));
    }
}
