package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gxcontrol;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GxcontrolMapper extends MyBatisBaseMapper<com.ruoyi.hdsw.model.Gdmodel, Integer> {
    List<Gxcontrol> select();

    int insert(Gxcontrol gxcontrol);

    int delete(@Param("gid") String gid);

    int update(Gxcontrol gxcontrol);
}
