import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object
  ) { }

  static saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null{
    if(typeof window !== 'undefined'){
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(){
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(){
    const user = this.getUser();

    if(user == null){
      return "";
    }
    else{
      return user.role;
    }
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() == null)
      return false;
    
    const role: string = this.getUserRole();
    
    return role == "ADMIN";
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken() == null)
      return false;
    
    const role: string = this.getUserRole();
    
    return role == "CUSTOMER";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
