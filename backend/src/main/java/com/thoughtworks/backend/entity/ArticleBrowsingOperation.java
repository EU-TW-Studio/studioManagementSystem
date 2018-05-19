package com.thoughtworks.backend.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class ArticleBrowsingOperation {
    @Id
    @GeneratedValue
    private Integer authorId;
    private Integer visitorsId;
}
