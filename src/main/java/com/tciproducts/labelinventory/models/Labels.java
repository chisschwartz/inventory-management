package com.tciproducts.labelinventory.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "labels")
@Getter
@Setter
public class Labels extends AbstractEntity {

//    @Size(min = 3, max = 5, message = "code needs to be between 3 and 5 digits")
    private Integer labelCode;

    private String labelAlias;

    private String company;

    @OneToMany
    @JoinColumn (name = "labelCode", referencedColumnName = "labelCode")
    private Set<Sizing> sizes;
}
