package com.example.Manager.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Customer implements Serializable {

    private static final long serialVersionUID=1L;

    @Column(name = "customer_id")
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_seq")
    @SequenceGenerator(name = "customer_seq", sequenceName = "CUSTOMER_SEQUENCE", allocationSize = 1)
    private int customer_id;

    private String customerName;

    private String customer_phonenum;
    private String customer_address;

    private String projectRequired;

    private boolean isAcivity;

    private java.sql.Date customer_cre_date;

    private java.sql.Date customer_mod_date;

}
