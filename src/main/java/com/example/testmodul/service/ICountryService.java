package com.example.testmodul.service;

import com.example.testmodul.model.Country;

import java.util.List;
import java.util.Optional;

public interface ICountryService {
    List<Country> findAll();

    Optional<Country> findById(Long id);

    Country save (Country country);

    void delete(Long id);
}
