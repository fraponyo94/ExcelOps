import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [`:host ::ng-deep .datatable-row-center {
    line-height: 2em !important;
    padding: 9px !important;
  }`]
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: any[];
  categoryForm: any;
  showForm: boolean = false;
  parameter: string;

  navigationSubscription: any;

  columns = [
    { name: 'Name' },
    { name: 'Description' },
    { name: 'Icon' }
  ];

  constructor(
    private businessService: BusinessService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private toastr: NbToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl('', [, Validators.required]),
      description: new FormControl('', [, Validators.required]),
      icon: new FormControl('', [, Validators.required]),
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        //Initialize Invites
        this.displayForm();
        this.loadData();
      }
    });
  }

  ngOnInit() {

  }

  displayForm() {
    this.parameter = this.route.snapshot.paramMap.get('id');
    if (this.parameter) {
      let openButton: HTMLElement = document.getElementById('openButton');
      openButton.click();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  loadData() {
    const categoriesObservable = this.businessService.getCategories();
    categoriesObservable.subscribe((categoriesData) => {
      this.categories = categoriesData;
    });
  }

  open(dialog: TemplateRef<any>) {
    console.log(dialog);
    this.dialogService.open(dialog, { context: 'Add a new Category' });
  }

  onSubmit(formData: any) {
    const ResponseObservable = this.businessService.createCategory(formData);
    ResponseObservable.subscribe((response) => {
      console.log(response)
      this.categoryForm.reset();
      //@ts-ignore
      this.toastr.success("Category created", "Success", { position: "top-right" });
    }, (error) => {
      //@ts-ignore
      this.toastr.danger("Unable to create Category", "Error", { position: "top-right" });
    })
  }
}

