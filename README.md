# Library Management System
## Table of Contents
* [General Info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Goal of the Application](#goal-of-the-application)
* [Business Logic](#business-logic)
* [ER diagram](#er-diagram)

## General Info
Library Management System is a web application that manages the library. It enables viewing the library catalog and taking actions 
on library materials and users.

## Features

### User Management
- Roles (base for authorization):
    - Administrator
    - Librarian
    - Member
- Available operations:
    - User Registration
    - User Data Modification and Updates
    - User Deletion
- Authentication (login/logout)
- Display All Users (with Search, Filters, Sorting, and Pagination)
- Show Detailed User Information
- Display Current User Details (My Profile)
### Library Materials/Resources & Catalog Management

#### Authors
- Available operations:
    - Add new author
    - Edit and update author
    - Remove author
- Browse All Authors (with Search, Sorting, and Pagination)
#### Categories
- Available operations:
    - Add new category
    - Modify and Update Category Details
    - Remove category
- View all categories (with search, sorting and pagination)
#### Works
- Available operations:
    - Add new work
    - Modify and Update Work Details
    - Remove work
- Browse All Works (with Search, Filters, Sorting, and Pagination)
- View All Copies of a Specific Work (with Search, Filters, and Pagination)
#### Books
- Available operations:
    - Add new book
    - Modify and Update Book Details
    - Remove book
- Browse All Books (with Search, Filters, and Pagination)
#### Resource Borrowing - Loans
- Management of Library Resource Loans
    - Issue loan
        - Restriction: Maximum of '5' books per member can be borrowed simultaneously
    - Conclude loan
- View All Active Loans (with Sorting and Pagination)
- View All Loans of a Specific Book (with Sorting and Pagination)
- Browse Loans by Member - Current and Past Loans (with Sorting and Pagination)

## Technologies
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg"  height="70"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" height="70"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" height="70"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg" height="70"/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="70"/>
          
## Goal of the Application
The goal of our online book rental application is to provide users with a seamless and convenient platform to access a wide variety of 
books. Through simple registration and login processes, users can create accounts and personalize their experience. Our application 
enables users to effortlessly browse our extensive collection, check out books of their choice, and place orders with ease. By streamlining
the checkout process, we aim to make renting books online quick and efficient. Additionally, users can log out securely, ensuring their 
account information remains protected. Ultimately, our goal is to foster a user-friendly environment that promotes accessibility to 
literature and encourages a love for reading.

## Business Logic

The business logic of our online book rental application revolves around offering a user-friendly interface for browsing, selecting, and
renting books. Customers can register, log in securely, and browse our extensive catalog. Upon selecting their desired books, they can 
efficiently check them out and place orders. The system manages inventory, tracks rentals, and facilitates secure transactions.
Additionally, it provides personalized recommendations based on users' preferences and history, enhancing their experience and fostering
customer loyalty.

## ER diagram

<img src="ER dijagram baze.jpg" alt="dijagram" width="800"/>
