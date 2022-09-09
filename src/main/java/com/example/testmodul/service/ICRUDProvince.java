package com.example.testmodul.service;

import com.example.testmodul.model.Province;

import java.util.List;
import java.util.Optional;

public interface ICRUDProvince {
    List<Province> findAll();

    Optional<Province> findById(Long id);

    Province save (Province province);

    void delete(Long id);
}
