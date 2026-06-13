import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { EtbCurrencyPipe } from '../../shared/pipes/etb-currency.pipe';
import { Transaction } from '../../models/transaction';
import { PaymentService } from '../../core/services/payment.service';
import { Router } from '@angular/router';

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
export class ReceiptComponent {
transaction: Transaction | null = null;
constructor(private paymentService: PaymentService, private router: Router) {
  // this.paymentService.currentTransaction$.subscribe(transaction => {
  //   this.transaction = transaction;
  // }); 
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

}