import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval, timer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnDestroy {

  txRef?: string;
  private destroy$ = new Subject<void>();
  private resolved = false;

  constructor(private router: Router, private paymentService: PaymentService, private http: HttpClient) {}

  ngOnInit(): void {
    const state = (history && history.state) || {};
    this.txRef = state.txRef;

    if (!this.txRef) {
      this.router.navigate(['/pay']);
      return;
    }

    // start polling every 3s (mocked HTTP call) so interceptor is visible
    interval(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.http.get('/mock/status')
          .pipe(catchError(() => of(null)))
          .subscribe();
      });

    // resolve after random 6-15s
    const rand = 6000 + Math.floor(Math.random() * 9000);
    timer(rand).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.resolved) return;
      const isSuccess = Math.random() < 0.7;
      this.paymentService.resolveTransaction(this.txRef!, isSuccess ? 'success' : 'failed');
      this.resolved = true;
      this.router.navigate(['/pay/receipt']);
    });

    // hard timeout 2 minutes
    timer(120000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.resolved) return;
      this.paymentService.resolveTransaction(this.txRef!, 'failed');
      this.resolved = true;
      this.router.navigate(['/pay/receipt']);
    });
  }

  cancel(): void {
    // navigate away; pendingPaymentGuard will prompt the user
    this.router.navigate(['/pay']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
