package com.example.taskApp.repository;

import com.example.taskApp.model.Task;
import com.example.taskApp.util.TaskUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author erdemcemozer
 */

@Repository
public class TaskRepositoryImpl implements TaskRepository {

    List<Task> taskList = new ArrayList<>();

    @Override
    public void createTask(Task task) {
        TaskUtils.setTaskId(task, taskList);
        taskList.add(task);
    }

    @Override
    public Task updateTask(Task task) {

        Optional<Task> matchingTask = taskList.stream() //
                .filter(t -> t.getId().equals(task.getId())) //
                .findAny();

        matchingTask.get().setTitle(task.getTitle());
        matchingTask.get().setDescription(task.getDescription());
        return matchingTask.get();

    }

    @Override
    public void deleteTask(Task task) {
        taskList.removeIf(t -> t.getId().equals(task.getId()));
    }

    @Override
    public List<Task> getTasks() {
        return taskList;
    }
}
