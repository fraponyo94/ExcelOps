import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  categories: any;
  public location: Location;
  public defaultLocation: Location = {
    lat: 0,
    lng: 0,
    zoom: 3
  }

  public poorlyFormattedLocation = {
    lng: -1,
    zoom: 3
  }

  days: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  businessForm: any;

  constructor(
    private businessService: BusinessService,
    private formBuilder: FormBuilder,
  ) {
    this.businessForm = this.formBuilder.group({
      name: new FormControl('', [, Validators.required]),
      address: new FormControl('', [, Validators.required]),
      phoneNumber: new FormControl('', [, Validators.required]),
      categories: new FormControl([], [, Validators.required]),
      idNumber: new FormControl('', [, Validators.required]),
      firstName: new FormControl('', [, Validators.required]),
      lastName: new FormControl('', [, Validators.required]),
      gender: new FormControl('', [, Validators.required]),
      picture: new FormControl('', [, Validators.required]),
      ownerPhoneNumber: new FormControl('', [, Validators.required]),
      ownerEmail: new FormControl('', [, Validators.required]),
      days: new FormControl([], [, Validators.required]),
      opens: new FormControl('', [, Validators.required]),
      closes: new FormControl('', [, Validators.required]),
      notes: ''
    });
  }

  ngOnInit() {
    this.categories = this.businessService.getCategories();
  }

  logLocationChange(location: Location) {
    this.location = location;
    console.log(location);
  }

  onSubmit(businessData) {
    // Process checkout data here
    console.warn('Your order has been submitted', businessData);
    this.businessForm.reset();
    
  }

}

export class Location {
  lat: number;
  lng: number;
  name?: string;
  zoom?: number;
  icon?: string;
}
