package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gxmodel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * WslinesDAO继承基类
 */
@Mapper
public interface WslinesMapper extends MyBatisBaseMapper<com.ruoyi.hdsw.model.Gxmodel, Integer> {
    Gxmodel selectByGxbh(String dxbh);
    Integer updateState(@Param("pipeid") String pipeid, @Param("delState") String delState, @Param("updState") String updState);

}