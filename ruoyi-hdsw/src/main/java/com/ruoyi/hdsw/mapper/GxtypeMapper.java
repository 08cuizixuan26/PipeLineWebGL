package com.ruoyi.hdsw.mapper;

import com.ruoyi.hdsw.model.Gxtype;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface GxtypeMapper extends Serializable {

    List<Gxtype> select();

    int insert(@Param("id") String id, @Param("name") String name, @Param("time") String time);

    int delete(String id);

    int update(@Param("id") String id, @Param("name") String name, @Param("time") String time);
}