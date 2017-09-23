import { Task } from './../task.model';
import { TaskService } from './../service/task.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  @Input() task:Task = {description:''};
  @Output() onDeleteTask = new EventEmitter<any>();
  // @Output() onUpdateTask = new EventEmitter<any>();

  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
  }

  deleteTask(){
    this.onDeleteTask.emit();
  }

  updateTask(){
    this.taskService.update.emit(this.task);
  }
}
