package com.thoughtworks.backend.dto;

public class UserInfo {
    private String username;//学生姓名
    private String password;
    private String confirm;//确认密码
    private String prefix;//电话号码前缀
    private String email;
    private String phone;
    private String studentId;

    public UserInfo(String username, String password, String confirm, String prefix, String email, String phone, String studentId) {
        this.username = username;
        this.password = password;
        this.confirm = confirm;
        this.prefix = prefix;
        this.email = email;
        this.phone = phone;
        this.studentId = studentId;
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

    public String getConfirm() {
        return confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
