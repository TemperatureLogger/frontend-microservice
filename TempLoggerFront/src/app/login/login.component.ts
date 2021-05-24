import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { browser } from 'protractor';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import userDB from '../users.json';

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  constructor(private router:Router) {}

  ngOnInit(): void {
  }


  loginUser() :void {
    let nameText = (<HTMLInputElement>document.getElementById('nameText')).value;
    let passText = (<HTMLInputElement>document.getElementById('passText')).value;
    let exists = false;
    // TODO: Replace the userDB with a get from the DB
    // GET from database
    for (let i = 0; i < userDB.length; i++) {
      let user = userDB[i]
      console.log(user.name)
      if (nameText == user.name) {
        if (passText == user.pass) {
          exists = true;
          this.router.navigate(['/dashboard']);
          break;
        }
        else {
          window.alert("Wrong credentials");
          break;
        }
      }
    }
    
    if (exists == false)
      window.alert("User doesn't exist")

  }

  redirectRegister() :void {
    this.router.navigate(['/register']);
  }
}
