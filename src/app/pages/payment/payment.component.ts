import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
  MatSelectModule
],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

constructor(private fb: FormBuilder) { }
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

  this.form.addControl(
    'accountNumber',
    this.fb.control('', [
      Validators.required,
      Validators.pattern(/^\d{13}$/)
    ])
  );

  this.form.addControl(
    'bankName',
    this.fb.control('', Validators.required)
  );

  this.form.addControl(
    'accountHolderName',
    this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ])
  );
}
}
