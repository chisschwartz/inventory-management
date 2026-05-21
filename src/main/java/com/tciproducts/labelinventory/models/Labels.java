package com.tciproducts.labelinventory.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "labels")
@Getter
@Setter
public class Labels extends AbstractEntity {

//    @Size(min = 3, max = 5, message = "code needs to be between 3 and 5 digits")
    private Integer labelCode;

    private String labelAlias;

    private String company;
}
