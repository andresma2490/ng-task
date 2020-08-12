import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  newTask = {} as Task;
  tasks = [];

  constructor(public TaskService:TaskService) {

  }

  ngOnInit(): void {
    this.TaskService.getTasks().subscribe(tasks =>{
      this.tasks = tasks;
      console.log(tasks);
      
    });
  }

}
