package com.example.car_rental_spring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.car_rental_spring.entity.User;
import com.example.car_rental_spring.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);

}
