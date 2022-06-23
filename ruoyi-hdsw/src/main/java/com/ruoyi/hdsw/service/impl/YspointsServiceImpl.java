package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.YspointsMapper;
import com.ruoyi.hdsw.model.Gdmodel;
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
    public Object insert(Gdmodel record) {
        return yspointsMapper.insertSelective(record);
    }

    @Override
    public Object update(Gdmodel record) {
        return yspointsMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return yspointsMapper.batchDelete(Arrays.asList(ids));
    }

    @Override
    public Object selectByGdbh(String gdbh) {
        return yspointsMapper.selectByGdbh(gdbh);
    }

    @Override
    public Object updateState(Integer gid,String deleteState, String updateState) {
        return yspointsMapper.updateState(gid,deleteState,updateState);
    }
}
