package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gdmodel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * YspointsDAO继承基类
 */
@Mapper
public interface YspointsMapper extends MyBatisBaseMapper<com.ruoyi.hdsw.model.Gdmodel, Integer> {
    Gdmodel selectByGdbh(String gdbh);
    Integer updateState(@Param("gid") Integer gid,@Param("deleteState") String deleteState, @Param("updateState") String updateState);

}