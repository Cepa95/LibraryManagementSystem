import { Book } from "./book";
import { User } from "./user";

export interface Loan {
    id: number;
    borrowedDate: Date;
    returnedDate: Date;
    numberOfBorrowedBooks: number;
    user: User;
    book: Book;
  }