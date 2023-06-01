package com.example.Manager.Controller;


import com.example.Manager.Model.Department;
import com.example.Manager.Reponsittory.DepartmentRepository;
import com.example.Manager.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Department")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    @Autowired
    DepartmentRepository departmentRepository;

    @PostMapping("/add")
    Department newDepartment (@RequestBody Department newDepartment){
        return departmentRepository.save(newDepartment);
    }

    @GetMapping("/getDepartment")
    List<Department> getAllDepartment(){
        return departmentRepository.findAll();
    }

    @GetMapping("/getDepartment/{id}")
    Department getDepartmentbyId(@PathVariable int id){
        return departmentRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/getDepartment/{id}")
    Department updateDepartment(@RequestBody Department newDepartment, @PathVariable int id){
        return departmentRepository.findById(id).map(department -> {
            department.setDepartmentName(newDepartment.getDepartmentName());
            return departmentRepository.save((department));
        }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/getDepartment/{id}")
    String deleteDepartment (@PathVariable int id){
        if (!departmentRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        departmentRepository.deleteById(id);
        return "Deleted successfully";
    }


}
