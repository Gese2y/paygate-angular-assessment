import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './status-badge.component.html'
})
export class StatusBadgeComponent {

  @Input()
  status!: 'success' | 'failed' | 'pending';

  @Output()
  badgeClicked =
    new EventEmitter<string>();

  clickBadge() {
    this.badgeClicked.emit(this.status);
  }
}