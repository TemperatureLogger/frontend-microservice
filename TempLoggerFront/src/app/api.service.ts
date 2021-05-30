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
  getAllData(bearer_token) {
    const headers = {"Authorization":bearer_token};
    return this.http.get(dataBaseUrl, {headers});
  }

  getEntries(N, bearer_token) {
    const headers = { "Authorization":bearer_token};
    return this.http.get(dataBaseUrl + "/period/" + N, {headers});
  }

  /* Get local data */
  getLocalData() {
    return this.http.get(localDataURL);
  }
}
