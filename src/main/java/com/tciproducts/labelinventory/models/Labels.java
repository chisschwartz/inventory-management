package com.tciproducts.labelinventory.models;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Primary;

@Entity
@Table(name = "labels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Labels extends AbstractEntity {

//    @Size(min = 3, max = 5, message = "code needs to be between 3 and 5 digits")
    private Integer labelCode;

    private String labelAlias;

    private String company;

    @OneToMany
    @JoinColumn (name = "label_code", referencedColumnName = "labelCode")
    private Set<Sizing> sizes;
}
