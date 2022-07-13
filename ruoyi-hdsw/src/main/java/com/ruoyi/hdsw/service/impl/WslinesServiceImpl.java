package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.WslinesMapper;
import com.ruoyi.hdsw.mapper.WspointsMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.model.Wslines;
import com.ruoyi.hdsw.service.WslinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class WslinesServiceImpl implements WslinesService {
    @Resource
    private WslinesMapper wslinesMapper;
    @Resource
    private WspointsMapper wspointsMapper;
    @Override
    public Object insert(Gxmodel record) {
        return wslinesMapper.insertSelective(record);
    }

    @Override
    public Object update(Gxmodel record) {
        return wslinesMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(Integer[] ids) {
        return wslinesMapper.batchDelete(Arrays.asList(ids));
    }

    @Override
    public Object selectByGxbh(String gxbh) {
        return wslinesMapper.selectByGxbh(gxbh);
    }

    @Override
    public Object interruptLine(String gxbh, String gdbh) {
        Gxmodel gxmodel1 = wslinesMapper.selectByGxbh(gxbh);
        Gdmodel zjd = wspointsMapper.selectByGdbh(gdbh);
        Gdmodel qd = wspointsMapper.selectByGdbh(gxmodel1.getsPoint());
        Gdmodel zd = wspointsMapper.selectByGdbh(gxmodel1.getePoint());

        //删除原有线段
        wslinesMapper.updateState(gxmodel1.getGid(),"1",null);
        //添加新的两条线段
        String geom1="MULTILINESTRING ZM(("+qd.getX()+" "+qd.getY()+" 0 0,"+zjd.getX()+" "+zjd.getY()+ " 0 0"+"))";
        gxmodel1.setsPoint(qd.getExpNo());
        gxmodel1.setePoint(zjd.getExpNo());
        gxmodel1.setGeom(geom1);
        wslinesMapper.insertSelective(gxmodel1);

        String geom2="MULTILINESTRING ZM(("+zjd.getX()+" "+zjd.getY()+" 0 0,"+zd.getX()+" "+zd.getY()+ " 0 0"+"))";
        gxmodel1.setsPoint(zjd.getExpNo());
        gxmodel1.setePoint(zd.getExpNo());
        gxmodel1.setGeom(geom2);
        wslinesMapper.insertSelective(gxmodel1);
        return true;

    }

    @Override
    public Object updateState(Integer gid,String delState, String updState) {
        return wslinesMapper.updateState(gid,delState,updState);
    }
    @Override
    public Object getMaxNum() {
        return wslinesMapper.getMaxNum();
    }

    @Override
    public Object selectByState(String delState, String updState) {
        return wslinesMapper.selectByState(delState,updState);
    }

    @Override
    public List<Gxmodel> spoint(String spoint) {
        return wslinesMapper.spoint(spoint);
    }

    @Override
    public List<Gxmodel> epoint(String epoint) {
        return wslinesMapper.epoint(epoint);
    }
}
