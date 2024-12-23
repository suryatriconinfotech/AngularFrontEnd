import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class BookManagerComponent implements OnInit {
  bookManagement$!: Observable<any[]>;
  
  constructor(  private apiService: ApiService,private authService: AuthService,private toastService:ToastService
  ) {}

  ngOnInit(): void {
    this.fetchBookManagement();
  }

  // Fetch book management data
  fetchBookManagement(): void {
    this.bookManagement$ = this.apiService.getBookManagement(this.authService.getToken());
  }

  // Clear history
  clearHistory(): void {
   this.apiService.clearHistory(this.authService.getToken()).subscribe(
    {
      next: (response)=>{
        this.toastService.showToast('Response',response.message);
        this.bookManagement$=this.apiService.getBookManagement(this.authService.getToken());
          console.log(response);
      },

    }
  );
   
  }

  // Notify user
  notifyUser(username: string,bookname: string): void {
    this.apiService.notifyUser(username,bookname,this.authService.getToken()).subscribe(
      {
        next: (response)=>{
          this.toastService.showToast('Response',`${username} notified Successfuly!`); 
            console.log(response);
        },
  
      }
    );
    this.bookManagement$=this.apiService.getBookManagement(this.authService.getToken());
  }
}
