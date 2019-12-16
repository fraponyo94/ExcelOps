import { Component, OnInit, TemplateRef } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  categories: any[];
  count: any;
  businesses: any[];
  categoryForm: any;
  categoryColumns = [
    { name: 'Name' },
    { name: 'Description' }
  ];

  businessColumns = [
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
    const categoriesObservable = this.businessService.getCategories();
    categoriesObservable.subscribe((categoriesData) => {
      categoriesData.length = 4;
      this.categories = categoriesData;
    });

    const countObservable = this.businessService.count();
    countObservable.subscribe((countData) => {
      this.count = countData;
    });

    const businessObservable = this.businessService.listBusinesses();
    businessObservable.subscribe((businesses) => {
      businesses.length = 5;
      this.businesses = businesses;
    });
  }

}
