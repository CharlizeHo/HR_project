package com.example.Manager.auth;

import com.example.Manager.Model.Role;
import com.example.Manager.Model.User;
import com.example.Manager.Reponsittory.UserReponsitory;
import com.example.Manager.Service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserReponsitory reponsitory;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
//        LocalDateTime now = LocalDateTime.now();
        java.util.Date date = new java.util.Date();

        var user= User.builder()
                .userName(request.getUserName())
                .user_fullName(request.getFullName())
                .user_email(request.getEmail())
                .user_gender(request.getGender())
                .user_address(request.getAddress())
                .user_birthdate(request.getUser_birthdate())
                .user_phonenum(request.getPhonenum())
                .department(request.getDepartment())
                .password(passwordEncoder.encode(request.getPassword()))
                .user_cre_date(date)
                .user_isActivity(Boolean.TRUE)
                .role(Role.USER)
                .build();
        reponsitory.save(user);
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUserName(),
                    request.getPassword()
            )
    );
    var user =reponsitory.findByUserName(request.getUserName())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userName(request.getUserName())
                .build();
    }
}
