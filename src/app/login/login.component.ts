import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.checkUserIsAlreadyLoggedIn();
  }

  onSubmit() {
    this.submit = true;

    if (this.loginForm.value.username === 'admin' && this.loginForm.value.password === 'admin') {
      localStorage.setItem('userIsLogedIn', 'true')
      this.toastrService.success('Login Successfully!', 'Success!');
      this.router.navigate(['/tasks']);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid username or password',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  checkUserIsAlreadyLoggedIn() {
    const user = localStorage.getItem('userIsLogedIn') === 'true';
    if (user) {
      this.router.navigate(['/tasks']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}