package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author 
 * wxm
 */
public class Hdbj implements Serializable {
    private Integer gid;

    private Integer oid;

    private String name;

    private String folderpath;

    private Integer symbolid;

    private Short altmode;

    private BigDecimal base;

    private Short clamped;

    private Short extruded;

    private String snippet;

    private String popupinfo;

    private BigDecimal shapeLeng;

    private Object geom;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFolderpath() {
        return folderpath;
    }

    public void setFolderpath(String folderpath) {
        this.folderpath = folderpath;
    }

    public Integer getSymbolid() {
        return symbolid;
    }

    public void setSymbolid(Integer symbolid) {
        this.symbolid = symbolid;
    }

    public Short getAltmode() {
        return altmode;
    }

    public void setAltmode(Short altmode) {
        this.altmode = altmode;
    }

    public BigDecimal getBase() {
        return base;
    }

    public void setBase(BigDecimal base) {
        this.base = base;
    }

    public Short getClamped() {
        return clamped;
    }

    public void setClamped(Short clamped) {
        this.clamped = clamped;
    }

    public Short getExtruded() {
        return extruded;
    }

    public void setExtruded(Short extruded) {
        this.extruded = extruded;
    }

    public String getSnippet() {
        return snippet;
    }

    public void setSnippet(String snippet) {
        this.snippet = snippet;
    }

    public String getPopupinfo() {
        return popupinfo;
    }

    public void setPopupinfo(String popupinfo) {
        this.popupinfo = popupinfo;
    }

    public BigDecimal getShapeLeng() {
        return shapeLeng;
    }

    public void setShapeLeng(BigDecimal shapeLeng) {
        this.shapeLeng = shapeLeng;
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
        Hdbj other = (Hdbj) that;
        return (this.getGid() == null ? other.getGid() == null : this.getGid().equals(other.getGid()))
            && (this.getOid() == null ? other.getOid() == null : this.getOid().equals(other.getOid()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getFolderpath() == null ? other.getFolderpath() == null : this.getFolderpath().equals(other.getFolderpath()))
            && (this.getSymbolid() == null ? other.getSymbolid() == null : this.getSymbolid().equals(other.getSymbolid()))
            && (this.getAltmode() == null ? other.getAltmode() == null : this.getAltmode().equals(other.getAltmode()))
            && (this.getBase() == null ? other.getBase() == null : this.getBase().equals(other.getBase()))
            && (this.getClamped() == null ? other.getClamped() == null : this.getClamped().equals(other.getClamped()))
            && (this.getExtruded() == null ? other.getExtruded() == null : this.getExtruded().equals(other.getExtruded()))
            && (this.getSnippet() == null ? other.getSnippet() == null : this.getSnippet().equals(other.getSnippet()))
            && (this.getPopupinfo() == null ? other.getPopupinfo() == null : this.getPopupinfo().equals(other.getPopupinfo()))
            && (this.getShapeLeng() == null ? other.getShapeLeng() == null : this.getShapeLeng().equals(other.getShapeLeng()))
            && (this.getGeom() == null ? other.getGeom() == null : this.getGeom().equals(other.getGeom()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getOid() == null) ? 0 : getOid().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getFolderpath() == null) ? 0 : getFolderpath().hashCode());
        result = prime * result + ((getSymbolid() == null) ? 0 : getSymbolid().hashCode());
        result = prime * result + ((getAltmode() == null) ? 0 : getAltmode().hashCode());
        result = prime * result + ((getBase() == null) ? 0 : getBase().hashCode());
        result = prime * result + ((getClamped() == null) ? 0 : getClamped().hashCode());
        result = prime * result + ((getExtruded() == null) ? 0 : getExtruded().hashCode());
        result = prime * result + ((getSnippet() == null) ? 0 : getSnippet().hashCode());
        result = prime * result + ((getPopupinfo() == null) ? 0 : getPopupinfo().hashCode());
        result = prime * result + ((getShapeLeng() == null) ? 0 : getShapeLeng().hashCode());
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
        sb.append(", oid=").append(oid);
        sb.append(", name=").append(name);
        sb.append(", folderpath=").append(folderpath);
        sb.append(", symbolid=").append(symbolid);
        sb.append(", altmode=").append(altmode);
        sb.append(", base=").append(base);
        sb.append(", clamped=").append(clamped);
        sb.append(", extruded=").append(extruded);
        sb.append(", snippet=").append(snippet);
        sb.append(", popupinfo=").append(popupinfo);
        sb.append(", shapeLeng=").append(shapeLeng);
        sb.append(", geom=").append(geom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}