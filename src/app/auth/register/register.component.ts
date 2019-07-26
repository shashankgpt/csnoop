import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  value="test";
  registerForm = new FormGroup({
    username : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required,Validators.email]),
    passwordForm: new FormGroup({
      password : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
    })
  });

  hide = true;
  constructor() { }

  ngOnInit() {
  }

  get f() {
  return this.registerForm.controls;
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }
}
