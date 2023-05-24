package com.example.Manager.Reponsittory;

import com.example.Manager.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserReponsitory extends JpaRepository<User, Integer> {

    Optional<User> findByUserName(String userName);



}
