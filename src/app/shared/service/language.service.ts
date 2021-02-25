import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  state: any;
  code: string;
  constructor(private http: HttpClient) { }

  getList(payload) {
    return this.http.get(`String/List/Language/${payload.oemID}/0/${payload.languageID}`);
  }

}
