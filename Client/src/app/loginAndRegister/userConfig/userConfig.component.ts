import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-userConfig',
  templateUrl: './userConfig.component.html',
  styleUrls: ['./userConfig.component.scss']
})
export class UserConfigComponent implements OnInit {
  isAdmin: boolean = false;
  user: User | undefined;
  updateUser: Partial<User> = {}; // Use Partial<User> to make all properties optional
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
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
    } else {
      console.error('User ID is null or undefined');
      // Optionally, navigate to an error page or show an error message
    }
  }

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

  updateUserDetails(): void {
    const userId = this.authService.getUserId();
    console.log('Updating user details for User ID:', userId);
  
    if (userId) {
      const headers = { 'Content-Type': 'application/json' };
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

