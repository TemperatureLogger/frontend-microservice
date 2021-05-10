import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

const dataBaseUrlAll = 'http://157.245.65.94:3000/api/measurements';
const dataBaseUrlId = '';
const localDataURL = './assets/data/data_format.json';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /* Get add data from the database */
  getAllData() {
    return this.http.get(dataBaseUrlAll);
  }

  /* Get entry by ID from database */
  getDataById() {
    return this.http.get(dataBaseUrlId);
  }

  /* Get local data */
  getLocalData() {
    return this.http.get(localDataURL);
  }
}
