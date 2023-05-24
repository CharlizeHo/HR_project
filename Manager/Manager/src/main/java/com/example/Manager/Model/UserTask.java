package com.example.Manager.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userTask")
public class UserTask {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int userTaskId;
//
//    private int iduser;
//    private int idtask;
//
//    private java.sql.Date time_finished;
//
//    private StateTask state;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userTaskId;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id",referencedColumnName = "task_id")
    private Task task;

    private java.sql.Date time_finished;

    private StateTask state;

}
