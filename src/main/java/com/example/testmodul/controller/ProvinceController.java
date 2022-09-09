package com.example.testmodul.controller;

import com.example.testmodul.model.Country;
import com.example.testmodul.model.Province;
import com.example.testmodul.service.ICRUDProvince;
import com.example.testmodul.service.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/provinces")
public class ProvinceController {
    @Autowired
    ICountryService iCountryService;

    @Autowired
    ICRUDProvince icrudProvince;

    @GetMapping("/countries")
    private ResponseEntity<List<Country>> findAllCountry() {
        return new ResponseEntity<>(iCountryService.findAll(), HttpStatus.OK);
    }

    @GetMapping
    private ResponseEntity<List<Province>> findAll() {
        return new ResponseEntity<>(icrudProvince.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{provinceId}")
    private ResponseEntity<Province> findProvinceById(@PathVariable Long provinceId) {
        Optional<Province> provinceOptional = icrudProvince.findById(provinceId);
        if (provinceOptional.isPresent()){
            return new ResponseEntity<>(provinceOptional.get(),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    private ResponseEntity<Province> createProvince(@RequestBody Province province){
        return new ResponseEntity<>(icrudProvince.save(province),HttpStatus.OK);
    }

    @DeleteMapping("/{provinceId}")
    private ResponseEntity<Void> deleteProvinceById( @PathVariable Long provinceId){
        icrudProvince.delete(provinceId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    private ResponseEntity<Province> updateProvince(@RequestBody Province province){
        Optional<Province>optionalProvince = icrudProvince.findById(province.getId());
        if(optionalProvince.isPresent()){
            return new ResponseEntity<>(icrudProvince.save(province),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}



