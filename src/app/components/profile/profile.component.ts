import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { ApiService } from '../../services/api.service'; // Import API Service
import { Observable } from 'rxjs'; // Import Observable
import { User } from '../../models/user'; // Assuming a User model exists
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class ProfileComponent implements OnInit {
  user$:Observable<User|null> | null=null;
  token: string ='';
  pendingUsers$: Observable<any[]> | null = null;
  error: string | null = null;
  role: string ='';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private toastService:ToastService

  ) {}

  ngOnInit(): void {
    // Fetch user and token from AuthService
      this.user$=this.authService.getUser();
      this.token = this.authService.getToken();
       // Assuming getToken() method exists
       this.authService.getUser().subscribe((u)=>{
        if(u){
          this.role=u.role;
        }
        else{
          this.role='';
        }
        
       });
      if (this.role === 'LIBRARIAN') {
        this.fetchPendingUsers();
      }
  }

  // Fetch pending users
  fetchPendingUsers(): void {
   this.pendingUsers$=this.apiService.getPendingUsers(this.token);
  }

  // Handle user approval
  handleApprove(username: string): void {
    this.apiService.approveUser(username, this.token!).subscribe({
      next : (response) => {
        this.toastService.showToast('Response',response.message);
        console.log(response);
        this.fetchPendingUsers(); // Refresh pending users list after approval
      },
      error: (err) => {
        console.error('Error approving user:', err);
        this.toastService.showToast('Error',err.message);
      }
    }
    );
  }

 
}
