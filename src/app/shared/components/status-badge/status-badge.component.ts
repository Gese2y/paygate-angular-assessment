import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { PaymentStatus } from '../../../models/payment-status';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [MatChipsModule, CommonModule],
  templateUrl: './status-badge.component.html'
})
export class StatusBadgeComponent {

  @Input() status!: PaymentStatus;

  @Output()
  badgeClicked =
    new EventEmitter<string>();

  clickBadge() {
    this.badgeClicked.emit(this.status);
  }
}