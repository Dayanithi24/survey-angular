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
    return this.http.post(`${this.baseUrl}`, JSON.stringify(survey),{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
  }
  
  createResponse: Function = (response: Object) => {
    return this.http.post(`${this.baseUrl}response/`, JSON.stringify(response),{
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
  }

  getResponsesOfSurvey: Function = (id: string, page: number, size: number, from: string, to: string) => {
    return this.http.get(`${this.baseUrl}response/survey/${id}?page=${page}&size=${size}&from=${from}&to=${to}`);
  } 

  deleteResponsesOfSurvey: Function = (id: string) => {
    return this.http.delete(`${this.baseUrl}response/survey/${id}`,{ responseType: 'text' });
  }

}
