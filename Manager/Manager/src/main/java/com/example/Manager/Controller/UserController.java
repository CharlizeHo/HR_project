package com.example.Manager.Controller;

import com.example.Manager.DTO.UserDTO;
import com.example.Manager.Model.User;
import com.example.Manager.Reponsittory.UserReponsitory;
import com.example.Manager.exception.ReponseMessage;
import com.example.Manager.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/UserCol")
@CrossOrigin("http://localhost:3000/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserReponsitory userReponsitory;

//    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");


    private final PasswordEncoder passwordEncoder;
    @GetMapping
    public ResponseEntity<String> getToken( ){
        return ResponseEntity.ok("Test");
    }

    

    @GetMapping("/getUser")
    List<User> getAllUser(){
        return userReponsitory.findAll();
    }

    @GetMapping("/getUser/{id}")
    User getUserbyId(@PathVariable int id){
        return userReponsitory.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/updateUser/{id}")
    User updateUser(@PathVariable int id, @RequestBody User user){
        java.util.Date date = new java.util.Date();

        return userReponsitory.findById(id)
                .map(user1 -> {
                    user1.setUserName(user.getUsername());
                    user1.setPassword(passwordEncoder.encode(user.getPassword()));
                    user1.setUser_fullName(user.getUser_fullName());
                    user1.setUser_address(user.getUser_address());
                    user1.setUser_email(user.getUser_email());
                    user1.setUser_birthdate(user.getUser_birthdate());
                    user1.setUser_gender(user.getUser_gender());
                    user1.setUser_phonenum(user.getUser_phonenum());
//                    user1.setDepartment(user.getDepartment());
                    user1.setUser_mod_date(date);
                    return userReponsitory.save(user1);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/delUser/{id}")
    String deleteUser (@PathVariable int id){
        if (!userReponsitory.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userReponsitory.deleteById(id);
        return "Deleted successfully";
    }
//    public ResponseEntity<?> deleteUser(@PathVariable int id){
//        return userReponsitory.findById(id)
//                .map(user1 -> {
//                    user1.setUser_isActivity(Boolean.FALSE);
//                    userReponsitory.save(user1);
//                    return new ResponseEntity<>(new ReponseMessage("Delete user success"), HttpStatus.OK);
//                }).orElseThrow(()->new UserNotFoundException(id));

//    }

}
