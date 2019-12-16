import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})

export class BusinessComponent implements OnInit {
  loading: boolean = true;
  businesses: any[];
  columns = [
    { name: 'Name' },
    { name: 'Phone Number', prop: 'phoneNumber' },
    { name: 'Address', prop: 'address' },
    { name: 'Ranking Index', prop: 'ranking' },
  ];

  constructor(
    private businessService: BusinessService,
  ) {
  }

  ngOnInit() {
    const businessesObservable = this.businessService.listBusinesses();
    businessesObservable.subscribe((businessData) => {
      this.businesses = businessData;
      this.loading = false;
      setTimeout(() => {
        this.load();
      }, 100);
    });
  }

  load() {
    $(document).ready(function () {
      $('#businessTable').DataTable({
        responsive: true,        
      });
    });
  }
}
