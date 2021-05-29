import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const dataBaseUrl = 'http://157.245.65.94:3000/api/measurements';
const localDataURL = './assets/data/data_format.json';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /* Get add data from the database */
  getAllData() {
    const headers = { "autorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJzZXJpYWxOdW1iZXIiOiI1NTMxMjMiLCJpYXQiOjE2MjIyODUwNTIsImV4cCI6MTYyMjI4ODY1MiwiYXVkIjoiVXNlcnMiLCJpc3MiOiJUZW1wTG9nZ2VyIiwic3ViIjoiQXV0aCBUb2tlbiJ9.BHrsTB9ir9YXDR_2sOVriRTCThF_31bpgEYcPkpK7vU"};
    return this.http.get(dataBaseUrl, {headers});
  }

  getEntries(N) {
    const headers = { "autorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJzZXJpYWxOdW1iZXIiOiI1NTMxMjMiLCJpYXQiOjE2MjIyODUwNTIsImV4cCI6MTYyMjI4ODY1MiwiYXVkIjoiVXNlcnMiLCJpc3MiOiJUZW1wTG9nZ2VyIiwic3ViIjoiQXV0aCBUb2tlbiJ9.BHrsTB9ir9YXDR_2sOVriRTCThF_31bpgEYcPkpK7vU"};
    return this.http.get(dataBaseUrl + "/period/" + N, {headers});
  }

  /* Get local data */
  getLocalData() {
    return this.http.get(localDataURL);
  }
}
