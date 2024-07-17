import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../loanComponent/loan/loan.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loan } from '../../shared/models/loan'; 
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
// export class LoanComponent{}
export class LoanComponent implements OnInit {
  loanedBooks: Loan[] = [];

  constructor(private loanService: LoanService, protected authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isAdmin){
      this.fetchLoans();

    } else{
    this.fetchUserLoans();
    }
  }

  fetchLoans(): void {
    if (this.authService.isAdmin) {
      this.loanService.getAllLoans().subscribe(
        (loans: Loan[]) => {
          console.log(loans);
          this.loanedBooks = loans;
        },
        (error) => {
          console.error('Failed to fetch all loans:', error);
        }
      );
    } else {
      this.fetchUserLoans();
    }
  }

  fetchUserLoans(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.loanService.getUserLoans(userId).subscribe(
        (loans: Loan[]) => {
          console.log(loans);
          this.loanedBooks = loans;
        },
        (error) => {
          console.error('Failed to fetch user loans:', error);
        }
      );
    } else {
      console.error('User is not logged in.');
    }
  }
}

