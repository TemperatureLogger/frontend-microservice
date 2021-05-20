import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { browser } from 'protractor';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  constructor(private router:Router) {}

  ngOnInit(): void {
  }


  onClick() :void {
    let nameText = document.getElementById('nameText').value;
    let passText = document.getElementById('passText').value;
    // TODO: REPLACE WITH IF NAME&&PASS IN DB
    if (nameText == "admin" && passText == "1234") {
      this.router.navigate(['/dashboard']);
    }
    else {
      window.alert("Wrong credentials");
    }
  }

}
