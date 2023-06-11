package com.example.Manager.Reponsittory;

import com.example.Manager.Model.StateTask;
import com.example.Manager.Model.Task;
import com.example.Manager.Model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {


    int countBySomeoneDidIt(boolean check);


    List<Task> findBySomeoneDidIt(boolean b);
}
