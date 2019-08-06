import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  head = 'Register';
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordForm: new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  });

  hide = true;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  openSnackBar(msg, action) {
    this.snackBar.open(msg, action, {
      duration: 2000,
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  get f2() {
    // TO DO: need to fix
    return this.registerForm.controls.passwordForm['controls'];
  }
  onSubmit() {
    console.log(this.f.email);
    const { email, username, passwordForm } = this.registerForm.value;
    console.log(passwordForm.password);
    this.authService.register(username, passwordForm.password, email).subscribe(data => {
      this.openSnackBar(data.Message, 'Register');
    });
  }
}
