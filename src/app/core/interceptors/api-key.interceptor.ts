import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const cloned = req.clone({
			setHeaders: {
				'X-API-Key': 'mock-paygate-key-2024'
			}
		});

		return next.handle(cloned);
	}
}

