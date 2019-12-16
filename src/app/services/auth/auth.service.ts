import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  url = "https://guarded-cove-99617.herokuapp.com/users/";

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        this.url + "login",
        {
          email: email,
          password: password
        },
        { observe: "response" }
      )
      .pipe(response => {
        return response;
      });
  }

  forgot(email: string) {
    return this.http
      .post<any>(
        this.url + "forgot",
        {
          email: email
        },
        { observe: "response" }
      )
      .pipe(response => {
        return response;
      });
  }

  resetPassword(password: string, newPassword: string, resetToken: string) {
    return this.http
      .post<any>(
        this.url + "resetPassword",
        {
          password: password,
          newPassword: newPassword,
          resetToken: resetToken
        },
        { observe: "response" }
      )
      .pipe(response => {
        return response;
      });
  }

  deleteAccount() {

    return this.http
      .post<any>(
        this.url + "delete",
        {
          deleteToken: localStorage.getItem("token")
        },
        { observe: "response" }
      )
      .pipe(response => {
        return response;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  }
}
