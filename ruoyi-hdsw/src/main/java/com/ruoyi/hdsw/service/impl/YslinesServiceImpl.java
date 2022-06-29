package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.YslinesMapper;
import com.ruoyi.hdsw.mapper.YspointsMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gxmodel;
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
    @Autowired
    private YspointsMapper yspointsMapper;
    @Override
    public Object insert(Gxmodel record) {
        return yslinesMapper.insertSelective(record);
    }

    @Override
    public Object update(Gxmodel record) {
        return yslinesMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return yslinesMapper.batchDelete(Arrays.asList(ids));
    }

    @Override
    public Object selectByGxbh(String gxbh) {
        return yslinesMapper.selectByGxbh(gxbh);
    }

    @Override
    public Object interruptLine(String gxbh, String gdbh) {
        Gxmodel gxmodel1 = yslinesMapper.selectByGxbh(gxbh);
        Gdmodel zjd = yspointsMapper.selectByGdbh(gdbh);
        Gdmodel qd = yspointsMapper.selectByGdbh(gxmodel1.getsPoint());
        Gdmodel zd = yspointsMapper.selectByGdbh(gxmodel1.getePoint());

        //删除原有线段
        yslinesMapper.updateState(gxmodel1.getGid(),"1",null);
        //添加新的两条线段
        String geom1="MULTILINESTRING ZM(("+qd.getX()+" "+qd.getY()+" 0 0,"+zjd.getX()+" "+zjd.getY()+ " 0 0"+"))";
        gxmodel1.setsPoint(qd.getExpNo());
        gxmodel1.setePoint(zjd.getExpNo());
        gxmodel1.setGeom(geom1);
        yslinesMapper.insertSelective(gxmodel1);

        String geom2="MULTILINESTRING ZM(("+zjd.getX()+" "+zjd.getY()+" 0 0,"+zd.getX()+" "+zd.getY()+ " 0 0"+"))";
        gxmodel1.setsPoint(zjd.getExpNo());
        gxmodel1.setePoint(zd.getExpNo());
        gxmodel1.setGeom(geom2);
        yslinesMapper.insertSelective(gxmodel1);
        return true;

    }

    @Override
    public Object updateState(Integer gid,String delState, String updState) {
        return yslinesMapper.updateState(gid,delState,updState);
    }
    @Override
    public Object getMaxNum() {
        return yslinesMapper.getMaxNum();
    }

    @Override
    public Object selectByState(String delState, String updState) {
        return yslinesMapper.selectByState(delState,updState);
    }
}
