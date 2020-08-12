import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksCollection: AngularFirestoreCollection;
  taskDocument: AngularFirestoreDocument<Task>;
  tasks: Observable<Task[]>;

  constructor(public db: AngularFirestore) {
    //this.tasks = db.collection('tasks').valueChanges();
    this.tasksCollection = db.collection('tasks');
    this.tasks = this.tasksCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
         return data;
      });
    }));
  }

  getTasks(){
    return this.tasks;
  }

  addTask(task: Task){
    task.create_date = new Date();
    task.state = 'toDo';

    this.tasksCollection.add(task);
  }

  editTask(task: Task){
    task.update_date = new Date();
    this.taskDocument = this.db.doc(`tasks/${task.id}`);
    this.taskDocument.update(task); 
  }

  deleteTask(task: Task){
    this.taskDocument = this.db.doc(`tasks/${task.id}`);
    this.taskDocument.delete(); 
  }

}
