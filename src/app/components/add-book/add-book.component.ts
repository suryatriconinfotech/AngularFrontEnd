import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book';
import { ToastService } from '../../services/toast.service';




@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  standalone: true,
  imports:[FormsModule],
 
})
export class AddBookComponent {
  bookData: Book = { id: 0,  bookname: '', author: '', count: 1 };  // Initialize bookData with the Book model

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService:ToastService
  ) {}

  addBook(): void {
    const token = this.authService.getToken();
    this.apiService.addBook(this.bookData, token).subscribe({
      next :(response) => {
        this.toastService.showToast('Response',response.message); 
        console.log('Book added successfully', response);
        // You can reset the form or navigate to another page here
      },
      error: (error) => {
        this.toastService.showToast('ERROR',error.message); 
        console.error('Failed to add book', error.message);
      }
    }
    );
  }
}
