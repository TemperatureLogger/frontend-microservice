import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { browser } from 'protractor';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import userDB from '../users.json';
/* Import api to registrer users */
import { ApiUsers } from '../api.users';

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  /* Create variable to reffer API */
  constructor(private router:Router, private api: ApiUsers) {}

  ngOnInit(): void {
  }

  redirectRegister() :void {
    this.router.navigate(['/register']);
  }

  redirectDashboard() :void {
    this.router.navigate(['/dashboard']);
  }

  loginUser() :void {
    let nameText = (<HTMLInputElement>document.getElementById('nameText')).value;
    let passText = (<HTMLInputElement>document.getElementById('passText')).value;
    let exists = false;

    /* Call the register service */
    this.api.loginUser(nameText, passText).subscribe({
      next: data => {
        this.api.set_bearer_token(data.token);
      console.log("Login token:" + this.api.get_bearer_token());
        this.redirectDashboard();
      },
      error: error => {
        window.alert("Invalid Credidentials!");
      }
    });
  }
}
