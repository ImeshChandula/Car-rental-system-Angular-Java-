package com.example.car_rental_spring.dto;

import com.example.car_rental_spring.enums.UserRole;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;
    private UserRole userRole;
    private Long userId;

}
