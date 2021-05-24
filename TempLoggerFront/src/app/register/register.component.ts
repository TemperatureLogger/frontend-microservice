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
    let nameText = (<HTMLInputElement>document.getElementById('nameText')).value;
    let passText = (<HTMLInputElement>document.getElementById('passText')).value;
    let confirmPassText =  (<HTMLInputElement>document.getElementById('confirmPassText')).value;
    let serialIDText = (<HTMLInputElement>document.getElementById('serialIdText')).value;
    // TODO Change userDB with get call from user DB

    //First check if the serial number is valid. (this will be changed with searching it in the database)
    if(serialIDText == "") {
      window.alert("Please enter a valid serial ID number!");
    } else if (nameText != "" 
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
      else {
        // Temporary message
        window.alert("Username can't be empty and passwords must match!"); 
      }
      
  }

  redirectLogin(): void {
    this.router.navigate(['/login']);
  }

}
