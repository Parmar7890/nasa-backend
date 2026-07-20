package com.nasa_backend.dto;

import com.nasa_backend.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String fullname;
    private String email;
    private LocalDate dob;
    private Gender gender;
}
