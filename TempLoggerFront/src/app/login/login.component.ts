import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { browser } from 'protractor';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  constructor(private router:Router) {}

  ngOnInit(): void {
  }


  onClick() :void {
    this.router.navigate(['/dashboard']);
  }
}
