package com.example.taskApp.service;

import com.example.taskApp.model.Task;

import java.util.List;

/**
 * @author erdemcemozer
 */
public interface TaskService {

    public void createTask(Task task);
    public Task updateTask(Task task);
    public void deleteTask(Task task);
    public List<Task> getTasks();
}
