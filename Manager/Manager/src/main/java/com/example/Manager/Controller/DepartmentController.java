package com.example.Manager.Controller;


import com.example.Manager.Model.Department;
import com.example.Manager.Reponsittory.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Department")
public class DepartmentController {

    @Autowired
    DepartmentRepository departmentRepository;

    @PostMapping("/newDeparment")
    Department newDepartment(@RequestBody Department department){
        return departmentRepository.save(department);
    }



}
