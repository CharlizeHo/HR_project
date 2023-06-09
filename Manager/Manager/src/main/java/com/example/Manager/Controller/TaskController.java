package com.example.Manager.Controller;

import com.example.Manager.Model.*;
import com.example.Manager.Reponsittory.TaskRepository;
import com.example.Manager.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Task")
@CrossOrigin("http://localhost:3000")
public class TaskController {

    long millis=System.currentTimeMillis();

    // creating a new object of the class Date
    java.sql.Date date = new java.sql.Date(millis);
    @Autowired
    private TaskRepository taskRepository;
    @PostMapping("/add")
    Task newTask (@RequestBody Task newTask){

        Task task = Task.builder()
                .task_name(newTask.getTask_name())
                .task_description(newTask.getTask_description())
                .task_start(newTask.getTask_start())
                .task_end(newTask.getTask_end())
                .user_creTask(newTask.getUser_creTask())
                .customer(newTask.getCustomer())
                .someoneDidIt(false)
                .build();

        return taskRepository.save(task);
    }

    @GetMapping("/getTask")
    List<Task> getAllTask(){
        return taskRepository.findAll();
    }

    @GetMapping("/getTask/{id}")
    Task getTaskbyId(@PathVariable int id){
        return taskRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

//    @PostMapping ("/getTask/test")
//    boolean getTaskClass(@RequestBody int idTask) {
//        return taskRepository.findById(idTask)
//                .map(taskUpdate -> {
//                    taskUpdate.setSomeoneDidIt(true);
//
//                    taskRepository.save(taskUpdate);
//                    return true;
//                }).orElseThrow(() -> new UserNotFoundException(idTask));
//    }
//
@PutMapping("/updateTask/{id}")
Task updateTask(@RequestBody Task newTask, @PathVariable int id){
    return taskRepository.findById(id).map(task -> {
        task.setTask_name(newTask.getTask_name());
        task.setTask_description(newTask.getTask_description());
        task.setTask_start(newTask.getTask_start());
        task.setTask_end(newTask.getTask_end());
        task.setExtension_time(newTask.getExtension_time());
        task.setTask_mod_date(date);
        return taskRepository.save((task));
    }).orElseThrow(() -> new UserNotFoundException(id));
}
//
@DeleteMapping("/deleteTask/{id}")
String deleteTask (@PathVariable int id){
    if (!taskRepository.existsById(id)) {
        throw new UserNotFoundException(id);
    }
    taskRepository.deleteById(id);
    return "Deleted successfully";
}

//    @GetMapping("/Testquery")
//    List<UserTask> test(){
//
//        return taskRepository.getOOP();
//    }
}
