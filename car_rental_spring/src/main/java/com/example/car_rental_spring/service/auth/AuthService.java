package com.example.car_rental_spring.service.auth;

import com.example.car_rental_spring.dto.SignupRequest;
import com.example.car_rental_spring.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
