import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly USER_ID_KEY = 'userId';

  constructor() {}

  // Store access token in localStorage
  storeToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  // Retrieve access token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
  
  setUserId(userId: string): void {
    localStorage.setItem(this.USER_ID_KEY, userId);
  }
  
  getUserId(): string | null { 
    return localStorage.getItem(this.USER_ID_KEY);
  }

  // Check if the user is logged in (token exists)
  isUserLoggedIn(): boolean {
    const token = this.getToken();
    if(token) {
      return true;
    }
    return false
  }

}