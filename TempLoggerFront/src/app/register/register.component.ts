import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import userDB from '../users.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    let nameText = (<HTMLInputElement>document.getElementById('nameText')).value;//document.getElementById('nameText').value;
    let passText = (<HTMLInputElement>document.getElementById('passText')).value;//document.getElementById('passText').value;
    let confirmPassText =  (<HTMLInputElement>document.getElementById('confirmPassText')).value;
    // TODO Change userDB with get call from user DB
    if (nameText != null 
        && passText === confirmPassText
        && passText.length) {
          for (let i = 0; i < userDB.length; i++) {
            let user = userDB[i];
            if (user["name"] === nameText) {
              window.alert("User already registered.")
              return;
            }
          }
          // TODO Change push with 
          userDB.push({"name": nameText, "pass": passText});
          window.alert("User registered with success."); 
      }
      
  }

  redirectLogin(): void {
    this.router.navigate(['/login']);
  }

}
