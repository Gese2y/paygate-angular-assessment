import {
  Directive,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appNumericOnly]',
  standalone: true
})
export class NumericOnlyDirective {

  private allowed = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Home',
    'End'
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.allowed.includes(event.key))
      return;

    if (!/^\d$/.test(event.key))
      event.preventDefault();
  }
}