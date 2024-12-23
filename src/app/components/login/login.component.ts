import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports:[FormsModule]
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toastService:ToastService
  ) {}

  onLogin(): void {
    this.apiService.login(this.loginData).subscribe({
      next : (response: any) => {
        const { user, token } = response;
        this.authService.setToken(token);
        this.authService.setUser(user);
        this.toastService.showToast('Response','LoggedIn Successfully!'); // Redirect to login page after logging out
        console.log(this.authService.getUser());
        this.router.navigate(['/profile']);
      },
      error : (error) => {
        this.toastService.showToast('Error',error.error.message); 
        console.log(error);
      }
    }
    );
  }
}
