import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})

export class BusinessComponent implements OnInit {
  loading: boolean = true;
  businesses: any[];
  unapprovedBusinesses: any[];
  ready: any[] = [false, false]
  error: boolean = false;

  constructor(
    private businessService: BusinessService,
  ) {
  }

  ngOnInit() {
    this.loadApprovedBusinesses();
    this.loadUnapprovedBusinesses();
    setTimeout(() => {
      this.load();
    }, 1000);
  }

  loadApprovedBusinesses() {
    const businessesObservable = this.businessService.listBusinesses();
    businessesObservable.subscribe((businessData) => {
      this.businesses = businessData;
      this.loading = false;
      this.ready[0] = true;
    }, (error) => {
      this.error = true;
      this.loading = false;
    });
  }

  loadUnapprovedBusinesses() {
    const businessesObservable = this.businessService.listUnverifiedBusiness();
    businessesObservable.subscribe((businessData) => {
      this.unapprovedBusinesses = businessData;
      this.loading = false;
      this.ready[0] = true;
    }, (error) => {
      this.error = true;
      this.loading = false;
    });
  }

  load() {
    $(document).ready(function () {
      $('#unapprovedBusinesses').DataTable({
        responsive: true,
      });
      $('#approvedBusinesses').DataTable({
        responsive: true,
        search: false,

      });
    });
  }
}
