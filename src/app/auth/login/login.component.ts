import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  value = 'test2';
  durationInSeconds = 5;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }
  get f() {
    return this.loginForm.controls;
  }
  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(resData => {
      const loginData = resData.data;
      localStorage.setItem('login', loginData.token);
      this.openSnackBar(resData.Message, 'Login');

    });
  }

}
