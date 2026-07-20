package com.nasa_backend.service;

import com.nasa_backend.dto.EpicResponse;
import com.nasa_backend.dto.ImageListResponse;
import com.nasa_backend.dto.ImageResponse;
import com.nasa_backend.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class NasaService {

    @Value("${nasa.api.url}")
    private String apiUrl;

    @Value("${nasa.api.key}")
    private String apiKey;


    private final WebClient webClient;

    public NasaService(WebClient webClient) {
        this.webClient = webClient;
    }


    public ImageResponse getEpicImages() {
//        String url = apiUrl + "?api_key=" + apiKey;

        try{
            EpicResponse[] responses = webClient
                    .get()
                    .uri(apiUrl + "?api_key=" + apiKey)
                    .retrieve()
                    .bodyToMono(EpicResponse[].class)
                    .block();


            if(responses == null || responses.length == 0) {
                throw new ApiException("no earth image found");
            }

            EpicResponse latestImage = responses[0];

            String[] dateParts = latestImage.getDate().split(" ")[0].split("-");
            String year = dateParts[0];
            String month = dateParts[1];
            String day = dateParts[2];

            String imageUrl = "https://api.nasa.gov/EPIC/archive/natural/"
                    + year + "/"
                    + month + "/"
                    + day + "/png/"
                    + latestImage.getImage()
                    + ".png?api_key=" + apiKey;

            return new ImageResponse(imageUrl, latestImage.getDate());
        }
        catch (Exception e) {
            e.printStackTrace();

            throw new ApiException(e.getMessage());
        }
    }

    public List<ImageListResponse> getLast10Images() {
        try{
            EpicResponse[] responses = webClient
                    .get()
                    .uri(apiUrl + "?api_key=" + apiKey)
                    .retrieve()
                    .bodyToMono(EpicResponse[].class)
                    .block();

            if(responses == null || responses.length == 0) {
                throw new ApiException("No Earth image found");
            }

            List<ImageListResponse> imageList = new ArrayList<>();
            int count = Math.min(10, responses.length);

            for(int i = 0; i < count; i++) {
                EpicResponse image = responses[i];

                String[] dateParts = image.getDate().split(" ")[0].split("-");

                String imageUrl = "https://api.nasa.gov/EPIC/archive/natural/"
                        + dateParts[0] + "/"
                        + dateParts[1] + "/"
                        + dateParts[2] + "/png/"
                        + image.getImage()
                        + ".png?api_key=" + apiKey;

                imageList.add(
                        new ImageListResponse(imageUrl, image.getDate())
                );
            }
            return imageList;


        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }
}

