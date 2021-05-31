import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ApiUsers } from '../api.users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private router:Router,  private api: ApiUsers) { }

  ngOnInit(): void {
  }

  redirectLogin(): void {
    this.router.navigate(['/login']);
  }

  registerUserApiWrapper(username, passwd, serialNumber) {
    /* Make API call */
    this.api.registerUser(username, passwd, serialNumber);
  }

  registerUser() {
    /* Get data from textboxes */
    let nameText = (<HTMLInputElement>document.getElementById('nameText')).value;
    let passText = (<HTMLInputElement>document.getElementById('passText')).value;
    let confirmPassText =  (<HTMLInputElement>document.getElementById('confirmPassText')).value;
    let serialIDText = (<HTMLInputElement>document.getElementById('serialIdText')).value;

    /* Check passwords to match */
    if (confirmPassText != passText) {
      window.alert("Password missmatch!");
      return;
    }

    /* Call the register service */
    this.api.registerUser(nameText, passText, serialIDText).subscribe({
      next: data => {

        this.api.set_bearer_token(data.token);
        window.alert("User Registered Succesfully! Enjoy your service!");
        this.redirectLogin();
      },
      error: error => {
        window.alert("Bad serial ID \\ User already exists!");
      }
    });
  }
}
