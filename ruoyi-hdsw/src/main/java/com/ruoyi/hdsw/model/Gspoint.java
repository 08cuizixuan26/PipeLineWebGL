package com.ruoyi.hdsw.model;

import java.io.Serializable;

/**
 * @author 
 * wxm
 */
public class Gspoint implements Serializable {
    private Integer gid;

    private String type;

    private String id;

    private Double pointx;

    private Double pointy;

    private String objcode;

    private String objname;

    private Double bgcode;

    private String street;

    private Integer bgcode2;

    private String community;

    private Integer bgcode3;

    private String section;

    private Long deptcode1;

    private String deptname1;

    private Long deptcode2;

    private String deptname2;

    private Long deptcode3;

    private String deptname3;

    private String objstate;

    private String ordate;

    private String chdate;

    private String datasource;

    private String deptname4;

    private String deptname5;

    private String deptname6;

    private String deptname7;

    private String objpos;

    private String note;

    private String zhName;

    private String zhAddress;

    private Object geom;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getPointx() {
        return pointx;
    }

    public void setPointx(Double pointx) {
        this.pointx = pointx;
    }

    public Double getPointy() {
        return pointy;
    }

    public void setPointy(Double pointy) {
        this.pointy = pointy;
    }

    public String getObjcode() {
        return objcode;
    }

    public void setObjcode(String objcode) {
        this.objcode = objcode;
    }

    public String getObjname() {
        return objname;
    }

    public void setObjname(String objname) {
        this.objname = objname;
    }

    public Double getBgcode() {
        return bgcode;
    }

    public void setBgcode(Double bgcode) {
        this.bgcode = bgcode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getBgcode2() {
        return bgcode2;
    }

    public void setBgcode2(Integer bgcode2) {
        this.bgcode2 = bgcode2;
    }

    public String getCommunity() {
        return community;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public Integer getBgcode3() {
        return bgcode3;
    }

    public void setBgcode3(Integer bgcode3) {
        this.bgcode3 = bgcode3;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public Long getDeptcode1() {
        return deptcode1;
    }

    public void setDeptcode1(Long deptcode1) {
        this.deptcode1 = deptcode1;
    }

    public String getDeptname1() {
        return deptname1;
    }

    public void setDeptname1(String deptname1) {
        this.deptname1 = deptname1;
    }

    public Long getDeptcode2() {
        return deptcode2;
    }

    public void setDeptcode2(Long deptcode2) {
        this.deptcode2 = deptcode2;
    }

    public String getDeptname2() {
        return deptname2;
    }

    public void setDeptname2(String deptname2) {
        this.deptname2 = deptname2;
    }

    public Long getDeptcode3() {
        return deptcode3;
    }

    public void setDeptcode3(Long deptcode3) {
        this.deptcode3 = deptcode3;
    }

    public String getDeptname3() {
        return deptname3;
    }

    public void setDeptname3(String deptname3) {
        this.deptname3 = deptname3;
    }

    public String getObjstate() {
        return objstate;
    }

    public void setObjstate(String objstate) {
        this.objstate = objstate;
    }

    public String getOrdate() {
        return ordate;
    }

    public void setOrdate(String ordate) {
        this.ordate = ordate;
    }

    public String getChdate() {
        return chdate;
    }

    public void setChdate(String chdate) {
        this.chdate = chdate;
    }

    public String getDatasource() {
        return datasource;
    }

    public void setDatasource(String datasource) {
        this.datasource = datasource;
    }

    public String getDeptname4() {
        return deptname4;
    }

    public void setDeptname4(String deptname4) {
        this.deptname4 = deptname4;
    }

    public String getDeptname5() {
        return deptname5;
    }

    public void setDeptname5(String deptname5) {
        this.deptname5 = deptname5;
    }

    public String getDeptname6() {
        return deptname6;
    }

    public void setDeptname6(String deptname6) {
        this.deptname6 = deptname6;
    }

    public String getDeptname7() {
        return deptname7;
    }

    public void setDeptname7(String deptname7) {
        this.deptname7 = deptname7;
    }

    public String getObjpos() {
        return objpos;
    }

    public void setObjpos(String objpos) {
        this.objpos = objpos;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getZhName() {
        return zhName;
    }

    public void setZhName(String zhName) {
        this.zhName = zhName;
    }

    public String getZhAddress() {
        return zhAddress;
    }

    public void setZhAddress(String zhAddress) {
        this.zhAddress = zhAddress;
    }

    public Object getGeom() {
        return geom;
    }

    public void setGeom(Object geom) {
        this.geom = geom;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Gspoint other = (Gspoint) that;
        return (this.getGid() == null ? other.getGid() == null : this.getGid().equals(other.getGid()))
            && (this.getType() == null ? other.getType() == null : this.getType().equals(other.getType()))
            && (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getPointx() == null ? other.getPointx() == null : this.getPointx().equals(other.getPointx()))
            && (this.getPointy() == null ? other.getPointy() == null : this.getPointy().equals(other.getPointy()))
            && (this.getObjcode() == null ? other.getObjcode() == null : this.getObjcode().equals(other.getObjcode()))
            && (this.getObjname() == null ? other.getObjname() == null : this.getObjname().equals(other.getObjname()))
            && (this.getBgcode() == null ? other.getBgcode() == null : this.getBgcode().equals(other.getBgcode()))
            && (this.getStreet() == null ? other.getStreet() == null : this.getStreet().equals(other.getStreet()))
            && (this.getBgcode2() == null ? other.getBgcode2() == null : this.getBgcode2().equals(other.getBgcode2()))
            && (this.getCommunity() == null ? other.getCommunity() == null : this.getCommunity().equals(other.getCommunity()))
            && (this.getBgcode3() == null ? other.getBgcode3() == null : this.getBgcode3().equals(other.getBgcode3()))
            && (this.getSection() == null ? other.getSection() == null : this.getSection().equals(other.getSection()))
            && (this.getDeptcode1() == null ? other.getDeptcode1() == null : this.getDeptcode1().equals(other.getDeptcode1()))
            && (this.getDeptname1() == null ? other.getDeptname1() == null : this.getDeptname1().equals(other.getDeptname1()))
            && (this.getDeptcode2() == null ? other.getDeptcode2() == null : this.getDeptcode2().equals(other.getDeptcode2()))
            && (this.getDeptname2() == null ? other.getDeptname2() == null : this.getDeptname2().equals(other.getDeptname2()))
            && (this.getDeptcode3() == null ? other.getDeptcode3() == null : this.getDeptcode3().equals(other.getDeptcode3()))
            && (this.getDeptname3() == null ? other.getDeptname3() == null : this.getDeptname3().equals(other.getDeptname3()))
            && (this.getObjstate() == null ? other.getObjstate() == null : this.getObjstate().equals(other.getObjstate()))
            && (this.getOrdate() == null ? other.getOrdate() == null : this.getOrdate().equals(other.getOrdate()))
            && (this.getChdate() == null ? other.getChdate() == null : this.getChdate().equals(other.getChdate()))
            && (this.getDatasource() == null ? other.getDatasource() == null : this.getDatasource().equals(other.getDatasource()))
            && (this.getDeptname4() == null ? other.getDeptname4() == null : this.getDeptname4().equals(other.getDeptname4()))
            && (this.getDeptname5() == null ? other.getDeptname5() == null : this.getDeptname5().equals(other.getDeptname5()))
            && (this.getDeptname6() == null ? other.getDeptname6() == null : this.getDeptname6().equals(other.getDeptname6()))
            && (this.getDeptname7() == null ? other.getDeptname7() == null : this.getDeptname7().equals(other.getDeptname7()))
            && (this.getObjpos() == null ? other.getObjpos() == null : this.getObjpos().equals(other.getObjpos()))
            && (this.getNote() == null ? other.getNote() == null : this.getNote().equals(other.getNote()))
            && (this.getZhName() == null ? other.getZhName() == null : this.getZhName().equals(other.getZhName()))
            && (this.getZhAddress() == null ? other.getZhAddress() == null : this.getZhAddress().equals(other.getZhAddress()))
            && (this.getGeom() == null ? other.getGeom() == null : this.getGeom().equals(other.getGeom()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getPointx() == null) ? 0 : getPointx().hashCode());
        result = prime * result + ((getPointy() == null) ? 0 : getPointy().hashCode());
        result = prime * result + ((getObjcode() == null) ? 0 : getObjcode().hashCode());
        result = prime * result + ((getObjname() == null) ? 0 : getObjname().hashCode());
        result = prime * result + ((getBgcode() == null) ? 0 : getBgcode().hashCode());
        result = prime * result + ((getStreet() == null) ? 0 : getStreet().hashCode());
        result = prime * result + ((getBgcode2() == null) ? 0 : getBgcode2().hashCode());
        result = prime * result + ((getCommunity() == null) ? 0 : getCommunity().hashCode());
        result = prime * result + ((getBgcode3() == null) ? 0 : getBgcode3().hashCode());
        result = prime * result + ((getSection() == null) ? 0 : getSection().hashCode());
        result = prime * result + ((getDeptcode1() == null) ? 0 : getDeptcode1().hashCode());
        result = prime * result + ((getDeptname1() == null) ? 0 : getDeptname1().hashCode());
        result = prime * result + ((getDeptcode2() == null) ? 0 : getDeptcode2().hashCode());
        result = prime * result + ((getDeptname2() == null) ? 0 : getDeptname2().hashCode());
        result = prime * result + ((getDeptcode3() == null) ? 0 : getDeptcode3().hashCode());
        result = prime * result + ((getDeptname3() == null) ? 0 : getDeptname3().hashCode());
        result = prime * result + ((getObjstate() == null) ? 0 : getObjstate().hashCode());
        result = prime * result + ((getOrdate() == null) ? 0 : getOrdate().hashCode());
        result = prime * result + ((getChdate() == null) ? 0 : getChdate().hashCode());
        result = prime * result + ((getDatasource() == null) ? 0 : getDatasource().hashCode());
        result = prime * result + ((getDeptname4() == null) ? 0 : getDeptname4().hashCode());
        result = prime * result + ((getDeptname5() == null) ? 0 : getDeptname5().hashCode());
        result = prime * result + ((getDeptname6() == null) ? 0 : getDeptname6().hashCode());
        result = prime * result + ((getDeptname7() == null) ? 0 : getDeptname7().hashCode());
        result = prime * result + ((getObjpos() == null) ? 0 : getObjpos().hashCode());
        result = prime * result + ((getNote() == null) ? 0 : getNote().hashCode());
        result = prime * result + ((getZhName() == null) ? 0 : getZhName().hashCode());
        result = prime * result + ((getZhAddress() == null) ? 0 : getZhAddress().hashCode());
        result = prime * result + ((getGeom() == null) ? 0 : getGeom().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", gid=").append(gid);
        sb.append(", type=").append(type);
        sb.append(", id=").append(id);
        sb.append(", pointx=").append(pointx);
        sb.append(", pointy=").append(pointy);
        sb.append(", objcode=").append(objcode);
        sb.append(", objname=").append(objname);
        sb.append(", bgcode=").append(bgcode);
        sb.append(", street=").append(street);
        sb.append(", bgcode2=").append(bgcode2);
        sb.append(", community=").append(community);
        sb.append(", bgcode3=").append(bgcode3);
        sb.append(", section=").append(section);
        sb.append(", deptcode1=").append(deptcode1);
        sb.append(", deptname1=").append(deptname1);
        sb.append(", deptcode2=").append(deptcode2);
        sb.append(", deptname2=").append(deptname2);
        sb.append(", deptcode3=").append(deptcode3);
        sb.append(", deptname3=").append(deptname3);
        sb.append(", objstate=").append(objstate);
        sb.append(", ordate=").append(ordate);
        sb.append(", chdate=").append(chdate);
        sb.append(", datasource=").append(datasource);
        sb.append(", deptname4=").append(deptname4);
        sb.append(", deptname5=").append(deptname5);
        sb.append(", deptname6=").append(deptname6);
        sb.append(", deptname7=").append(deptname7);
        sb.append(", objpos=").append(objpos);
        sb.append(", note=").append(note);
        sb.append(", zhName=").append(zhName);
        sb.append(", zhAddress=").append(zhAddress);
        sb.append(", geom=").append(geom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}