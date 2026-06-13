import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { EtbCurrencyPipe } from '../../shared/pipes/etb-currency.pipe';
import { Transaction } from '../../models/transaction';
import { PaymentService } from '../../core/services/payment.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    StatusBadgeComponent,
    EtbCurrencyPipe
  ],
  templateUrl: './receipt.component.html'
})
export class ReceiptComponent implements OnDestroy {
  transaction: Transaction | null = null;
  private destroy$ = new Subject<void>();

  constructor(private paymentService: PaymentService, private router: Router) {
    this.paymentService.currentTransaction$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tx => {
        this.transaction = tx;

        // If there's no transaction or it's still pending, redirect back
        if (!tx || tx.status === 'pending') {
          this.router.navigate(['/pay']);
        }
      });
  }
get maskedRecipient(): string {

  if (!this.transaction) return '';

  const value = this.transaction.recipient;

  return '****' + value.slice(-4);
}

newPayment(): void {
  this.paymentService.clearTransaction();
  this.router.navigate(['/pay']);
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

}