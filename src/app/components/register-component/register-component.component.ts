import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {

  registerForm = new FormGroup({
    emailId : new FormControl(''),
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
