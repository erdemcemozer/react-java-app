package com.example.taskApp.controller;

import com.example.taskApp.model.Task;
import com.example.taskApp.service.TaskService;
import com.example.taskApp.util.TaskUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author erdemcemozer
 */

@RestController
@RequestMapping(path = "/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping(value = "/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        System.out.println("LOG::CreateTask::task::{ " + task + " }");

        try {
            taskService.createTask(task);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        System.out.println("LOG::updateTask::task::{ " + task + " }");
        try {
            Task newTask = taskService.updateTask(task);
            return new ResponseEntity<>(newTask, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<Task> deleteTask(@RequestBody Task task) {
        System.out.println("LOG::deleteTask::task::{ " + task + " }");
        try {
            taskService.deleteTask(task);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/list")
    public List<Task> getTasks() {
        System.out.println("LOG::getTasks");
        return taskService.getTasks();
    }
}
