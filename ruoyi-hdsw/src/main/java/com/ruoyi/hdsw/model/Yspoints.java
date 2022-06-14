package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author 
 * wxm
 */
public class Yspoints implements Serializable {
    private Integer gid;

    private Integer objectid;

    private Integer fid;

    private String entity;

    private String layer;

    private Short color;

    private String linetype;

    private BigDecimal elevation;

    private Short linewt;

    private String refname;

    private BigDecimal length;

    private Integer origFid;

    private String expNo;

    private BigDecimal surfH;

    private String feature;

    private String subsid;

    private Object geom;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public Integer getObjectid() {
        return objectid;
    }

    public void setObjectid(Integer objectid) {
        this.objectid = objectid;
    }

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public String getLayer() {
        return layer;
    }

    public void setLayer(String layer) {
        this.layer = layer;
    }

    public Short getColor() {
        return color;
    }

    public void setColor(Short color) {
        this.color = color;
    }

    public String getLinetype() {
        return linetype;
    }

    public void setLinetype(String linetype) {
        this.linetype = linetype;
    }

    public BigDecimal getElevation() {
        return elevation;
    }

    public void setElevation(BigDecimal elevation) {
        this.elevation = elevation;
    }

    public Short getLinewt() {
        return linewt;
    }

    public void setLinewt(Short linewt) {
        this.linewt = linewt;
    }

    public String getRefname() {
        return refname;
    }

    public void setRefname(String refname) {
        this.refname = refname;
    }

    public BigDecimal getLength() {
        return length;
    }

    public void setLength(BigDecimal length) {
        this.length = length;
    }

    public Integer getOrigFid() {
        return origFid;
    }

    public void setOrigFid(Integer origFid) {
        this.origFid = origFid;
    }

    public String getExpNo() {
        return expNo;
    }

    public void setExpNo(String expNo) {
        this.expNo = expNo;
    }

    public BigDecimal getSurfH() {
        return surfH;
    }

    public void setSurfH(BigDecimal surfH) {
        this.surfH = surfH;
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
        Yspoints other = (Yspoints) that;
        return (this.getGid() == null ? other.getGid() == null : this.getGid().equals(other.getGid()))
            && (this.getObjectid() == null ? other.getObjectid() == null : this.getObjectid().equals(other.getObjectid()))
            && (this.getFid() == null ? other.getFid() == null : this.getFid().equals(other.getFid()))
            && (this.getEntity() == null ? other.getEntity() == null : this.getEntity().equals(other.getEntity()))
            && (this.getLayer() == null ? other.getLayer() == null : this.getLayer().equals(other.getLayer()))
            && (this.getColor() == null ? other.getColor() == null : this.getColor().equals(other.getColor()))
            && (this.getLinetype() == null ? other.getLinetype() == null : this.getLinetype().equals(other.getLinetype()))
            && (this.getElevation() == null ? other.getElevation() == null : this.getElevation().equals(other.getElevation()))
            && (this.getLinewt() == null ? other.getLinewt() == null : this.getLinewt().equals(other.getLinewt()))
            && (this.getRefname() == null ? other.getRefname() == null : this.getRefname().equals(other.getRefname()))
            && (this.getLength() == null ? other.getLength() == null : this.getLength().equals(other.getLength()))
            && (this.getOrigFid() == null ? other.getOrigFid() == null : this.getOrigFid().equals(other.getOrigFid()))
            && (this.getExpNo() == null ? other.getExpNo() == null : this.getExpNo().equals(other.getExpNo()))
            && (this.getSurfH() == null ? other.getSurfH() == null : this.getSurfH().equals(other.getSurfH()))
            && (this.getFeature() == null ? other.getFeature() == null : this.getFeature().equals(other.getFeature()))
            && (this.getSubsid() == null ? other.getSubsid() == null : this.getSubsid().equals(other.getSubsid()))
            && (this.getGeom() == null ? other.getGeom() == null : this.getGeom().equals(other.getGeom()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getObjectid() == null) ? 0 : getObjectid().hashCode());
        result = prime * result + ((getFid() == null) ? 0 : getFid().hashCode());
        result = prime * result + ((getEntity() == null) ? 0 : getEntity().hashCode());
        result = prime * result + ((getLayer() == null) ? 0 : getLayer().hashCode());
        result = prime * result + ((getColor() == null) ? 0 : getColor().hashCode());
        result = prime * result + ((getLinetype() == null) ? 0 : getLinetype().hashCode());
        result = prime * result + ((getElevation() == null) ? 0 : getElevation().hashCode());
        result = prime * result + ((getLinewt() == null) ? 0 : getLinewt().hashCode());
        result = prime * result + ((getRefname() == null) ? 0 : getRefname().hashCode());
        result = prime * result + ((getLength() == null) ? 0 : getLength().hashCode());
        result = prime * result + ((getOrigFid() == null) ? 0 : getOrigFid().hashCode());
        result = prime * result + ((getExpNo() == null) ? 0 : getExpNo().hashCode());
        result = prime * result + ((getSurfH() == null) ? 0 : getSurfH().hashCode());
        result = prime * result + ((getFeature() == null) ? 0 : getFeature().hashCode());
        result = prime * result + ((getSubsid() == null) ? 0 : getSubsid().hashCode());
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
        sb.append(", objectid=").append(objectid);
        sb.append(", fid=").append(fid);
        sb.append(", entity=").append(entity);
        sb.append(", layer=").append(layer);
        sb.append(", color=").append(color);
        sb.append(", linetype=").append(linetype);
        sb.append(", elevation=").append(elevation);
        sb.append(", linewt=").append(linewt);
        sb.append(", refname=").append(refname);
        sb.append(", length=").append(length);
        sb.append(", origFid=").append(origFid);
        sb.append(", expNo=").append(expNo);
        sb.append(", surfH=").append(surfH);
        sb.append(", feature=").append(feature);
        sb.append(", subsid=").append(subsid);
        sb.append(", geom=").append(geom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}