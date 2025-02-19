import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:8080/';
   }

  getAllSurveys: Function = () => {
    return this.http.get(`${this.baseUrl}`);
  }

  getEnabledSurveys: Function = () => {
    return this.http.get(`${this.baseUrl}enabled`);
  }

  activateSurvey: Function = (id: string) => {
    return this.http.put(`${this.baseUrl}enable/${id}`, null, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  deActivateSurvey: Function = (id: string) => {
    return this.http.put(`${this.baseUrl}disable/${id}`, null, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  deleteSurvey: Function = (id: string) => {
    return this.http.delete(`${this.baseUrl}${id}`,{ responseType: 'text' });
  }

  createSurvey: Function = (survey: Object) => {
    console.log('create')
    return this.http.post(`${this.baseUrl}`, JSON.stringify(survey),{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
  }

  

}
