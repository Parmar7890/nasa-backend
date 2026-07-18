package com.nasa_backend.controller;

import com.nasa_backend.dto.EpicResponse;
import com.nasa_backend.dto.ImageListResponse;
import com.nasa_backend.dto.ImageResponse;
import com.nasa_backend.service.NasaService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/nasa")
public class NasaController {


    private final NasaService nasaService;

    public NasaController(NasaService nasaService){
        this.nasaService = nasaService;
    }

    @GetMapping("/earth")
    public ImageResponse getEpicImages() {
        return nasaService.getEpicImages();
    }

    @GetMapping("/images")
    public List<ImageListResponse> getLast10Images() {
        return nasaService.getLast10Images();
    }

}
