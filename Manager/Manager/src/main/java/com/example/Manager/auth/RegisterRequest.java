package com.example.Manager.auth;

import com.example.Manager.Model.Department;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RegisterRequest {


     private String userName;
     private String password;
     private byte gender;
     private String user_birthdate;
     private String fullName;
     private String phonenum;
     private String email;
     private String address;
     private Department department;

}
