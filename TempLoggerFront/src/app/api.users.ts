/*
http://localhost:3001/api/users/login
http://localhost:3001/api/users
localhost:3001/api/token/refresh
localhost:3001/api/token/authorize
*/

import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'jquery';

const loginServiceUrl = 'http://localhost:3001/api/users/login';
const registerServiceUrl = 'http://localhost:3001/api/users';
const refreshTokenUrl = 'http://localhost:3001/api/token/refresh';
const authorizeTokenUrl = 'http://localhost:3001/api/token/authorize';

@Injectable({
  providedIn: 'root'
})
export class ApiUsers {

    bearer_token : string;

    constructor(private http: HttpClient) { }

    get_bearer_token() {
        return this.bearer_token;
    }

    set_bearer_token(bearer_token) {
        this.bearer_token = bearer_token;
    }

    /* */
    loginUser(username, passwd) {
        const body = { "username":username, "password":passwd};
        return this.http.post<any>(loginServiceUrl, body);
    }

    /* */
    registerUser(username, passwd, serial) {
        const body = { "username":username, "password":passwd, "serialNumber":serial};
        return this.http.post<any>(registerServiceUrl, body);
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
