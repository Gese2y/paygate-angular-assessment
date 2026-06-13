import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etbCurrency',
  standalone: true
})
export class EtbCurrencyPipe implements PipeTransform {

  transform(value: number | null | undefined): string {

    if (value === null || value === undefined || isNaN(value)) {
      return 'ETB 0.00';
    }

    return `ETB ${Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2
    })}`;
  }

}