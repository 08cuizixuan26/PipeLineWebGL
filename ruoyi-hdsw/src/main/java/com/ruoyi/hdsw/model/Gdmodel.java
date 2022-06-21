package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author
 * null
 */
public class Gdmodel implements Serializable {
    private Integer gid;

    private String expNo;

    private String feature;

    private String subsid;

    private Double elevation;

    private Double sureH;

    private Double botDepth;

    private String covType;

    private String covDn;

    private String covMeat;

    private String wchaMeat;

    private String wchaType;

    private Double foDeep;

    private String wchaDn;

    private String bTime;

    private String offcNo;

    private Double rotation;

    private BigDecimal x;

    private BigDecimal y;

    private String owner;

    private String road;

    private Object geom;

    /**
     * 0-正常，1-删除，2-废弃
     */
    private String deleteState;

    /**
     * 0-已更新，1-未更新
     */
    private String updateState;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getExpNo() {
        return expNo;
    }

    public void setExpNo(String expNo) {
        this.expNo = expNo;
    }

    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }

    public String getSubsid() {
        return subsid;
    }

    public void setSubsid(String subsid) {
        this.subsid = subsid;
    }

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }

    public Double getSureH() {
        return sureH;
    }

    public void setSureH(Double sureH) {
        this.sureH = sureH;
    }

    public Double getBotDepth() {
        return botDepth;
    }

    public void setBotDepth(Double botDepth) {
        this.botDepth = botDepth;
    }

    public String getCovType() {
        return covType;
    }

    public void setCovType(String covType) {
        this.covType = covType;
    }

    public String getCovDn() {
        return covDn;
    }

    public void setCovDn(String covDn) {
        this.covDn = covDn;
    }

    public String getCovMeat() {
        return covMeat;
    }

    public void setCovMeat(String covMeat) {
        this.covMeat = covMeat;
    }

    public String getWchaMeat() {
        return wchaMeat;
    }

    public void setWchaMeat(String wchaMeat) {
        this.wchaMeat = wchaMeat;
    }

    public String getWchaType() {
        return wchaType;
    }

    public void setWchaType(String wchaType) {
        this.wchaType = wchaType;
    }

    public Double getFoDeep() {
        return foDeep;
    }

    public void setFoDeep(Double foDeep) {
        this.foDeep = foDeep;
    }

    public String getWchaDn() {
        return wchaDn;
    }

    public void setWchaDn(String wchaDn) {
        this.wchaDn = wchaDn;
    }

    public String getbTime() {
        return bTime;
    }

    public void setbTime(String bTime) {
        this.bTime = bTime;
    }

    public String getOffcNo() {
        return offcNo;
    }

    public void setOffcNo(String offcNo) {
        this.offcNo = offcNo;
    }

    public Double getRotation() {
        return rotation;
    }

    public void setRotation(Double rotation) {
        this.rotation = rotation;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getRoad() {
        return road;
    }

    public void setRoad(String road) {
        this.road = road;
    }

    public Object getGeom() {
        return geom;
    }

    public void setGeom(Object geom) {
        this.geom = geom;
    }

    public String getDeleteState() {
        return deleteState;
    }

    public void setDeleteState(String deleteState) {
        this.deleteState = deleteState;
    }

    public String getUpdateState() {
        return updateState;
    }

    public void setUpdateState(String updateState) {
        this.updateState = updateState;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getExpNo() == null) ? 0 : getExpNo().hashCode());
        result = prime * result + ((getFeature() == null) ? 0 : getFeature().hashCode());
        result = prime * result + ((getSubsid() == null) ? 0 : getSubsid().hashCode());
        result = prime * result + ((getElevation() == null) ? 0 : getElevation().hashCode());
        result = prime * result + ((getSureH() == null) ? 0 : getSureH().hashCode());
        result = prime * result + ((getBotDepth() == null) ? 0 : getBotDepth().hashCode());
        result = prime * result + ((getCovType() == null) ? 0 : getCovType().hashCode());
        result = prime * result + ((getCovDn() == null) ? 0 : getCovDn().hashCode());
        result = prime * result + ((getCovMeat() == null) ? 0 : getCovMeat().hashCode());
        result = prime * result + ((getWchaMeat() == null) ? 0 : getWchaMeat().hashCode());
        result = prime * result + ((getWchaType() == null) ? 0 : getWchaType().hashCode());
        result = prime * result + ((getFoDeep() == null) ? 0 : getFoDeep().hashCode());
        result = prime * result + ((getWchaDn() == null) ? 0 : getWchaDn().hashCode());
        result = prime * result + ((getbTime() == null) ? 0 : getbTime().hashCode());
        result = prime * result + ((getOffcNo() == null) ? 0 : getOffcNo().hashCode());
        result = prime * result + ((getRotation() == null) ? 0 : getRotation().hashCode());
        result = prime * result + ((getX() == null) ? 0 : getX().hashCode());
        result = prime * result + ((getY() == null) ? 0 : getY().hashCode());
        result = prime * result + ((getOwner() == null) ? 0 : getOwner().hashCode());
        result = prime * result + ((getRoad() == null) ? 0 : getRoad().hashCode());
        result = prime * result + ((getGeom() == null) ? 0 : getGeom().hashCode());
        result = prime * result + ((getDeleteState() == null) ? 0 : getDeleteState().hashCode());
        result = prime * result + ((getUpdateState() == null) ? 0 : getUpdateState().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", gid=").append(gid);
        sb.append(", expNo=").append(expNo);
        sb.append(", feature=").append(feature);
        sb.append(", subsid=").append(subsid);
        sb.append(", elevation=").append(elevation);
        sb.append(", sureH=").append(sureH);
        sb.append(", botDepth=").append(botDepth);
        sb.append(", covType=").append(covType);
        sb.append(", covDn=").append(covDn);
        sb.append(", covMeat=").append(covMeat);
        sb.append(", wchaMeat=").append(wchaMeat);
        sb.append(", wchaType=").append(wchaType);
        sb.append(", foDeep=").append(foDeep);
        sb.append(", wchaDn=").append(wchaDn);
        sb.append(", bTime=").append(bTime);
        sb.append(", offcNo=").append(offcNo);
        sb.append(", rotation=").append(rotation);
        sb.append(", x=").append(x);
        sb.append(", y=").append(y);
        sb.append(", owner=").append(owner);
        sb.append(", road=").append(road);
        sb.append(", geom=").append(geom);
        sb.append(", deleteState=").append(deleteState);
        sb.append(", updateState=").append(updateState);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}