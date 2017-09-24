import { Task } from './task.model';
import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  tasks: FirebaseListObservable<any>;
  taskname = '';
  tasksCopy: Object[] = [];

  constructor(db: AngularFireDatabase) {
    this.tasks = db.list('/');
    db.list('/').subscribe(
      data => {
        this.tasksCopy = data;
      }
    )
  }


  pushTask(newTask: string) {
    this.tasks.push({ active: true, description: newTask});
  }

  updateTask(key: string, updatedTask: Task) {
    this.tasks.update(key, { active: updatedTask.active, description: updatedTask.description });
  }

  deleteTask(key: string) {    
    this.tasks.remove(key); 
  }

  deleteEverything() {
    this.tasks.remove();
  }

}
