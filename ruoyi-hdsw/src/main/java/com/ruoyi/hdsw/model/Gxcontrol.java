package com.ruoyi.hdsw.model;

public class Gxcontrol {
    private Integer gid;
    private Double width;
    private String color;
    private String visibility;
    private String iocn;

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public String getIocn() {
        return iocn;
    }

    public void setIocn(String iocn) {
        this.iocn = iocn;
    }

    @Override
    public String toString() {
        return "Gxcontrol{" +
                "gid=" + gid +
                ", width=" + width +
                ", color='" + color + '\'' +
                ", visibility='" + visibility + '\'' +
                ", iocn='" + iocn + '\'' +
                '}';
    }
}
