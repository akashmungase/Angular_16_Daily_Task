import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
})
export class DailyTaskComponent implements OnInit {
  taskList: any[] = [];
  taskForm: FormGroup;
  editIndex: number | null = null;
  submit: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const tasks = localStorage.getItem('Tasks');
    this.taskList = tasks ? JSON.parse(tasks) : [];
  }

  addTask() {
    this.submit = true;
    if (this.taskForm.valid) {
      const newTask = {
        id: Date.now(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        date: new Date().toLocaleDateString('en-GB')
      };

      this.taskList.push(newTask);
      localStorage.setItem('Tasks', JSON.stringify(this.taskList));
      this.submit = false;
      this.taskForm.reset();
      this.loadTasks();
    }
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
    localStorage.setItem('Tasks', JSON.stringify(this.taskList));
    this.loadTasks();
  }

  editTaskRow(task: any, index: number) {
    this.editIndex = index;
    this.taskForm.patchValue(task);
  }

  UpdateAndSave() {
    this.submit = true;
    if (this.taskForm.valid && this.editIndex !== null) {
      const updatedTask = {
        ...this.taskList[this.editIndex],
        ...this.taskForm.value,
        date: new Date().toLocaleDateString('en-GB')
      };

      this.taskList[this.editIndex] = updatedTask;
      localStorage.setItem('Tasks', JSON.stringify(this.taskList));
      this.editIndex = null;
      this.submit = false;
      this.taskForm.reset();
      this.loadTasks();
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.taskForm.reset();
  }

  Logout() {
    this.toastrService.success('Logged out Successfully!', 'Success!');
    localStorage.removeItem('userIsLogedIn');
    localStorage.removeItem('Tasks');
    this.router.navigate(['/login']);
  }

  get f() {
    return this.taskForm.controls;
  }
}