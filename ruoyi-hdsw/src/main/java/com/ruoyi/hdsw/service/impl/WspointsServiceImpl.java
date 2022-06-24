package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.WspointsMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Wspoints;
import com.ruoyi.hdsw.service.WspointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class WspointsServiceImpl implements WspointsService {
    @Autowired
    private WspointsMapper wspointsMapper;
    @Override
    public Object insert(Gdmodel record) {
        return wspointsMapper.insertSelective(record);
    }

    @Override
    public Object update(Gdmodel record) {
        return wspointsMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return wspointsMapper.batchDelete(Arrays.asList(ids));
    }

    @Override
    public Object selectByGdbh(String gdbh) {
        return wspointsMapper.selectByGdbh(gdbh);
    }

    @Override
    public Object updateState(Integer gid,String delState, String updState) {
        return wspointsMapper.updateState(gid,delState,updState);
    }}
