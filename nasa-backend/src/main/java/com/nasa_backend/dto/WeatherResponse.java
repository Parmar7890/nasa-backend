package com.nasa_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
//@AllArgsConstructor
public class WeatherResponse {

    private String city;
    private double temperature;
    private int humidity;
    private String description;
    private String iconUrl;
}
