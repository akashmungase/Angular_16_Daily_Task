import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.css']
})
export class DailyTaskListComponent implements OnInit {
  taskList: any[] = [];
  taskForm: FormGroup;
  editIndex: number | null = null;
  submit: boolean = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder
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
    this.commonService.getTasks().subscribe((data: any) => {
      this.taskList = data;
    });
  }

  addTask() {
    this.submit = true;
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        date: new Date().toLocaleDateString('en-GB')
      };
      this.commonService.addTask(newTask).subscribe(res => {
        this.submit = false;
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  deleteTask(index: number) {
    const taskId = this.taskList[index].id;
    this.commonService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  editTaskRow(task: any, index: number) {
    this.editIndex = index;
    this.taskForm.patchValue(task);
  }

  UpdateAndSaveTask() {
    this.submit = true;
    if (this.taskForm.valid && this.editIndex !== null) {
      const taskId = this.taskList[this.editIndex].id;
      this.taskForm.value["date"] = new Date().toLocaleDateString('en-GB');
      this.commonService.updateTask(taskId, this.taskForm.value).subscribe(() => {
        this.editIndex = null;
        this.submit = false;
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.taskForm.reset();
  }

  Logout() {
    localStorage.removeItem('userIsLogedIn');
    this.router.navigate(['/login']);
  }

  get f() {
    return this.taskForm.controls;
  }
}