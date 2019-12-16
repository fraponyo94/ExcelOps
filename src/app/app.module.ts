import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbIconModule, NbCheckboxModule, NbAlertModule } from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SuccessComponent } from './components/success/success.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";
import { AuthGuard } from "./services/auth/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbAlertModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
