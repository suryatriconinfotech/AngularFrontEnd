import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-app';
  constructor(private toastService: ToastService) {}

  showTestToast() {
    this.toastService.showToast('Test', 'This is a test toast!');
  }
}
