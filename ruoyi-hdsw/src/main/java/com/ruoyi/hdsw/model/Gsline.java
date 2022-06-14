package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author 
 * wxm
 */
public class Gsline implements Serializable {
    private Integer gid;

    private Integer id;

    private BigDecimal 长度;

    private Object geom;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal get长度() {
        return 长度;
    }

    public void set长度(BigDecimal 长度) {
        this.长度 = 长度;
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
        Gsline other = (Gsline) that;
        return (this.getGid() == null ? other.getGid() == null : this.getGid().equals(other.getGid()))
            && (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.get长度() == null ? other.get长度() == null : this.get长度().equals(other.get长度()))
            && (this.getGeom() == null ? other.getGeom() == null : this.getGeom().equals(other.getGeom()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((get长度() == null) ? 0 : get长度().hashCode());
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
        sb.append(", id=").append(id);
        sb.append(", 长度=").append(长度);
        sb.append(", geom=").append(geom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}