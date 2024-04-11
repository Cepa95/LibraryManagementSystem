import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinner.show();
  
    return next.handle(req).pipe(
      finalize(() => this.spinner.hide()));
  }
}