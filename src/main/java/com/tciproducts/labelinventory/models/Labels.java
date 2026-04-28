package com.tciproducts.labelinventory.models;

import jakarta.persistence.Entity;

@Entity
public class Labels extends AbstractEntity {

    private Long labelCode;

    private String labelAlias;

    private String labelSize;
}
