import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { BookManagerComponent } from './components/book-manager/book-manager.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'myorders', component: MyOrdersComponent , canActivate: [authGuard] },
  { path: 'bookmanager', component: BookManagerComponent , canActivate: [authGuard] },
  { path: 'addbook', component: AddBookComponent , canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [authGuard] },
  { path: 'logout', component: LoginComponent } // Wildcard route for 404
];
