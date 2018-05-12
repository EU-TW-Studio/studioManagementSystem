package com.thoughtworks.backend.controllers;

import com.thoughtworks.backend.dao.UserDao;
import com.thoughtworks.backend.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserDao userDao;

    @GetMapping("/users")
    public ResponseEntity getUsers() {
        return new ResponseEntity<>(userDao.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity login(@RequestParam String username, @RequestParam String password) {
        Student student = userDao.findByUsernameAndPassword(username, password);
        return new ResponseEntity(student, HttpStatus.OK);
    }

}
