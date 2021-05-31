import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { browser } from 'protractor';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import userDB from '../users.json';
/* Import api to registrer users */
import { ApiUsers } from '../api.users';
// Import interface to model data from the API
import { UserData } from '../userData';


@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  
  form: FormGroup;
  returnUrl: string;
  static user_name: string;
  static user_serial : any;

  // private user_name : string;

  // getUserName() {
  //   return this.user_name;
  // }

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

  getUserSerialWrapper() {
  }

  loginUser() :void {
    let nameText = (<HTMLInputElement>document.getElementById('nameText')).value;
    let passText = (<HTMLInputElement>document.getElementById('passText')).value;
    let exists = false;

    /* Call the register service */
    this.api.loginUser(nameText, passText).subscribe({
      next: data => {
        this.api.set_bearer_token(data.token);


        this.api.getUserSerial(this.api.get_bearer_token()).subscribe(data => {
          var entry = data as UserData;
          // console.log(entry);
          // console.log(String(entry.serialNumber));
          localStorage.setItem('serial', String(entry.serialNumber));
        });

      console.log("Login token:" + this.api.get_bearer_token());
        this.redirectDashboard();
      },
      error: error => {
        window.alert("Invalid Credentials!");
      }
    });
  }
}
