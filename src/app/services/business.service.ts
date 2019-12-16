import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  url: string = "https://guarded-cove-99617.herokuapp.com/"
  // https://guarded-cove-99617.herokuapp.com/

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'categories');
  }

  createCategory(category: any): Observable<string> {
    return this.httpClient.post<string>(this.url + 'categories', category);
  }

  getBusinessDetails(id: string) {
    return this.httpClient.get<string>(this.url + 'business/'+ id);
  }

  createBusiness(business: any): Observable<string> {
    return this.httpClient.post<string>(this.url, business);
  }

  listBusinesses(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  listUnverifiedBusiness():Observable<any[]>{
    return this.httpClient.get<any[]>(this.url+ 'unverified')
  }

  count(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + 'count');
  }

  unapproveBusiness(id: string) {
    return this.httpClient.post<string>(this.url + 'unapp',  {id});
  }

  approveBusiness(id: string) {
    return this.httpClient.post<string>(this.url + 'app',{id});
  }

}