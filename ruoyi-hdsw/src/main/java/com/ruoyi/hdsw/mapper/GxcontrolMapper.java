package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gxcontrol;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface GxcontrolMapper extends Serializable {
    List<Gxcontrol> select();

    int insert(Gxcontrol gxcontrol);

    int delete(@Param("gid") String gid);

    int update(@Param("width")String width,@Param("gid") String gid,@Param("color") String color,@Param("iocn") String iocn);
}
