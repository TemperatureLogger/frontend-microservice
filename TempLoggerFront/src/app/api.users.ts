/*
http://localhost:3001/api/users/login
http://localhost:3001/api/users
localhost:3001/api/token/refresh
localhost:3001/api/token/authorize
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const loginServiceUrl = 'http://localhost:3001/api/users/login';
const registerServiceUrl = 'http://localhost:3001/api/users';
const refreshTokenUrl = 'http://localhost:3001/api/token/refresh';
const authorizeTokenUrl = 'http://localhost:3001/api/token/authorize';

@Injectable({
  providedIn: 'root'
})
export class ApiUsers {

    constructor(private http: HttpClient) { }

    /* */
    loginUser(username, passwd) {
        const headers = { "username":username, "password":passwd};
        const body = { title: 'Knock Knock' };

        return this.http.post<any>(loginServiceUrl, body, { headers }).subscribe(data => {
            console.log(data);
        });
    }

    /* */
    registerUser(username, passwd, serial) {
        const body = { "username":username, "password":passwd, "serialNumber":serial};

        return this.http.post<any>(registerServiceUrl, body).subscribe(data => {
            console.log(data);
        });
    }

    /* */
    refreshUserToken() {
        return this.http.get(loginServiceUrl + "/token/refresh");
    }

    /* */
    authorizeUserToken() {
        return this.http.get(loginServiceUrl + "/token/authorize");
    }
}
