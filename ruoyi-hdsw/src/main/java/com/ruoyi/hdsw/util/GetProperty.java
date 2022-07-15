package com.ruoyi.hdsw.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource(value= "application.yml")
@ConfigurationProperties(prefix = "ruoyi")
public class GetProperty {
    private String ip;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    private String lineModel;
    private String pointModel;

    public String getLineModel() {
        return lineModel;
    }

    public void setLineModel(String lineModel) {
        this.lineModel = lineModel;
    }

    public String getPointModel() {
        return pointModel;
    }

    public void setPointModel(String pointModel) {
        this.pointModel = pointModel;
    }
}
