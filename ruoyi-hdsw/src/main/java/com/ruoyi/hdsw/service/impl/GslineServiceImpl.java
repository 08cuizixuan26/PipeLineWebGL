package com.ruoyi.hdsw.service.impl;

import com.ruoyi.common.annotation.DataSource;
import com.ruoyi.common.enums.DataSourceType;
import com.ruoyi.hdsw.mapper.GslineMapper;
import com.ruoyi.hdsw.mapper.GspointMapper;
import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gsline;
import com.ruoyi.hdsw.model.Gxmodel;
import com.ruoyi.hdsw.service.GslineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@Service
@DataSource(value = DataSourceType.SLAVE)
public class GslineServiceImpl implements GslineService {
    @Resource
    private GslineMapper gslineMapper;
    @Resource
    private GspointMapper gspointMapper;

    @Override
    public Object insert(Gxmodel record) {
        return gslineMapper.insertSelective(record);
    }

    @Override
    public Object update(Gxmodel record) {
        return gslineMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public Object delete(String[] pipeid) {
        try {
            for (String s : pipeid) {
                this.updateState(s, "15", null);
            }
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public Object disCard(String[] pipeid) {
        try {
            for (String s : pipeid) {
                this.updateState(s, "17", null);
            }
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public Object recover(String[] pipeid) {
        try {
            for (String s : pipeid) {
                this.updateState(s, "00", null);
            }
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public Object selectByGxbh(String gxbh) {
        return gslineMapper.selectByGxbh(gxbh);
    }

    @Override
    public Object interruptLine(String gxbh, String gdbh) {
        Gxmodel gxmodel1 = gslineMapper.selectByGxbh(gxbh);
        Gdmodel zjd = gspointMapper.selectByGdbh(gdbh);
        Gdmodel qd = gspointMapper.selectByGdbh(gxmodel1.getsPoint());
        Gdmodel zd = gspointMapper.selectByGdbh(gxmodel1.getePoint());

        //删除原有线段
        gslineMapper.updateState(gxmodel1.getPipeid(), "1", null);
        //添加新的两条线段
        String geom1 = "MULTILINESTRING ZM((" + qd.getX() + " " + qd.getY() + " 0 0," + zjd.getX() + " " + zjd.getY() + " 0 0" + "))";
        gxmodel1.setsPoint(qd.getExpNo());
        gxmodel1.setePoint(zjd.getExpNo());
        gxmodel1.setGeom(geom1);
        gslineMapper.insertSelective(gxmodel1);

        String geom2 = "MULTILINESTRING ZM((" + zjd.getX() + " " + zjd.getY() + " 0 0," + zd.getX() + " " + zd.getY() + " 0 0" + "))";
        gxmodel1.setsPoint(zjd.getExpNo());
        gxmodel1.setePoint(zd.getExpNo());
        gxmodel1.setGeom(geom2);
        gslineMapper.insertSelective(gxmodel1);
        return true;

    }

    @Override
    public Object updateState(String pipeid, String delState, String updState) {
        return gslineMapper.updateState(pipeid, delState, updState);
    }

    @Override
    public Object getMaxNum() {
        return gslineMapper.getMaxNum();
    }

    @Override
    public Object selectByState(String delState, String updState) {
        return gslineMapper.selectByState(delState, updState);
    }

    @Override
    public List<Gxmodel> spoint(String spoint) {
        return gslineMapper.spoint(spoint);
    }

    @Override
    public List<Gxmodel> epoint(String epoint) {
        return gslineMapper.epoint(epoint);
    }

    @Override
    public List<Gxmodel> selectDiscardLines(String pipeid, String road) {
        return gslineMapper.selectDiscardLines(pipeid, road);
    }

    @Override
    public Object batchUpdateState(String updState) {
        return gslineMapper.batchUpdateState(updState);
    }
}
