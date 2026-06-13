import { PaymentStatus } from './payment-status';

export interface Transaction {
  txRef: string;
  amount: number;
  note?: string;

  method: 'mobile' | 'bank';

  recipient: string;

  provider?: string;
  bankName?: string;

  status: PaymentStatus;

  createdAt: Date;
  resolvedAt?: Date;
}