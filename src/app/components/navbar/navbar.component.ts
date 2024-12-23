import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Assuming you have an AuthService to manage user session
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,RouterModule]
})
export class NavbarComponent implements OnInit {
  // user: User | null =null; 
  user$: Observable<User | null> | undefined;

  constructor(private authService: AuthService, private router: Router,private toastService: ToastService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$; // Get the user object from the auth service
  }

  handleLogout(): void {
    this.authService.logout(); // Call logout function from auth service
    this.toastService.showToast('Response','Successfully logged out'); // Redirect to login page after logging out
    console.log('Successfully logged out');
  }
}
