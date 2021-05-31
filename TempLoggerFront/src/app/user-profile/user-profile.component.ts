import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
/* Import api to registrer users */
import { ApiUsers } from '../api.users';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private api: ApiUsers) {

    // console.log(LoginComponent.user_name);
  }



  ngOnInit() {
    let nameText = (<HTMLInputElement>document.getElementById('username'));
    let serialText = (<HTMLInputElement>document.getElementById('email'));
    // console.log(localStorage.getItem('username'));
    nameText.value = localStorage.getItem('username');
    serialText.value = localStorage.getItem('serial');
  }
}
