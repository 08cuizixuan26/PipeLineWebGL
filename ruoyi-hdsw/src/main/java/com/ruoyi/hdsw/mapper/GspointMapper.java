package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gdmodel;
import com.ruoyi.hdsw.model.Gspoint;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * GspointDAO继承基类
 */
@Mapper
public interface GspointMapper extends MyBatisBaseMapper<Gdmodel, Integer> {
    Gdmodel selectByGdbh(String gdbh);
    Integer updateState(@Param("gid") Integer gid, @Param("delState") String delState, @Param("updState") String updState);

}