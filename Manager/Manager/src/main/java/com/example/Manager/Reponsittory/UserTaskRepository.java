package com.example.Manager.Reponsittory;

import com.example.Manager.DTO.ListUserTask;
import com.example.Manager.Model.StateTask;
import com.example.Manager.Model.Task;
import com.example.Manager.Model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask,Integer> {


    int countByState(StateTask stateTask);
}
