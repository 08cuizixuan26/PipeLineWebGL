package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.WslinesMapper;
import com.ruoyi.hdsw.model.Wslines;
import com.ruoyi.hdsw.service.WslinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class WslinesServiceImpl implements WslinesService {
    @Autowired
    private WslinesMapper wslinesMapper;
    @Override
    public Object insert(Wslines record) {
        return wslinesMapper.insertSelective(record);
    }

    @Override
    public Object update(Wslines record) {
        return wslinesMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return wslinesMapper.batchDelete(Arrays.asList(ids));
    }
}
