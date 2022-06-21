package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author
 * null
 */
public class Gxmodel implements Serializable {
    private Integer gid;

    private BigDecimal shapeLeng;

    private String pipeid;

    private String sPoint;

    private String ePoint;

    private BigDecimal sDeep;

    private BigDecimal eDeep;

    private String material;

    private String dType;

    private String dS;

    private Integer flowdirect;

    private Double sHeight;

    private Double eHeight;

    private String bTime;

    private String state;

    private String type;

    private String road;

    private String owner;

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

    public BigDecimal getShapeLeng() {
        return shapeLeng;
    }

    public void setShapeLeng(BigDecimal shapeLeng) {
        this.shapeLeng = shapeLeng;
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

    public Double getsHeight() {
        return sHeight;
    }

    public void setsHeight(Double sHeight) {
        this.sHeight = sHeight;
    }

    public Double geteHeight() {
        return eHeight;
    }

    public void seteHeight(Double eHeight) {
        this.eHeight = eHeight;
    }

    public String getbTime() {
        return bTime;
    }

    public void setbTime(String bTime) {
        this.bTime = bTime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRoad() {
        return road;
    }

    public void setRoad(String road) {
        this.road = road;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
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
        result = prime * result + ((getShapeLeng() == null) ? 0 : getShapeLeng().hashCode());
        result = prime * result + ((getPipeid() == null) ? 0 : getPipeid().hashCode());
        result = prime * result + ((getsPoint() == null) ? 0 : getsPoint().hashCode());
        result = prime * result + ((getePoint() == null) ? 0 : getePoint().hashCode());
        result = prime * result + ((getsDeep() == null) ? 0 : getsDeep().hashCode());
        result = prime * result + ((geteDeep() == null) ? 0 : geteDeep().hashCode());
        result = prime * result + ((getMaterial() == null) ? 0 : getMaterial().hashCode());
        result = prime * result + ((getdType() == null) ? 0 : getdType().hashCode());
        result = prime * result + ((getdS() == null) ? 0 : getdS().hashCode());
        result = prime * result + ((getFlowdirect() == null) ? 0 : getFlowdirect().hashCode());
        result = prime * result + ((getsHeight() == null) ? 0 : getsHeight().hashCode());
        result = prime * result + ((geteHeight() == null) ? 0 : geteHeight().hashCode());
        result = prime * result + ((getbTime() == null) ? 0 : getbTime().hashCode());
        result = prime * result + ((getState() == null) ? 0 : getState().hashCode());
        result = prime * result + ((getType() == null) ? 0 : getType().hashCode());
        result = prime * result + ((getRoad() == null) ? 0 : getRoad().hashCode());
        result = prime * result + ((getOwner() == null) ? 0 : getOwner().hashCode());
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
        sb.append(", shapeLeng=").append(shapeLeng);
        sb.append(", pipeid=").append(pipeid);
        sb.append(", sPoint=").append(sPoint);
        sb.append(", ePoint=").append(ePoint);
        sb.append(", sDeep=").append(sDeep);
        sb.append(", eDeep=").append(eDeep);
        sb.append(", material=").append(material);
        sb.append(", dType=").append(dType);
        sb.append(", dS=").append(dS);
        sb.append(", flowdirect=").append(flowdirect);
        sb.append(", sHeight=").append(sHeight);
        sb.append(", eHeight=").append(eHeight);
        sb.append(", bTime=").append(bTime);
        sb.append(", state=").append(state);
        sb.append(", type=").append(type);
        sb.append(", road=").append(road);
        sb.append(", owner=").append(owner);
        sb.append(", geom=").append(geom);
        sb.append(", deleteState=").append(deleteState);
        sb.append(", updateState=").append(updateState);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}