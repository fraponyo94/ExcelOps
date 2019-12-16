import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  url: string = "https://guarded-cove-99617.herokuapp.com/"
  // https://guarded-cove-99617.herokuapp.com/

  constructor( private httpClient:HttpClient) { }
  
  getCategories():Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+ 'categories');
  }

  createCategory(category: any):Observable<string>{
    return this.httpClient.post<string>(this.url+ 'categories', category);
  }

  createBusiness(category: any):Observable<string>{
    return this.httpClient.post<string>(this.url, category);
  }

  listBusinesses():Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  count():Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+ 'count');
  }

}