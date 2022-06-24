package com.ruoyi.hdsw.service.impl;

import com.ruoyi.hdsw.mapper.GxcontrolMapper;
import com.ruoyi.hdsw.model.Gxcontrol;
import com.ruoyi.hdsw.service.GxcontrolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
    public int update(Gxcontrol gxcontrol) {
        return gxcontrolMapper.update(gxcontrol);
    }

    @Override
    public int delete(String id) {
        return gxcontrolMapper.delete(id);
    }
}
