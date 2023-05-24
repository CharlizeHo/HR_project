package com.example.Manager.exception;

public class UserNotFoundException extends  RuntimeException {
    public UserNotFoundException( int id)
    {
        super("Cound not found target with" +"_"+ id);
    }
}

