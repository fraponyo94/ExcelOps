import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  templateUrl: './details.component.html',
  styles: [`img{
    width: 100px !important;
    height: auto
  }`]
})

export class DetailsComponent implements OnInit {
  loading: boolean = true;
  business: any;
  error: boolean = false;
  parameter: any;

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private toastr: NbToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.parameter = this.route.snapshot.paramMap.get('id');
    const businessesObservable = this.businessService.getBusinessDetails(this.parameter);
    businessesObservable.subscribe((businessData) => {
      this.business = businessData;
      this.loading = false;
    }, (error) => {
      this.error = true;
      this.loading = false;
    });
  }

  approve(id: string) {
    const approvalObservable = this.businessService.approveBusiness(id);
    approvalObservable.subscribe((businessData) => {
      //@ts-ignore
      this.toastr.success("Business Portfolio Approved", "Success", { position: "top-right" });
      this.error = false;
      this.loading = false;
      this.router.navigate(['/admin/business']);
    }, (error) => {
      //@ts-ignore
      this.toastr.danger("Business Portfolio could not be approved", "Error", { position: "top-right" });
      this.error = true;
      this.loading = false;
    });
  }

  unapprove(id: string) {
    const approvalObservable = this.businessService.unapproveBusiness(id);
    approvalObservable.subscribe((businessData) => {
      //@ts-ignore
      this.toastr.success("Business Portfolio successfully unpproved", "Success", { position: "top-right" });
      this.error = false;
      this.loading = false;
      this.router.navigate(['/admin/business']);
    }, (error) => {
      //@ts-ignore
      this.toastr.danger("Business Portfolio could not be unapproved", "Error", { position: "top-right" });
      this.error = true;
      this.loading = false;
    });
  }
}
