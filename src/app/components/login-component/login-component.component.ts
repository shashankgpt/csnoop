import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
  });
 
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Form Submitted");
  }
}
