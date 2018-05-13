package com.thoughtworks.backend.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "web_student")
public class Student implements Serializable {

    @Id
    @GeneratedValue
    private int id;
    private String username;//学生姓名
    private String password;
    private String studentId;//学生学号
    private String image;//学生头像
    private String grade;//学生年级
    private String skill;//学生专业
    private String hobby;//爱好
    private String phone;//电话
    private String email;//邮箱


    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private Set<StationRecord> stationRecord;

    public Student() {
    }

    public Student(String username, String password, String studentId, String image, String grade, String skill, String hobby, String phone, String email, Set<StationRecord> stationRecord) {
        this.username = username;
        this.password = password;
        this.studentId = studentId;
        this.image = image;
        this.grade = grade;
        this.skill = skill;
        this.hobby = hobby;
        this.phone = phone;
        this.email = email;
        this.stationRecord = stationRecord;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public Set<StationRecord> getStationRecord() {
        return stationRecord;
    }

    public void setStationRecord(Set<StationRecord> stationRecord) {
        this.stationRecord = stationRecord;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public String getHobbies() {
        return hobby;
    }

    public void setHobbies(String hobby) {
        this.hobby = hobby;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
