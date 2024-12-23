import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]> | null = null; // Orders as an Observable
  error: string | null = null; // Error message
  user$: Observable<User | null> |null=null; // Observable for user info
  username : string ='';

  constructor(private apiService: ApiService, private authService: AuthService,private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.user$ = this.authService.getUser();
    const token = this.authService.getToken();

    if (this.user$) {
      this.authService.user$.subscribe(user => {
        if (user) {
          this.username = user.username;
        } else {
          this.username = '';
        }
      });
  
      this.orders$ = this.apiService.getMyOrders(this.username, token);
    }
  }

  handleReturn(order: Order): void {
    this.user$ = this.authService.getUser();
    const token = this.authService.getToken();

    if (this.user$) {
      const returnData = { username: this.username, bookname: order.bookname };

      this.apiService.returnBook(returnData, token).subscribe({
        next: (response) => {
          this.toastService.showToast('Response',response.message); // Redirect to login page after logging out
          console.log(response);
          this.fetchOrders(); // Refresh the orders list after returning a book
        },
        error: (err) => {

          this.toastService.showToast('Error',err.message);
          console.error('Error returning book:', err.message);
          console.log(err.message);
        },
      });
    }
  }
}
