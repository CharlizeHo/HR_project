package com.example.Manager.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task implements  Serializable {

    private static final long serialVersionUID = 1L;

        @Column(name = "task_id")
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq")
        @SequenceGenerator(name = "task_seq", sequenceName = "TASK_SEQUENCE", allocationSize = 1)
        private int task_id;
        @Column(name = "task_name",unique = true )
        private String task_name;
        private String task_description;
        private java.sql.Date task_end;
        private java.sql.Date task_start;
        private java.sql.Date extension_time;
        private boolean someoneDidIt;
        private Date task_mod_date;

        @ManyToOne
        @JoinColumn(name = "user_creTask",referencedColumnName = "user_id")
        private User user_creTask;

        @ManyToOne
        @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
        private Customer customer;
//    idCustomerOfProject


}
