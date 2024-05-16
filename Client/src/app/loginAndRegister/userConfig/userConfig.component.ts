import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-userConfig',
  templateUrl: './userConfig.component.html',
  styleUrls: ['./userConfig.component.scss']
})
export class UserConfigComponent implements OnInit {
  isAdmin: boolean = false;
  user: User | undefined;
  updateUser = {
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: ''
  };

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
    this.http.get<User>(`https://localhost:5001/api/account/${userId}`).subscribe(
      (user: User) => {
        console.log('User details fetched successfully:', user);
        this.user = user;
        // Only assign the fields that you want to update
        this.updateUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          phoneNumber: user.phoneNumber
        };
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  updateUserDetails(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      const headers = { 'Content-Type': 'application/json' };
      this.http.put(`https://localhost:5001/api/account/${userId}`, this.updateUser, { headers }).subscribe(
        () => {
          console.log('User details updated successfully');
          // Update the local user object to reflect the changes
          if (this.user) {
            this.user.firstName = this.updateUser.firstName;
            this.user.lastName = this.updateUser.lastName;
            this.user.password = this.updateUser.password;
            this.user.phoneNumber = this.updateUser.phoneNumber;
          }
        },
        error => {
          console.error('Error updating user details:', error);
        }
      );
    } else {
      console.error('User ID is null or undefined');
    }
  }
}
