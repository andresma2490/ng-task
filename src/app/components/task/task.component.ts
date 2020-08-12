import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // task = {} as Task;
  @Input() task:Task;
  editing:boolean;

  constructor(public TaskService:TaskService) { }

  ngOnInit(): void {
    this.canEdit();
  }

  canEdit(){
    if(this.task.id){
      this.editing = false;
    }
    else{
      this.editing = true;
    }
  }

  addOrEditTask(){
    if(this.task.id){
      this.TaskService.editTask(this.task);
    }
    else{
      if(this.task.title && this.task.description){
        this.TaskService.addTask(this.task)
        this.task = {} as Task;
      }
    }
  }

  deleteTask(){
    if(window.confirm('are you sure?')){
      this.TaskService.deleteTask(this.task);
    }
  }

}
