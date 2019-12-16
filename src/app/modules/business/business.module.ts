import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { NbStepperModule, NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbRadioModule, NbCheckboxModule, NbAlertModule, NbToastrModule } from '@nebular/theme';

import { PlacePickerModule } from 'ngx-place-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [BusinessComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    NbStepperModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbRadioModule,
    NbCheckboxModule,
    PlacePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NbAlertModule,
    NbToastrModule.forRoot(),
    AngularFileUploaderModule    
  ]
})
export class BusinessModule { }
