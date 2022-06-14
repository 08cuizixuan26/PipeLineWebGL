package com.ruoyi.hdsw.model;

import java.io.Serializable;

/**
 * @author 
 * wxm
 */
public class Wspoints implements Serializable {
    private Integer gid;

    private String expNo;

    private Double surfH;

    private String feature;

    private String subsid;

    private String location;

    private Object geom;

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

    public Double getSurfH() {
        return surfH;
    }

    public void setSurfH(Double surfH) {
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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
        Wspoints other = (Wspoints) that;
        return (this.getGid() == null ? other.getGid() == null : this.getGid().equals(other.getGid()))
            && (this.getExpNo() == null ? other.getExpNo() == null : this.getExpNo().equals(other.getExpNo()))
            && (this.getSurfH() == null ? other.getSurfH() == null : this.getSurfH().equals(other.getSurfH()))
            && (this.getFeature() == null ? other.getFeature() == null : this.getFeature().equals(other.getFeature()))
            && (this.getSubsid() == null ? other.getSubsid() == null : this.getSubsid().equals(other.getSubsid()))
            && (this.getLocation() == null ? other.getLocation() == null : this.getLocation().equals(other.getLocation()))
            && (this.getGeom() == null ? other.getGeom() == null : this.getGeom().equals(other.getGeom()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getExpNo() == null) ? 0 : getExpNo().hashCode());
        result = prime * result + ((getSurfH() == null) ? 0 : getSurfH().hashCode());
        result = prime * result + ((getFeature() == null) ? 0 : getFeature().hashCode());
        result = prime * result + ((getSubsid() == null) ? 0 : getSubsid().hashCode());
        result = prime * result + ((getLocation() == null) ? 0 : getLocation().hashCode());
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
        sb.append(", expNo=").append(expNo);
        sb.append(", surfH=").append(surfH);
        sb.append(", feature=").append(feature);
        sb.append(", subsid=").append(subsid);
        sb.append(", location=").append(location);
        sb.append(", geom=").append(geom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}