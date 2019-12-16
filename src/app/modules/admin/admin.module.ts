import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { NbListModule, NbMenuModule, NbCardModule, NbDialogModule, NbButtonModule, NbInputModule, NbSelectModule, NbToastrModule, NbTreeGridModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniquePipe } from '../../pipes/unique.pipe';
import { BusinessComponent } from './components/business/business.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/business/details/details.component';


@NgModule({
  declarations: [AdminComponent, SidenavComponent, UniquePipe, BusinessComponent, CategoryComponent, DetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NgxDatatableModule,
    DataTablesModule,
    NbTreeGridModule
  ]
})
export class AdminModule { }
