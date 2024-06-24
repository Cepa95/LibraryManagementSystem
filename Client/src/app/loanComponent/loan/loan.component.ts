import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../loanComponent/loan/loan.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loan } from '../../shared/models/loan'; 
@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
// export class LoanComponent{}
export class LoanComponent implements OnInit {
  loanedBooks: number[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.loanService.getLoans().subscribe((loans: Loan[]) => {
      this.loanedBooks = loans.map(loan => loan.Book);
    }, (error) => {
      console.error('Failed to fetch loans:', error);
    });
  }
}

