import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports:[CommonModule,FormsModule]
})
export class ToastComponent implements OnInit {
  title: string = '';
  message: string = '';
  show: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    // Listen for toast notifications
    this.toastService.toastObservable.subscribe(({ title, message }) => {
      this.title = title;
      this.message = message;
      this.show = true;

      // Auto-dismiss after 2 seconds
      setTimeout(() => (this.show = false), 2000);
    });
  }
}
