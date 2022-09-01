package com.example.taskApp.util;

import com.example.taskApp.model.Task;

import java.util.Date;
import java.util.List;

/**
 * @author erdemcemozer
 */
public class TaskUtils {

    private TaskUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static Task setTaskId(Task task, List<Task> taskList) {
        int id;
        if (!taskList.isEmpty()) {
            Integer lastId = taskList.get(taskList.size() - 1).getId();
            id = lastId + 1;
        } else {
            id = 1;
        }
        task.setId(id);
        return task;
    }

    public static void setNewTaskDate(Task task) {
        Date date = new Date();
        task.setCreateDate(date);
    }
}
