export interface PaymentPayload {
  amount: number;
  note?: string;
  method: 'mobile' | 'bank';

  phoneNumber?: string;
  provider?: string;

  accountNumber?: string;
  bankName?: string;
  accountHolderName?: string;
}