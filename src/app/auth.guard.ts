import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('userIsLogedIn') === 'true';

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
