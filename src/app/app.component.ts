import { Task } from './task.model';
import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  tasks: FirebaseListObservable<any>;
  user: Observable<firebase.User>;  
  taskname = '';
  tasksCopy: Object[] = [];

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.tasks = db.list('/');
    db.list('/').subscribe(
      data => {
        this.tasksCopy = data;
      }
    )
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
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

