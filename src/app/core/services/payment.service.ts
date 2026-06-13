import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private transactionSubject =
    new BehaviorSubject<Transaction | null>(null);

  currentTransaction$ =
    this.transactionSubject.asObservable();

  get currentTransaction() {
    return this.transactionSubject.value;
  }

  clearTransaction(): void {
    this.transactionSubject.next(null);
  }
}