package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gxmodel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * GslineDAO继承基类
 */
@Mapper
public interface GslineMapper extends MyBatisBaseMapper<Gxmodel, Integer> {
    Gxmodel selectByGxbh(String dxbh);

    Integer updateState(@Param("pipeid") String pipeid, @Param("delState") String delState, @Param("updState") String updState);
    List<Gxmodel> spoint(@Param("spoint")String spoint);
    List<Gxmodel>  epoint(@Param("epoint")String epoint);
    List<Gxmodel> selectDiscardLines(@Param("pipeid") String pipeid, @Param("road") String road);
}