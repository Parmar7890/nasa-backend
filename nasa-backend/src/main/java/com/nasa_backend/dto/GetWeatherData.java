package com.nasa_backend.dto;

import com.sun.tools.javac.Main;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
//@Builder
//@AllArgsConstructor
public class GetWeatherData {

    private String name;
    private Main main;
    private List<Weather> weather;

    @Data
    public static class Main {
        private double temp;
        private int humidity;
    }

    @Data
    public static class Weather {
        private String description;
        private String icon;
    }

}
