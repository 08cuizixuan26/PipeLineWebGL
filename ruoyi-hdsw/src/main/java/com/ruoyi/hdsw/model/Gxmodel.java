package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author
 * wxm
 */
public class Gxmodel implements Serializable {
    private Integer gid;

    private Long objectid;

    private Long fid;

    private String entity;

    private String layer;

    private Integer color;

    private String linetype;

    private BigDecimal elevation;

    private Integer linewt;

    private String refname;

    private BigDecimal length;

    private BigDecimal shapeLeng;

    private Long nearFid;

    private BigDecimal nearDist;

    private String pipeid;

    private String sPoint;

    private String ePoint;

    private BigDecimal sDeep;

    private BigDecimal eDeep;

    private String material;

    private String dType;

    private String dS;

    private Integer flowdirect;

    private String road;

    private String qs;

    private BigDecimal len;

    private Object geom;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public Long getObjectid() {
        return objectid;
    }

    public void setObjectid(Long objectid) {
        this.objectid = objectid;
    }

    public Long getFid() {
        return fid;
    }

    public void setFid(Long fid) {
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

    public Integer getColor() {
        return color;
    }

    public void setColor(Integer color) {
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

    public Integer getLinewt() {
        return linewt;
    }

    public void setLinewt(Integer linewt) {
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

    public BigDecimal getShapeLeng() {
        return shapeLeng;
    }

    public void setShapeLeng(BigDecimal shapeLeng) {
        this.shapeLeng = shapeLeng;
    }

    public Long getNearFid() {
        return nearFid;
    }

    public void setNearFid(Long nearFid) {
        this.nearFid = nearFid;
    }

    public BigDecimal getNearDist() {
        return nearDist;
    }

    public void setNearDist(BigDecimal nearDist) {
        this.nearDist = nearDist;
    }

    public String getPipeid() {
        return pipeid;
    }

    public void setPipeid(String pipeid) {
        this.pipeid = pipeid;
    }

    public String getsPoint() {
        return sPoint;
    }

    public void setsPoint(String sPoint) {
        this.sPoint = sPoint;
    }

    public String getePoint() {
        return ePoint;
    }

    public void setePoint(String ePoint) {
        this.ePoint = ePoint;
    }

    public BigDecimal getsDeep() {
        return sDeep;
    }

    public void setsDeep(BigDecimal sDeep) {
        this.sDeep = sDeep;
    }

    public BigDecimal geteDeep() {
        return eDeep;
    }

    public void seteDeep(BigDecimal eDeep) {
        this.eDeep = eDeep;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getdType() {
        return dType;
    }

    public void setdType(String dType) {
        this.dType = dType;
    }

    public String getdS() {
        return dS;
    }

    public void setdS(String dS) {
        this.dS = dS;
    }

    public Integer getFlowdirect() {
        return flowdirect;
    }

    public void setFlowdirect(Integer flowdirect) {
        this.flowdirect = flowdirect;
    }

    public String getRoad() {
        return road;
    }

    public void setRoad(String road) {
        this.road = road;
    }

    public String getQs() {
        return qs;
    }

    public void setQs(String qs) {
        this.qs = qs;
    }

    public BigDecimal getLen() {
        return len;
    }

    public void setLen(BigDecimal len) {
        this.len = len;
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
        Yslines other = (Yslines) that;
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
                && (this.getShapeLeng() == null ? other.getShapeLeng() == null : this.getShapeLeng().equals(other.getShapeLeng()))
                && (this.getNearFid() == null ? other.getNearFid() == null : this.getNearFid().equals(other.getNearFid()))
                && (this.getNearDist() == null ? other.getNearDist() == null : this.getNearDist().equals(other.getNearDist()))
                && (this.getPipeid() == null ? other.getPipeid() == null : this.getPipeid().equals(other.getPipeid()))
                && (this.getsPoint() == null ? other.getsPoint() == null : this.getsPoint().equals(other.getsPoint()))
                && (this.getePoint() == null ? other.getePoint() == null : this.getePoint().equals(other.getePoint()))
                && (this.getsDeep() == null ? other.getsDeep() == null : this.getsDeep().equals(other.getsDeep()))
                && (this.geteDeep() == null ? other.geteDeep() == null : this.geteDeep().equals(other.geteDeep()))
                && (this.getMaterial() == null ? other.getMaterial() == null : this.getMaterial().equals(other.getMaterial()))
                && (this.getdType() == null ? other.getdType() == null : this.getdType().equals(other.getdType()))
                && (this.getdS() == null ? other.getdS() == null : this.getdS().equals(other.getdS()))
                && (this.getFlowdirect() == null ? other.getFlowdirect() == null : this.getFlowdirect().equals(other.getFlowdirect()))
                && (this.getRoad() == null ? other.getRoad() == null : this.getRoad().equals(other.getRoad()))
                && (this.getQs() == null ? other.getQs() == null : this.getQs().equals(other.getQs()))
                && (this.getLen() == null ? other.getLen() == null : this.getLen().equals(other.getLen()))
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
        result = prime * result + ((getShapeLeng() == null) ? 0 : getShapeLeng().hashCode());
        result = prime * result + ((getNearFid() == null) ? 0 : getNearFid().hashCode());
        result = prime * result + ((getNearDist() == null) ? 0 : getNearDist().hashCode());
        result = prime * result + ((getPipeid() == null) ? 0 : getPipeid().hashCode());
        result = prime * result + ((getsPoint() == null) ? 0 : getsPoint().hashCode());
        result = prime * result + ((getePoint() == null) ? 0 : getePoint().hashCode());
        result = prime * result + ((getsDeep() == null) ? 0 : getsDeep().hashCode());
        result = prime * result + ((geteDeep() == null) ? 0 : geteDeep().hashCode());
        result = prime * result + ((getMaterial() == null) ? 0 : getMaterial().hashCode());
        result = prime * result + ((getdType() == null) ? 0 : getdType().hashCode());
        result = prime * result + ((getdS() == null) ? 0 : getdS().hashCode());
        result = prime * result + ((getFlowdirect() == null) ? 0 : getFlowdirect().hashCode());
        result = prime * result + ((getRoad() == null) ? 0 : getRoad().hashCode());
        result = prime * result + ((getQs() == null) ? 0 : getQs().hashCode());
        result = prime * result + ((getLen() == null) ? 0 : getLen().hashCode());
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
        sb.append(", shapeLeng=").append(shapeLeng);
        sb.append(", nearFid=").append(nearFid);
        sb.append(", nearDist=").append(nearDist);
        sb.append(", pipeid=").append(pipeid);
        sb.append(", sPoint=").append(sPoint);
        sb.append(", ePoint=").append(ePoint);
        sb.append(", sDeep=").append(sDeep);
        sb.append(", eDeep=").append(eDeep);
        sb.append(", material=").append(material);
        sb.append(", dType=").append(dType);
        sb.append(", dS=").append(dS);
        sb.append(", flowdirect=").append(flowdirect);
        sb.append(", road=").append(road);
        sb.append(", qs=").append(qs);
        sb.append(", len=").append(len);
        sb.append(", geom=").append(geom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}