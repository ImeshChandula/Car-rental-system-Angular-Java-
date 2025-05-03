package com.example.car_rental_spring.service.admin;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.example.car_rental_spring.dto.CarDto;
import com.example.car_rental_spring.entity.Car;
import com.example.car_rental_spring.repository.CarRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;

    @Override
    public boolean postCar(CarDto carDto) throws IOException {
        try{
            Car car = new Car();
            car.setName(carDto.getName());
            car.setBrand(carDto.getBrand());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setYear(carDto.getYear());
            car.setType(carDto.getType());
            car.setDescription(carDto.getDescription());
            car.setTransmission(carDto.getTransmission());
            car.setImage(carDto.getImage().getBytes());

            carRepository.save(car);

            return true;
        } catch(IOException e){
            e.printStackTrace();
            return false;
        }

    }

}
