package com.example.testmodul.service;

import com.example.testmodul.model.Country;
import com.example.testmodul.repository.ICountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService implements ICountryService{
    @Autowired
    ICountryRepository iCountryRepository;
    @Override
    public List<Country> findAll() {
        return iCountryRepository.findAll();
    }

    @Override
    public Optional<Country> findById(Long id) {
        return iCountryRepository.findById(id);
    }

    @Override
    public Country save(Country country) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
