import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { NgForm } from '@angular/forms';
import { LoginAndRegisterService } from '../login-and-register.service';
@Component({
  selector: 'app-userConfig',
  templateUrl: './userConfig.component.html',
  styleUrls: ['./userConfig.component.scss']
})
export class UserConfigComponent implements OnInit {
  @ViewChild('userForm', { static: false }) userForm!: NgForm;
  isAdmin: boolean = false;
  user: User | undefined;
  updateUser: Partial<User> = {}; // Use Partial<User> to make all properties optional
  errorMessage: string = '';
  users: User[] = [];
  isModalOpen: boolean = false;
  selectedUser: User | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private loginAndRegisterService: LoginAndRegisterService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      console.log('User not authenticated, redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'Admin';
    console.log('User Role:', userRole);

    const userId = this.authService.getUserId();
    console.log('Retrieved User ID:', userId);

    if (userId) {
      this.fetchUserDetails(userId);
      this.fetchAllUsers();
      this.fetchUsers();
    } else {
      console.error('User ID is null or undefined');
      // Optionally, navigate to an error page or show an error message
    }
  }
  fetchAllUsers(): void {
    console.log('Fetching all users...');
    this.http.get<User[]>('https://localhost:5001/api/account').subscribe(
      (users: User[]) => {
        console.log('All users fetched successfully:', users);
        this.users = users.filter(user => user.role !== 'Admin');
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  openEditModal(user: User) {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedUser = null;
    this.isModalOpen = false;
  }
  fetchUsers(): void {
    this.loginAndRegisterService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'An error occurred while fetching users.';
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  updateUserRole(selectedUser: User): void {
    if (!selectedUser) {
      console.error('No user selected for updating.');
      return;
    }
  
    const userId = selectedUser.id;
    console.log('Updating user role for User ID:', userId);
  
    const updatedUser = { ...selectedUser }; // Create a copy of the selectedUser
  
    // Conditionally update the role property
    if (updatedUser.role === 'Admin') {
      updatedUser.role = 'User';
    } else if (updatedUser.role === 'User') {
      updatedUser.role = 'Admin';
    }
  
    // Check if the dateOfBirth property exists and is not in the correct format
    if (updatedUser.dateOfBirth && !(updatedUser.dateOfBirth instanceof Date) && !/^\d{4}-\d{2}-\d{2}$/.test(updatedUser.dateOfBirth)) {
      updatedUser.dateOfBirth = this.formatDate(new Date(updatedUser.dateOfBirth)) as unknown as Date;
    }
  
    const headers = { 'Content-Type': 'application/json' };
  
    // Check if the user ID is available
    if (userId) {
      console.log('Request Payload:', updatedUser); // Log the request payload
  
      // Send the HTTP PUT request to update the user role
      this.http.put(`https://localhost:5001/api/account/${userId}`, updatedUser, { headers }).subscribe(
        () => {
          console.log('User role updated successfully');
          this.errorMessage = ''; // Reset error message if the request succeeds
          this.closeModal(); // Close the modal after updating user role
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error && error.error.errors) {
            // Handle validation errors received from the server
            const validationErrors: any = error.error.errors;
            // Concatenate error messages
            let messages: string[] = [];
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                messages = messages.concat(validationErrors[key]);
              }
            }
            this.errorMessage = messages.join('; ');
          } else {
            // Handle other types of errors
            console.error('Error updating user role:', error);
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      );
    } else {
      console.error('User ID is null or undefined');
      this.errorMessage = 'User ID is not available.';
    }
  }
  

  deleteUser(userId: number | undefined): void {
    if (userId && confirm('Are you sure you want to delete this user?')) {
      this.loginAndRegisterService.deleteUser(userId).subscribe(
        () => {
          // User deleted successfully, remove from the list
          this.users = this.users.filter(u => u.id !== userId);
          this.selectedUser = null; // Deselect the user
          console.log('User deleted successfully');
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'An error occurred while deleting the user.';
        }
      );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  fetchUserDetails(userId: number): void {
    console.log('Fetching user details for User ID:', userId);
    this.http.get<User>(`https://localhost:5001/api/account/${userId}`).subscribe(
      (user: User) => {
        console.log('User details fetched successfully:', user);
        this.user = user;
        // Expand updateUser object with all user properties
        this.updateUser = { ...user };
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateUserDetails(): void {
    const userId = this.authService.getUserId();
    console.log('Updating user details for User ID:', userId);

    if (userId) {
      const headers = { 'Content-Type': 'application/json' };
      // Check if the form is valid before submitting
      if (!this.userForm.valid) {
        alert('Please fill in all required fields.');
        return;
      }
      // Format dateOfBirth if it exists in updateUser and is not already formatted
      if (this.updateUser.dateOfBirth) {
        if (this.updateUser.dateOfBirth instanceof Date || !/^\d{4}-\d{2}-\d{2}$/.test(this.updateUser.dateOfBirth)) {
          this.updateUser.dateOfBirth = this.formatDate(new Date(this.updateUser.dateOfBirth)) as unknown as Date;
        }
      }

      // Filter out properties with null or empty string values from updateUser
      const updatedFields = Object.fromEntries(
        Object.entries(this.updateUser).filter(([_, value]) => value !== null && value !== '')
      );

      console.log('Request Payload:', updatedFields); // Log the request payload

      this.http.put(`https://localhost:5001/api/account/${userId}`, updatedFields, { headers }).subscribe(
        () => {
          console.log('User details updated successfully');
          // Reset error message if the request succeeds
          this.errorMessage = '';
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error && error.error.errors) {
            // Handle validation errors received from the server
            const validationErrors: any = error.error.errors;
            // Concatenate error messages
            let messages: string[] = [];
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                messages = messages.concat(validationErrors[key]);
              }
            }
            this.errorMessage = messages.join('; ');
          } else {
            // Handle other types of errors
            console.error('Error updating user details:', error);
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      );
    } else {
      console.error('User ID is null or undefined');
      this.errorMessage = 'User ID is not available.';
    }
  }
}
