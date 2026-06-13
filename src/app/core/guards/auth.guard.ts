import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = new Router();

  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};