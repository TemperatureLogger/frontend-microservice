/*
http://localhost:3001/api/users/login
http://localhost:3001/api/users
localhost:3001/api/token/refresh
localhost:3001/api/token/authorize
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const loginServiceUrl = 'http://157.245.65.94:3001/api';


@Injectable({
  providedIn: 'root'
})
export class ApiUsers {

    constructor(private http: HttpClient) { }

    /* */
    loginUser() {
        console.log("GOT HEREEE!\n");
        return this.http.get(loginServiceUrl + "/users/login");
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
