package com.example.testmodul.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Column(nullable = false)
    private String name;

    @NotBlank
    @NotNull
    @Column(nullable = false)
    private double area;

    @NotBlank
    @NotNull
    @Column(nullable = false)
    private Long population;

    @NotBlank
    @NotNull
    @Column(nullable = false)
    private double GDP;


    @NotBlank
    @NotNull
    private String description;

    @ManyToOne
    private Country country;
}
