package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gdmodel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * WspointsDAO继承基类
 */
@Mapper
public interface WspointsMapper extends MyBatisBaseMapper<com.ruoyi.hdsw.model.Gdmodel, Integer> {
    Gdmodel selectByGdbh(String gdbh);
    Integer updateState(@Param("gid") Integer gid, @Param("delState") String delState, @Param("updState") String updState);

}