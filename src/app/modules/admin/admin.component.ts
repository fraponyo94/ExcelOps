import { Component, OnInit, TemplateRef } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loading: boolean = true;
  categories: any[];
  count: any;
  businesses: any[];
  categoryForm: any;
  categoryColumns = [
    { name: 'Name' },
    { name: 'Description' }
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

    const businessObservable = this.businessService.listUnverifiedBusiness();
    businessObservable.subscribe((businesses) => {
      if(businesses.length> 5){
        businesses.length = 5;
      }
      this.businesses = businesses;
      this.loading =false;
      this.load();
    }, (error)=> {
      this.loading = false;
      this.businesses= null;
    });
  }

  load() {
    $(document).ready(function () {
      $('#unsorted').DataTable({
        responsive: true,
      });
    });
  }
}
