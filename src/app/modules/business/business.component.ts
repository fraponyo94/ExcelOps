import { Component, OnInit, EventEmitter } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

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

  businessForm: FormGroup;

  constructor(
    private businessService: BusinessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: NbToastrService
  ) {
    this.businessForm = this.formBuilder.group({
      name: new FormControl('', [, Validators.required]),
      address: new FormControl('', [, Validators.required]),
      phoneNumber: new FormControl('', [, Validators.required]),
      password: new FormControl('', [, Validators.required]),
      categories: new FormControl([], [, Validators.required]),
      idNumber: new FormControl('', [, Validators.required]),
      firstName: new FormControl('', [, Validators.required]),
      lastName: new FormControl('', [, Validators.required]),
      gender: new FormControl('', [, Validators.required]),
      picture: [null],
      ownerPhoneNumber: new FormControl('', [, Validators.required]),
      ownerEmail: new FormControl('', [, Validators.required]),
      days: new FormControl([], [, Validators.required]),
      opens: new FormControl('', [, Validators.required]),
      closes: new FormControl('', [, Validators.required]),
      notes: ''
    });
  }

  ngOnInit() {
    const categoriesObservable = this.businessService.getCategories();
    categoriesObservable.subscribe((categoriesData) => {
      this.categories = categoriesData;
    })
  }

  logLocationChange(location: Location) {
    this.location = location;
  }

  uploadPicture(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.businessForm.patchValue({
      picture: file
    });

    this.businessForm.get('picture').updateValueAndValidity();
  }

  onSubmit(businessData) {
    var formData: any = new FormData();
    
    businessData.hours = {};
    businessData.latitude = (typeof this.location === 'undefined') ? 0.000 : this.location.lat;
    businessData.longitude = (typeof this.location === 'undefined') ? 0.000 : this.location.lng;
    for (let i = 0; i < businessData.days.length; i++) {
      const day = businessData.days[i];
      businessData.hours[day] = `${businessData.opens}-${businessData.closes}`;
    }

    formData.append("name", businessData.name);
    formData.append("address", businessData.address);
    formData.append("phoneNumber", businessData.phoneNumber);
    formData.append("password", businessData.password);
    formData.append("categories", businessData.categories);
    formData.append("idNumber", businessData.idNumber);
    formData.append("firstName", businessData.firstName);
    formData.append("lastName", businessData.lastName);
    formData.append("gender", businessData.gender);
    formData.append("picture", this.businessForm.get('picture').value);
    formData.append("ownerPhoneNumber", businessData.ownerPhoneNumber);
    formData.append("ownerEmail", businessData.ownerEmail);
    formData.append("notes", businessData.notes);
    formData.append("hours", JSON.stringify(businessData.hours));
    formData.append("latitude", businessData.latitude);
    formData.append("longitude", businessData.longitude);

    const ResponseObservable = this.businessService.createBusiness(formData);
    ResponseObservable.subscribe((response) => {
      localStorage.setItem("created", "true");
      this.businessForm.reset();
      //@ts-ignore
      this.toastr.success("Business Portfolio Created", "Success", { position: "top-right" });
      this.router.navigate(['/success']);
    }, (error) => {
      //@ts-ignore
      this.toastr.danger("Business Portfolio not Created", "Error", { position: "top-right" });
      this.router.navigate(['/business']);
    });
  }


}

export class Location {
  lat: number;
  lng: number;
  name?: string;
  zoom?: number;
  icon?: string;
}
