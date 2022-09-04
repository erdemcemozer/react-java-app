package com.example.taskApp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author erdemcemozer
 */

@Data
public class Task {

    private Integer id;
    private String title;
    private String description;
    private String createDate;
}
