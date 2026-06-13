import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProcessingComponent } from './pages/processing/processing.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { authGuard } from './core/guards/auth.guard';
import { pendingPaymentGuard } from './core/guards/pending-payment.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'pay',
    component: PaymentComponent,
    canActivate: [authGuard]
  },

  {
    path: 'pay/processing',
    component: ProcessingComponent,
    canActivate: [authGuard],
    canDeactivate: [pendingPaymentGuard]
  },

  {
    path: 'pay/receipt',
    component: ReceiptComponent,
    canActivate: [authGuard]
  },

  { path: '**', component: NotFoundComponent }
];