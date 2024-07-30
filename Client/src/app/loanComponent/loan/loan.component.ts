import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../loanComponent/loan/loan.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Loan } from '../../shared/models/loan'; 
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loanedBooks: Loan[] = [];
  userLoanCounts: { [userId: number]: number } = {};
  filteredLoans: Loan[] = [];
  searchTerm: string = '';
  loggedInAdminId: number | undefined;

  constructor(private loanService: LoanService, protected authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAdmin) {
      this.fetchLoans();
      this.fetchUserLoanCounts();
    } else {
      this.fetchUserLoans();
    }
  }

  fetchLoans(): void {
    if (this.authService.isAdmin) {
      this.loanService.getAllLoans().subscribe(
        (loans: Loan[]) => {
          this.loanedBooks = loans;
          this.filteredLoans = loans; 
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
          this.loanedBooks = loans;
          this.filteredLoans = loans;
        },
        (error) => {
          console.error('Failed to fetch user loans:', error);
        }
      );
    } else {
      console.error('User is not logged in.');
    }
  }

  fetchUserLoanCounts(): void {
    this.loanService.getUserLoanCounts().subscribe(
      (counts: { [userId: number]: number }) => {
        this.userLoanCounts = counts;
      },
      (error) => {
        console.error('Failed to fetch user loan counts:', error);
      }
    );
  }

  filterLoans(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredLoans = this.loanedBooks.filter(loan => 
      (loan.book.searchCriteria && loan.book.searchCriteria.toLowerCase().includes(term))
    );
  }
  returnBook(loanId: number): void {
    this.loanService.deleteLoan(loanId).subscribe(
      () => {
        this.loanedBooks = this.loanedBooks.filter(loan => loan.id !== loanId);
        this.filteredLoans = this.filteredLoans.filter(loan => loan.id !== loanId);
        // Optionally, you can also fetchUserLoanCounts again if needed
        console.log('Book returned successfully');
      },
      (error) => {
        console.error('Failed to return the book:', error);
      }
    );
  }
}
