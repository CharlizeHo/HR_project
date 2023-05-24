package com.example.Manager.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
            return ResponseEntity.ok(authenticationService.register(request));

    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }

}
