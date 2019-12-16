import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  loginForm: any;
  loading = false;
  token: string;
  currentUser: any;
  error: any;


  constructor(
    private authService: AuthService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options: {},
    public cd: ChangeDetectorRef,
    public router: Router,
    private toastr: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.authService.logout();

    this.loginForm = new FormGroup({
      email: new FormControl('email', Validators.email),
      password: new FormControl()
    });
  }

  loginUser(data: any, ) {
    console.log("data:", data);
    this.loading = true;
    this.authService
      .login(data.email, data.password)
      .subscribe(
        (data: HttpResponse<any>) => {
          if (typeof (data) !== "undefined") {
            this.currentUser = data.body;
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser));

            this.router.navigate(["admin"]);
          }
          //@ts-ignore
          this.toastr.success("Login Successful", "Success", { position: "top-right" });
          // localStorage
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.error = error.error;

          if (typeof (this.error) == "object") {
            this.error = "Service Unavailable, Please Try again after some time"
          }

          // this.toastr.error(this.error);
          //@ts-ignore
          this.toastr.danger(this.error, "Error", { position: "top-right" });

        }
      );
  }

}
