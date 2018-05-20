package com.thoughtworks.backend.controllers;

import com.thoughtworks.backend.dao.StationRecordDao;
import com.thoughtworks.backend.dao.UserDao;
import com.thoughtworks.backend.dto.UserInfo;
import com.thoughtworks.backend.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserDao userDao;
    @Autowired
    StationRecordDao stationRecordDao;

    @GetMapping("/users")
    public ResponseEntity getUsers() {
        return new ResponseEntity<>(userDao.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity login(@RequestParam String username, @RequestParam String password) {
        Student student;
        if (username.matches("[0-9]+") && username.length() == 14) {
            student = userDao.findByStudentIdAndPassword(username, password);
        } else {
            student = userDao.findByUsernameAndPassword(username, password);
        }
        return new ResponseEntity(student, HttpStatus.OK);
    }

    @GetMapping("/initUser")
    public ResponseEntity login(Integer userid) {
        Student student = userDao.findStudentById(userid);
        return new ResponseEntity(student, HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity register(@RequestBody Student student) {
        Map<String, Object> data = new HashMap<>();
        Student checkByUsername = userDao.findByUsername(student.getUsername());
        Student checkByPhone = userDao.findByPhone(student.getPhone());
        Student checkByEmail = userDao.findByEmail(student.getEmail());
        if (checkByUsername != null) {
            data.put("msg", "用户名以存在");
            data.put("status", "500");
        } else if (checkByPhone != null) {
            data.put("msg", "手机号以存在");
            data.put("status", "500");
        } else if (checkByEmail != null) {
            data.put("msg", "邮箱以存在");
            data.put("status", "500");
        } else {
            userDao.save(student);
            data.put("msg", "注册成功");
            data.put("status", "200");
        }
        return new ResponseEntity(data, HttpStatus.OK);
    }

}
