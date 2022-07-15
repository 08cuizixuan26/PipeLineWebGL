package com.ruoyi.hdsw.model;

public class Gxcontrol {
    private String gid;
    private String width;
    private String color;
    private String visibility;
    private String iocn;

    public String getGid() {
        return gid;
    }

    public void setGid(String gid) {
        this.gid = gid;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
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
