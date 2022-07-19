package com.ruoyi.hdsw.mapper;

import org.apache.ibatis.annotations.Param;

import java.io.Serializable;
import java.util.List;

/**
 * DAO公共基类，由MybatisGenerator自动生成请勿修改
 * @param <Model> The Model Class 这里是泛型不是Model类
 * @param <PK> The Primary Key Class 如果是无主键，则可以用Model来跳过，如果是多主键则是Key类
 */
public interface MyBatisBaseMapper<Model, PK extends Serializable> {
    int deleteByPrimaryKey(PK id);

    int batchDelete(List<Integer> ids);

    int insert(Model record);

    int insertSelective(Model record);

    Model selectByPrimaryKey(PK id);

    int updateByPrimaryKeySelective(Model record);

    int updateByPrimaryKey(Model record);

    int getMaxNum();

    List<Model> selectByState(@Param("delState") String delState, @Param("updState") String updState);

    int batchUpdateState(@Param("updState") String updState);
}