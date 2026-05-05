package com.tciproducts.labelinventory.models;

import jakarta.annotation.Nullable;
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

    @Size(min = 3, max = 5, message = "code needs to be between 3 and 5 digits")
    private Integer labelCode;

    private String labelAlias;

    @Size(max = 2, message = "label size needs to be 2 characters")
    private String labelSize;

    @Nullable
    private Integer quantity;

    @Nullable
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(@Nullable Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return labelSize;
    }
}
