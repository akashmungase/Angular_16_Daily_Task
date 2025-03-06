import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.apiUrl);
  }

  addTask(task: any) {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: any, task: any) {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
