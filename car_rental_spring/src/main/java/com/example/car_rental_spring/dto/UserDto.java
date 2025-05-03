package com.example.car_rental_spring.dto;

import com.example.car_rental_spring.enums.UserRole;

import lombok.Data;

@Data
public class UserDto {
    private Long id;

    private String name;

    private String email;
    
    private UserRole userRole;
}
