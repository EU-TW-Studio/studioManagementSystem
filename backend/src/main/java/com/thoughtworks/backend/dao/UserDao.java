package com.thoughtworks.backend.dao;

import com.thoughtworks.backend.entity.Student;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserDao extends CrudRepository<Student, Long> {
    Sort sort = new Sort(Sort.Direction.ASC, "id");
    Pageable pageable = new PageRequest(1, 10, sort);

    Student findByUsernameAndPassword(String username, String password);

    Student findStudentById(int userId);
}
