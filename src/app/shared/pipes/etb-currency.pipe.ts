import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etbCurrency',
  standalone: true
})
export class EtbCurrencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etbCurrency',
  standalone: true
})
export class EtbCurrencyPipe implements PipeTransform {

  transform(value: number | null | undefined): string {

    const amount = Number(value ?? 0);

    return `ETB ${amount.toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )}`;
  }
}