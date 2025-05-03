package com.example.car_rental_spring.service.admin;

import java.io.IOException;

import com.example.car_rental_spring.dto.CarDto;

public interface AdminService {

    boolean postCar(CarDto carDto) throws IOException;

}
