import { Injectable } from '@angular/core';
import { User } from '../models/user';  // Import the User model
import { BehaviorSubject,Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'  // Makes this service available globally
})
export class AuthService {
  // private user: User | null = null;  // User will follow the structure of the User model
  private token: string = '';
  private role: string | undefined='';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(private router:Router) {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      this.userSubject.next(JSON.parse(storedUser));
      this.token = storedToken;
    }
    
  }
  


  setUser(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }

  logout() {
    this.userSubject.next(null);
    this.token='';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigate(['/login']);
    
  }

  // Set user and token data
  // setUser(user: User): void {
  //   this.user = user;
  // }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Get user and token data
  // getUser(): User | null {
  //   return this.user;
  // }

  getToken(): string {
    return this.token;
  }
  
  getUserRole(): any {
    this.user$.subscribe(u=>{
      this.role=u?.role;
    }); // Return the role of the logged-in user
    return  this.role;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.userSubject.value !== null && this.token !== '';
  }
  // Clear user and token data
 
}
