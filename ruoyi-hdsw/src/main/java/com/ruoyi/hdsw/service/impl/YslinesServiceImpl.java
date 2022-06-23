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
        try {
            //删除原有线段,添加新的两条线段
            gxmodel1.setUpdateState("1");
            yslinesMapper.updateState(gxmodel1.getGid(),"1",null);

            gxmodel1.setUpdateState("0");
            String geom1="MULTILINESTRING ZM(("+qd.getX()+" "+qd.getY()+" 0 0,"+zjd.getX()+" "+zjd.getY()+ " 0 0"+"))";
            gxmodel1.setsPoint(qd.getExpNo());
            gxmodel1.setePoint(zjd.getExpNo());
            yslinesMapper.insert(gxmodel1);

            String geom2="MULTILINESTRING ZM(("+zjd.getX()+" "+zjd.getY()+" 0 0,"+zd.getX()+" "+zd.getY()+ " 0 0"+"))";
            gxmodel1.setsPoint(zjd.getExpNo());
            gxmodel1.setePoint(zd.getExpNo());
            yslinesMapper.insert(gxmodel1);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Object updateState(Integer gid,String deleteState, String updateState) {
        return yslinesMapper.updateState(gid,deleteState,updateState);
    }
}
