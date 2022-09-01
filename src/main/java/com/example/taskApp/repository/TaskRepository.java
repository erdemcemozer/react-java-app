package com.example.taskApp.repository;

import com.example.taskApp.model.Task;

import java.util.List;

/**
 * @author erdemcemozer
 */
public interface TaskRepository {
    public void createTask(Task task);
    public Task updateTask(Task task);
    public void deleteTask(Task task);
    public List<Task> getTasks();
}
