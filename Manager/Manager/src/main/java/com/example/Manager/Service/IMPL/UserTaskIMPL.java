package com.example.Manager.Service.IMPL;

import com.example.Manager.DTO.AllCountTask;
import com.example.Manager.Model.StateTask;
import com.example.Manager.Model.Task;
import com.example.Manager.Reponsittory.TaskRepository;
import com.example.Manager.Reponsittory.UserReponsitory;
import com.example.Manager.Reponsittory.UserTaskRepository;
import com.example.Manager.Service.UserTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTaskIMPL implements UserTaskService {
    @Autowired
    UserReponsitory userReponsitory;
    @Autowired
    UserTaskRepository userTaskRepository;

    @Autowired
    TaskRepository taskRepository;


    @Override
    public StateTask getStateFinishef(Task task, java.sql.Date date){
        StateTask stateTask = null;

        java.sql.Date timeEnd,extensionTime;
        timeEnd=task.getTask_end();
        extensionTime=task.getExtension_time();
        if (extensionTime == null){
            if (date.compareTo(timeEnd)>0){
                stateTask= StateTask.Late;
            }else {
                stateTask= StateTask.Finish;
            }
        }if (extensionTime != null){
            if (date.compareTo(extensionTime)>0){
                stateTask= StateTask.Late;
            }else {
                stateTask= StateTask.Finish;
            }
        }

    return stateTask;
    }

    @Override
    public AllCountTask getNumberALLStateTask(){
        int finish =userTaskRepository.countByState(StateTask.Finish);
        int late =userTaskRepository.countByState(StateTask.Late);
        int doing =userTaskRepository.countByState(StateTask.Doing);
        int fail =userTaskRepository.countByState(StateTask.Fail);
        int waitting=taskRepository.countBySomeoneDidIt(false);
        int all= (int) taskRepository.count();
        AllCountTask countTask = new AllCountTask(all,fail,doing,waitting,late,finish);
        return countTask;
    }

}
