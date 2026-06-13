import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { PaymentPayload } from '../../models/payment-payload';
import { PaymentStatus } from '../../models/payment-status';

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

  initiatePayment(payload: PaymentPayload): string {
    const txRef = uuidv4();

    const tx: Transaction = {
      txRef,
      amount: payload.amount,
      note: payload.note,
      method: payload.method,
      recipient: payload.method === 'mobile' ? (payload.phoneNumber || '') : (payload.accountNumber || ''),
      provider: payload.provider,
      bankName: payload.bankName,
      status: 'pending' as PaymentStatus,
      createdAt: new Date()
    };

    this.transactionSubject.next(tx);

    return txRef;
  }

  resolveTransaction(txRef: string, status: 'success' | 'failed') {
    const current = this.transactionSubject.value;

    if (!current || current.txRef !== txRef) return;

    const updated: Transaction = {
      ...current,
      status: status === 'success' ? 'success' : 'failed',
      resolvedAt: new Date()
    };

    this.transactionSubject.next(updated);
  }
}