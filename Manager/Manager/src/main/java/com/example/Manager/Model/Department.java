package com.example.Manager.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Department implements Serializable {

    private static final long serialVersionUID=1L;


    @Id
    @Column(name = "department_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String departmentName;



}
