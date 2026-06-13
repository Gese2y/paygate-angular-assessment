import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { PaymentService } from '../services/payment.service';

export const pendingPaymentGuard: CanDeactivateFn<any> = () => {

  const paymentService = inject(PaymentService);

  const tx = paymentService.currentTransaction;

  if (tx?.status === 'pending') {
    return confirm(
      'A payment is being verified. If you leave now the payment may still be deducted. Are you sure?'
    );
  }

  return true;
};