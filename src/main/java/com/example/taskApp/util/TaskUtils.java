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
        int id = taskList.size() + 1;
        task.setId(id);
        return task;
    }

    public static void setNewTaskDate(Task task) {
        Date date = new Date();
        task.setCreateDate(date);
    }
}
