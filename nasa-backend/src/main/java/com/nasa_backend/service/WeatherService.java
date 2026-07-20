package com.nasa_backend.service;

import com.nasa_backend.dto.GetWeatherData;
import com.nasa_backend.dto.WeatherResponse;
import com.nasa_backend.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WeatherService {

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public WeatherService(WebClient webClient) {
        this.webClient = webClient;
    }


    public WeatherResponse getWeatherData(String  city) {
        try {
            GetWeatherData response = webClient
                    .get()
                    .uri(apiUrl + "?q=" + city + "&units=metric&appid=" + apiKey)
                    .retrieve()
                    .bodyToMono(GetWeatherData.class)
                    .block();

            if (response == null) {
                throw new ApiException("No Data Found");
            }
            String iconUrl = "https://openweathermap.org/img/wn/"
                    + response.getWeather().get(0).getIcon()
                    + "@2x.png";
            return WeatherResponse.builder()
                    .city(response.getName())
                    .temperature(response.getMain().getTemp())
                    .humidity(response.getMain().getHumidity())
                    .description(response.getWeather().get(0).getDescription())
                    .iconUrl(iconUrl)
                    .build();

        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }
}
