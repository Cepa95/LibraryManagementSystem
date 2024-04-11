import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
}