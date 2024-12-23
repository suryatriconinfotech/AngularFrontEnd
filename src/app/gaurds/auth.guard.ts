import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService=inject(ToastService);

  const userRole = authService.getUserRole();
  
  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }
  if(route.routeConfig?.path === 'logout'){
    authService.logout(); // Call logout function from auth service
    toastService.showToast('Response','LogOut has been Done Successfully!!');
    return false;
  }
  // Check route-specific role requirements
  if (route.routeConfig?.path === 'myorders' && userRole !== 'STUDENT') {
    toastService.showToast('Response','You are not the Student!!');
    return router.createUrlTree(['/profile']); // Redirect to home if user is not a STUDENT
  }
  if (route.routeConfig?.path === 'bookmanager' && userRole !== 'LIBRARIAN') {
    toastService.showToast('Response','You are not the Librarian!!');
    return router.createUrlTree(['/profile']); // Redirect to home if user is not a LIBRARIAN
  }
  if (route.routeConfig?.path === 'addbook' && userRole !== 'LIBRARIAN') {
    toastService.showToast('Response','You are not the Librarian!!');
    return router.createUrlTree(['/home']); // Redirect to home if user is not a LIBRARIAN
  }

  // If user has the correct role, allow access
  return true;
};
