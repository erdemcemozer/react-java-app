package com.example.taskApp.service;

import com.example.taskApp.model.Task;
import com.example.taskApp.repository.TaskRepository;
import com.example.taskApp.util.TaskUtils;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author erdemcemozer
 */

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @SneakyThrows
    @Override
    public void createTask(Task task) {
        TaskUtils.setNewTaskDate(task);

        taskRepository.createTask(task);
    }

    @SneakyThrows
    @Override
    public Task updateTask(Task task) {
        return taskRepository.updateTask(task);
    }

    @SneakyThrows
    @Override
    public void deleteTask(Task task) {
        taskRepository.deleteTask(task);
    }

    @SneakyThrows
    @Override
    public List<Task> getTasks() {
        return taskRepository.getTasks();
    }
}
