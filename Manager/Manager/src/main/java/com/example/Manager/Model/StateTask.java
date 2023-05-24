package com.example.Manager.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;


@Table(name = "State")
public enum StateTask {

    Doing,
    Finish,
    Late,
    Waitting,
    Fail
}
