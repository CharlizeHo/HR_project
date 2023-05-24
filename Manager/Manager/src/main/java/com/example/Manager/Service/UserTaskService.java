package com.example.Manager.Service;


import com.example.Manager.DTO.AllCountTask;
import com.example.Manager.Model.StateTask;
import com.example.Manager.Model.Task;
import org.springframework.stereotype.Service;

@Service
public interface UserTaskService {

    StateTask getStateFinishef(Task task, java.sql.Date date);
    AllCountTask getNumberALLStateTask();
}
