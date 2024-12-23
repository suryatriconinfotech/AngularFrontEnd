import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports:[FormsModule]
})
export class SignupComponent {
  signupData = { username: '', password: '', role: 'student' };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastService:ToastService
  ) {}

  onSignup(): void {
    this.apiService.signup(this.signupData).subscribe({
      next: (response) => {
        this.toastService.showToast('Response',response.message);
        console.log('Signup successful', response);

        this.router.navigate(['/login']);
      },
      error : (error) => {
        
        this.toastService.showToast('Error',error.error.message);
        console.log(error);
      }
    }
    );
  }
}
