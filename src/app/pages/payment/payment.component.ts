import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { PaymentPayload } from '../../models/payment-payload';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NumericOnlyDirective } from '../../shared/directives/numeric-only.directive';
import { EtbCurrencyPipe } from '../../shared/pipes/etb-currency.pipe';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,

  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatSelectModule,
  NumericOnlyDirective,
  EtbCurrencyPipe
],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private router: Router, private paymentService: PaymentService) { }

  form: FormGroup = this.fb.group({
  amount: [
    '',
    [
      Validators.required,
      Validators.min(1),
      Validators.max(50000)
    ]
  ],
  note: [
    '',
    Validators.maxLength(50)
  ],
  method: ['mobile']
});
ngOnInit() {
  this.addMobileControls();

  this.form.get('method')
    ?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(method => {

      if (method === 'mobile') {

        this.removeBankControls();
        this.addMobileControls();

      } else {

        this.removeMobileControls();
        this.addBankControls();
      }
    });
}
removeMobileControls(): void {
  this.form.removeControl('phoneNumber');
  this.form.removeControl('provider');
}

removeBankControls(): void {
  this.form.removeControl('accountNumber');
  this.form.removeControl('bankName');
  this.form.removeControl('accountHolderName');
}
addMobileControls() {

  if (!this.form.contains('phoneNumber')) {

    this.form.addControl(
      'phoneNumber',
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^09\d{8}$/)
      ])
    );
  }

  if (!this.form.contains('provider')) {

    this.form.addControl(
      'provider',
      this.fb.control('', Validators.required)
    );
  }
}
// addMobileControls() {

//   if (!this.form.contains('phoneNumber')) {

//     this.form.addControl(
//       'phoneNumber',
//       this.fb.control('', [
//         Validators.required,
//         Validators.pattern(/^09\d{8}$/)
//       ])
//     );
//   }

//   if (!this.form.contains('provider')) {

//     this.form.addControl(
//       'provider',
//       this.fb.control('', Validators.required)
//     );
//   }
// }
addBankControls() {
  if (!this.form.contains('accountNumber')) {
    this.form.addControl(
      'accountNumber',
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{13}$/)
      ])
    );
  }

  if (!this.form.contains('bankName')) {
    this.form.addControl(
      'bankName',
      this.fb.control('', Validators.required)
    );
  }

  if (!this.form.contains('accountHolderName')) {
    this.form.addControl(
      'accountHolderName',
      this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ])
    );
  }
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

submit(): void {
  if (this.form.invalid) return;

  const payload: PaymentPayload = this.form.getRawValue();

  const txRef = this.paymentService.initiatePayment(payload);

  this.router.navigate(['/pay/processing'], { state: { txRef } });
}
}
