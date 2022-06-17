package com.ruoyi.hdsw.model;

import java.io.Serializable;

public class Gxtype implements Serializable {
    private String id;
    private String name;
    private String time;
    private String deletewhether;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDeletewhether() {
        return deletewhether;
    }

    public void setDeletewhether(String deletewhether) {
        this.deletewhether = deletewhether;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Gxtype gxtype = (Gxtype) o;

        if (id != null ? !id.equals(gxtype.id) : gxtype.id != null) return false;
        if (name != null ? !name.equals(gxtype.name) : gxtype.name != null) return false;
        if (time != null ? !time.equals(gxtype.time) : gxtype.time != null) return false;
        return deletewhether != null ? deletewhether.equals(gxtype.deletewhether) : gxtype.deletewhether == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (deletewhether != null ? deletewhether.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Gxtype{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", time='" + time + '\'' +
                ", deletewhether='" + deletewhether + '\'' +
                '}';
    }
}