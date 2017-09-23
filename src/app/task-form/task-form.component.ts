import { TaskService } from './../service/task.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  update: boolean = false;
  task: any = {};
  description = '';
  @Output() onEmitTask = new EventEmitter<any>();
  constructor(public taskService: TaskService) { 
    this.taskService.update.subscribe(
      data => {
        this.update = true;
        this.task = data;
      }
    );
  }

  ngOnInit() {
  }

  addTask(){
    this.onEmitTask.emit(this.task);
    this.task = {};
  }
}
