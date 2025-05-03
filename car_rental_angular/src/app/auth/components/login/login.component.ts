import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Ng Zorro
import { NgZorroImportsModule } from '../../../NgZorroImportsModule';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-login',
  imports: [
    NgZorroImportsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) =>{
      console.log(res);

      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);

        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");
        }
        else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/dashboard");
        }
        else{
          this.message.error("Bad Credentials.", {nzDuration: 5000});
        }
        
      }
    })
  }



}
