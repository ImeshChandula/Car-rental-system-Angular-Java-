import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//import { AdminRoutingModule } from '../../admin-routing.module';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../../../auth/services/storage/storage.service';



@Component({
  standalone: true,
  selector: 'app-post-car',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroImportsModule,

  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  postCarFrom!: FormGroup;

  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  listOfOption: Array<{label: string, value: string}> = [];
  listOfBrands = ["BMW","AUDI","FERRARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA"];
  listOfType = ["Petrol","Diesel","Hybrid","Electric","CNG"];
  listOfColor = ["Red","White","Blue","Black","Orange","Grey","Silver"];
  listOfTransmission = ["Manual","Automatic"];
  validateForm: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router,
  ){}

  ngOnInit(){
    this.postCarFrom = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
  }

  postCar(){
    console.log(this.postCarFrom.value);
    console.log('Current Token:', StorageService.getToken());
    console.log('Current User Role:', StorageService.getUserRole());

    this.isSpinning = true;

    if (this.postCarFrom.invalid) {
      Object.keys(this.postCarFrom.controls).forEach(field => {
        const control = this.postCarFrom.get(field);
        control?.markAsTouched();
      });
      return;
    }

    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('brand', this.postCarFrom.get('brand')?.value);
    formData.append('name', this.postCarFrom.get('name')?.value);
    formData.append('type', this.postCarFrom.get('type')?.value);
    formData.append('color', this.postCarFrom.get('color')?.value);
    formData.append('year', this.postCarFrom.get('year')?.value);
    formData.append('transmission', this.postCarFrom.get('transmission')?.value);
    formData.append('description', this.postCarFrom.get('description')?.value);
    formData.append('price', this.postCarFrom.get('price')?.value);

    console.log(formData);
    
    this.adminService.postCar(formData).subscribe((res)=> {
      this.isSpinning = false;
      this.message.success("Car posted Successfully.", {nzDuration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    }, error => {
      this.isSpinning = false;
      const errorMessage = error.error?.message || error.statusText || "Error while posting car.";
      this.message.error(errorMessage, {nzDuration: 5000});
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }
  }
  

  previewImage(){
    if (!this.selectedFile) return; 
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  

}
