package com.thoughtworks.backend.controllers;

import com.thoughtworks.backend.dao.StationRecordDao;
import com.thoughtworks.backend.dao.UserDao;
import com.thoughtworks.backend.dto.ArticleInfo;
import com.thoughtworks.backend.entity.StationRecord;
import com.thoughtworks.backend.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ArticlesController {
    @Autowired
    StationRecordDao stationRecordDao;
    @Autowired
    UserDao userDao;


    @PostMapping("/articles")
    public ResponseEntity saveGrowthLogAction(@RequestBody ArticleInfo articleInfo) {
        try {
            StationRecord stationRecord = new StationRecord();
            Student student = new Student();
            student.setId(articleInfo.getUserId());
            stationRecord.setLogContent(articleInfo.getLogContent());
            stationRecord.setLogTitle(articleInfo.getLogTitle());
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            stationRecord.setReleaseDate(df.parse(df.format(new Date())));
            stationRecord.setStudent(student);
            stationRecordDao.save(stationRecord);
            return new ResponseEntity("", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity("", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/articles")
    public ResponseEntity updateGrowthLogAction(@RequestBody ArticleInfo articleInfo) {
        try {
            StationRecord stationRecord = new StationRecord();
            Student student = userDao.findStudentById(articleInfo.getUserId());

            student.setId(articleInfo.getUserId());
            stationRecord.setLogContent(articleInfo.getLogContent());
            stationRecord.setLogTitle(articleInfo.getLogTitle());
            stationRecord.setId(articleInfo.getId());
            stationRecord.setStudent(student);
            stationRecordDao.save(stationRecord);
            return new ResponseEntity("", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity("", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/articles")
    public ResponseEntity allArticle() {
        return new ResponseEntity(stationRecordDao.findAll(), HttpStatus.OK);
    }
}
