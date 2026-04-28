package com.tciproducts.labelinventory.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import org.springframework.data.annotation.Id;

@Entity
public class Labels {

    @Id
    @GeneratedValue
    private Long id;

    private Long labelCode;

    private String labelAlias;
}
