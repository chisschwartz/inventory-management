package com.tciproducts.labelinventory.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "size")
@Getter
@Setter
public class Sizing extends AbstractEntity {

    private String size;

    private Integer quantity;

    @Column(name = "label_code")
    private int labelCode;
}