package com.ruoyi.hdsw.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author wxm
 */
public class Wslines implements Serializable {
    private Integer gid;

    private String name;

    private String pipeid;

    private String ePoint;

    private String sPoint;

    private Double sDeep;

    private Double eDeep;

    private String material;

    private String dType;

    private Double dS;

    private Integer flowdirect;

    private BigDecimal shapeLe3;

    private String road;

    private Object geom;

    private String state;
    private String stateTxt;

    private String delState;
    private String delStateTxt;

    private String updState;
    private String updStateTxt;

    private static final long serialVersionUID = 1L;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPipeid() {
        return pipeid;
    }

    public void setPipeid(String pipeid) {
        this.pipeid = pipeid;
    }

    public String getePoint() {
        return ePoint;
    }

    public void setePoint(String ePoint) {
        this.ePoint = ePoint;
    }

    public String getsPoint() {
        return sPoint;
    }

    public void setsPoint(String sPoint) {
        this.sPoint = sPoint;
    }

    public Double getsDeep() {
        return sDeep;
    }

    public void setsDeep(Double sDeep) {
        this.sDeep = sDeep;
    }

    public Double geteDeep() {
        return eDeep;
    }

    public void seteDeep(Double eDeep) {
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

    public Double getdS() {
        return dS;
    }

    public void setdS(Double dS) {
        this.dS = dS;
    }

    public Integer getFlowdirect() {
        return flowdirect;
    }

    public void setFlowdirect(Integer flowdirect) {
        this.flowdirect = flowdirect;
    }

    public BigDecimal getShapeLe3() {
        return shapeLe3;
    }

    public void setShapeLe3(BigDecimal shapeLe3) {
        this.shapeLe3 = shapeLe3;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDelState() {
        return delState;
    }

    public void setDelState(String delState) {
        this.delState = delState;
        if ("00".equals(delState)) {
            this.setDelStateTxt("正常");
        } else if ("10".equals(delState)) {
            this.setDelStateTxt("删除");
        } else if ("12".equals(delState)) {
            this.setDelStateTxt("废弃");
        } else if ("13".equals(delState)) {
            this.setDelStateTxt("已增加未同步");
        } else if ("14".equals(delState)) {
            this.setDelStateTxt("已增加已同步");
        } else if ("15".equals(delState)) {
            this.setDelStateTxt("已删除未同步");
        } else if ("16".equals(delState)) {
            this.setDelStateTxt("已删除已同步");
        } else if ("17".equals(delState)) {
            this.setDelStateTxt("已废弃未同步");
        } else if ("18".equals(delState)) {
            this.setDelStateTxt("已废弃已同步");
        } else {
            this.setDelStateTxt("正常");
        }
    }

    public String getUpdState() {
        return updState;
    }

    public void setUpdState(String updState) {
        this.updState = updState;
    }

    public String getStateTxt() {
        return stateTxt;
    }

    public void setStateTxt(String stateTxt) {
        this.stateTxt = stateTxt;
    }

    public String getDelStateTxt() {
        return delStateTxt;
    }

    public void setDelStateTxt(String delStateTxt) {
        this.delStateTxt = delStateTxt;
    }

    public String getUpdStateTxt() {
        return updStateTxt;
    }

    public void setUpdStateTxt(String updStateTxt) {
        this.updStateTxt = updStateTxt;
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
        Wslines other = (Wslines) that;
        return (this.getGid() == null ? other.getGid() == null : this.getGid().equals(other.getGid()))
                && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
                && (this.getPipeid() == null ? other.getPipeid() == null : this.getPipeid().equals(other.getPipeid()))
                && (this.getePoint() == null ? other.getePoint() == null : this.getePoint().equals(other.getePoint()))
                && (this.getsPoint() == null ? other.getsPoint() == null : this.getsPoint().equals(other.getsPoint()))
                && (this.getsDeep() == null ? other.getsDeep() == null : this.getsDeep().equals(other.getsDeep()))
                && (this.geteDeep() == null ? other.geteDeep() == null : this.geteDeep().equals(other.geteDeep()))
                && (this.getMaterial() == null ? other.getMaterial() == null : this.getMaterial().equals(other.getMaterial()))
                && (this.getdType() == null ? other.getdType() == null : this.getdType().equals(other.getdType()))
                && (this.getdS() == null ? other.getdS() == null : this.getdS().equals(other.getdS()))
                && (this.getFlowdirect() == null ? other.getFlowdirect() == null : this.getFlowdirect().equals(other.getFlowdirect()))
                && (this.getShapeLe3() == null ? other.getShapeLe3() == null : this.getShapeLe3().equals(other.getShapeLe3()))
                && (this.getRoad() == null ? other.getRoad() == null : this.getRoad().equals(other.getRoad()))
                && (this.getState() == null ? other.getState() == null : this.getState().equals(other.getState()))
                && (this.getDelState() == null ? other.getDelState() == null : this.getDelState().equals(other.getDelState()))
                && (this.getUpdState() == null ? other.getUpdState() == null : this.getUpdState().equals(other.getUpdState()))
                && (this.getGeom() == null ? other.getGeom() == null : this.getGeom().equals(other.getGeom()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getGid() == null) ? 0 : getGid().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getPipeid() == null) ? 0 : getPipeid().hashCode());
        result = prime * result + ((getePoint() == null) ? 0 : getePoint().hashCode());
        result = prime * result + ((getsPoint() == null) ? 0 : getsPoint().hashCode());
        result = prime * result + ((getsDeep() == null) ? 0 : getsDeep().hashCode());
        result = prime * result + ((geteDeep() == null) ? 0 : geteDeep().hashCode());
        result = prime * result + ((getMaterial() == null) ? 0 : getMaterial().hashCode());
        result = prime * result + ((getdType() == null) ? 0 : getdType().hashCode());
        result = prime * result + ((getdS() == null) ? 0 : getdS().hashCode());
        result = prime * result + ((getFlowdirect() == null) ? 0 : getFlowdirect().hashCode());
        result = prime * result + ((getShapeLe3() == null) ? 0 : getShapeLe3().hashCode());
        result = prime * result + ((getRoad() == null) ? 0 : getRoad().hashCode());
        result = prime * result + ((getGeom() == null) ? 0 : getGeom().hashCode());
        result = prime * result + ((getState() == null) ? 0 : getState().hashCode());
        result = prime * result + ((getDelState() == null) ? 0 : getDelState().hashCode());
        result = prime * result + ((getUpdState() == null) ? 0 : getUpdState().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", gid=").append(gid);
        sb.append(", name=").append(name);
        sb.append(", pipeid=").append(pipeid);
        sb.append(", ePoint=").append(ePoint);
        sb.append(", sPoint=").append(sPoint);
        sb.append(", sDeep=").append(sDeep);
        sb.append(", eDeep=").append(eDeep);
        sb.append(", material=").append(material);
        sb.append(", dType=").append(dType);
        sb.append(", dS=").append(dS);
        sb.append(", flowdirect=").append(flowdirect);
        sb.append(", shapeLe3=").append(shapeLe3);
        sb.append(", road=").append(road);
        sb.append(", geom=").append(geom);
        sb.append(", state=").append(state);
        sb.append(", delState=").append(delState);
        sb.append(", updState=").append(updState);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}