package com.example.Manager.Controller;

import com.example.Manager.DTO.AllCountTask;
import com.example.Manager.DTO.ListUserTask;
import com.example.Manager.Model.StateTask;
import com.example.Manager.Model.Task;
import com.example.Manager.Model.UserTask;
import com.example.Manager.Reponsittory.TaskRepository;
import com.example.Manager.Reponsittory.UserReponsitory;
import com.example.Manager.Reponsittory.UserTaskRepository;
import com.example.Manager.Service.UserTaskService;
import com.example.Manager.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/userTask")
public class UserTaskController {
    @Autowired
    UserTaskRepository userTaskRepository;
    UserReponsitory userReponsitory;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserTaskService userTaskService;


//    @PostMapping("/getTask/userdo")
//    UserTask getTaskClass(@RequestBody UserTask userTask){
//       boolean check = checkExistTask(userTask.getIdtask());
//        if(check == true){
//            UserTask getTask = UserTask.builder()
//                    .idtask(userTask.getIdtask())
//                    .iduser(userTask.getIduser())
//                    .state(StateTask.Doing)
//                    .build();
//            return userTaskRepository.save(getTask);
//        }return null;
//    }
    boolean checkExistTask(int id){
        return taskRepository.findById(id)
                .map(taskUpdate -> {
                    taskUpdate.setSomeoneDidIt(true);

                    taskRepository.save(taskUpdate);
                    return true;
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PostMapping("/getTask/userdo")
    UserTask getTaskClass(@RequestBody UserTask userTask){
        Task tak= userTask.getTask();
        boolean check = checkExistTask(tak.getTask_id());
        if(check == true){
            UserTask getTask = UserTask.builder()
                    .task(userTask.getTask())
                    .user(userTask.getUser())
                    .state(StateTask.Doing)
                    .build();
            return userTaskRepository.save(getTask);
        }return null;
    }

//    @GetMapping("/TEST")
//    List<ListUserTask> getOpp(){
//        return userTaskRepository.getListUserTaskDTO();
//    }

    @GetMapping("/getAll")
    List<UserTask> getAll(){
        return userTaskRepository.findAll();
    }

    long millis=System.currentTimeMillis();
    // creating a new object of the class Date
    java.sql.Date date = new java.sql.Date(millis);
    @PostMapping("/submit-task/{id}")
    UserTask submitTask(@PathVariable int id){
        UserTask userTask= userTaskRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));

        Task task= userTask.getTask();
        StateTask stateTask= userTaskService.getStateFinishef(task,date);
        return userTaskRepository.findById(id)
                .map(submit->{
                    submit.setState(stateTask);
                    submit.setTime_finished(date);
                    return userTaskRepository.save(submit);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/fillervalue")
    AllCountTask getCountTask(){
//        final Set< UserTask > itemUserTask = new HashSet< >();
//
//        List<UserTask> tasktmp= userTaskRepository.findAll();
//        tasktmp.forEach(item->{
//            if(StateTask.Late.equals(item.getState())){
//                itemUserTask.add(item);
//
//            }
//        });
//
//        System.out.println(itemUserTask);
//        System.out.println(tasktmp);
//        return itemUserTask;
        //        int late =userTaskRepository.countByState(StateTask.Late);
//        int doing =userTaskRepository.countByState(StateTask.Doing);
//        int fail =userTaskRepository.countByState(StateTask.Fail);
//        int Waitting=taskRepository.countBySomeoneDidIt(true);
//        int all= (int) taskRepository.count();
//        AllCountTask countTask = new AllCountTask(100,fail,doing,4,late,finish);
        return userTaskService.getNumberALLStateTask();
    }
}
