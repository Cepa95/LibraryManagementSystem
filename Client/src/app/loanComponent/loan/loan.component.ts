import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../loanComponent/loan/loan.service';
@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent{}
// export class LoanComponent implements OnInit {
//   loanedBooks: number[] = [];

//   constructor(private loanService: LoanService) {}

//   ngOnInit(): void {
//     this.loanedBooks = this.loanService.getLoan();
//   }
// }

