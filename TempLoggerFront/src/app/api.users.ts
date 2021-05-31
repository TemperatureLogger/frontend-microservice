/*
http://localhost:3001/api/users/login
http://localhost:3001/api/users
localhost:3001/api/token/refresh
localhost:3001/api/token/authorize
*/

import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'jquery';

const loginServiceUrl = 'http://157.245.65.94:3001/api/users/login';
const registerServiceUrl = 'http://157.245.65.94:3001/api/users';
const refreshTokenUrl = 'http://157.245.65.94:3001/api/token/refresh';
const authorizeTokenUrl = 'http://157.245.65.94:3001/api/token/authorize';

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
    getUserSerial(bearer_token) {
    console.log("!!!!!!!!!!!!!!!!!!!!");
        const headers = {"Authorization":"Bearer " + String(bearer_token)};
        return this.http.get(authorizeTokenUrl, {headers});
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
