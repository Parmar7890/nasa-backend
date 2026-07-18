package com.nasa_backend.dto;

import com.nasa_backend.entity.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class RegisterResponse {

    private Long id;
    private String fullname;
    private String email;
    private LocalDate dob;
    private Gender gender;
}
