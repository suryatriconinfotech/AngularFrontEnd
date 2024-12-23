import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class HomeComponent implements OnInit {
  books$: Observable<Book[]> |null=null; // Observable for books list
  user$: Observable<User | null> |null=null; // Observable for user info
  username : string |null=null;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private toastService:ToastService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$; // Assuming user$ is an observable in AuthService
    this.books$ = this.apiService.getBooks(); // Fetch books using ApiService
  }

  orderBook(book: Book): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.username = user.username;
      } else {
        this.username = null;
      }
    });
    const orderData = {
      username: this.username,
      bookname: book.bookname,
      author: book.author
    };

    this.apiService.orderBook(orderData,this.authService.getToken()).subscribe({
      next: (r) => {
        this.books$ = this.apiService.getBooks();
        this.toastService.showToast('Response',r.message); 
        console.log(r);
        // Refresh the books list after ordering
      },
      error: (error) => {
        console.error('Error ordering book:', error.message);
      }
    });
  }

  deleteBook(bookId: number): void {
   
      this.apiService.deleteBook(bookId,this.authService.getToken()).subscribe({
        next: (r) => {
          this.books$ = this.apiService.getBooks();
          this.toastService.showToast('Response',r.message); 
          console.log('Book deleted successfully');
           // Refresh the books list after deletion
        },
        error: (error) => {
          console.error('Error deleting book:', error.message);
          console.log('Failed to delete book');
        }
      });
    
  }

  handleAddBook(): void {
    this.router.navigate(['/addbook']); // Navigate to Add Book page
  }
}
