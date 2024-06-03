import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginAndRegisterService } from '../login-and-register.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userConfig',
  templateUrl: './userConfig.component.html',
  styleUrls: ['./userConfig.component.scss']
})
export class UserConfigComponent implements OnInit {
  @ViewChild('userForm', { static: false }) userForm!: NgForm;
  form!: FormGroup;
  isAdmin: boolean = false;
  user: User | undefined;
  updateUser: Partial<User> = {};
  errorMessage: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  isModalOpen: boolean = false;
  selectedUser: User | null = null;
  searchTerm: string = '';
  loggedInAdminId: number | undefined;
  confirmPassword: string = '';
  isPasswordModalOpen: boolean = false;
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordForm: FormGroup;
  passwordPattern: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private loginAndRegisterService: LoginAndRegisterService,
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.buildForm();
      console.log('User not authenticated, redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }


    this.updateUser = {
      password: ''
    };
    
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'Admin';
    console.log('User Role:', userRole);

    const userId = this.authService.getUserId();
    console.log('Retrieved User ID:', userId);

    if (userId) {
      this.loggedInAdminId = userId;
      this.fetchUserDetails(userId);
      this.fetchAllUsers(userId);
      this.fetchUsers();
    } else {
      console.error('User ID is null or undefined');
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      confirmNewPassword: ['', Validators.required]
    });
  }
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { 'mismatch': true };
  }
  fetchAllUsers(loggedInAdminId: number): void {
    console.log('Fetching all users...');
    this.http.get<User[]>('https://localhost:5001/api/account').subscribe(
      (users: User[]) => {
        console.log('All users fetched successfully:', users);
        this.users = users.filter(user => user.id !== loggedInAdminId);
        this.filterUsers();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
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

  openPasswordModal() {
    console.log('Open password modal triggered'); // Add this line
    this.isPasswordModalOpen = true;
  }

  closePasswordModal(): void {
    this.isPasswordModalOpen = false;
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  updateAdminPassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      console.log("Passwords do not match.");
      return;
    }

    const adminId = this.authService.getUserId();
    if (adminId) {
      const newPasswordData = { newPassword: this.newPassword };
      const headers = { 'Content-Type': 'application/json' };
      this.http.put(`https://localhost:5001/api/account/admin/password/${adminId}`, newPasswordData, { headers }).subscribe(
        () => {
          console.log('Admin password updated successfully');
          this.errorMessage = '';
          alert('Admin password updated successfully.');
          this.newPassword = '';
          this.confirmNewPassword = '';
          this.closePasswordModal();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating admin password:', error);
          this.errorMessage = 'An unexpected error occurred while updating the admin password.';
        }
      );
    } else {
      console.error('Admin ID is null or undefined');
      this.errorMessage = 'Admin ID is not available.';
    }
  }


  fetchUsers(): void {
    this.loginAndRegisterService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.filterUsers();
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'An error occurred while fetching users.';
      }
    );
  }

  updateUserRole(): void {
    if (!this.selectedUser) {
      console.error('No user selected for updating.');
      return;
    }

    const userId = this.selectedUser.id;
    const updatedUser = { ...this.selectedUser };

    if (updatedUser.role === 'Admin') {
      updatedUser.role = 'User';
    } else if (updatedUser.role === 'User') {
      updatedUser.role = 'Admin';
    }

    if (updatedUser.dateOfBirth && !(updatedUser.dateOfBirth instanceof Date) && !/^\d{4}-\d{2}-\d{2}$/.test(updatedUser.dateOfBirth)) {
      updatedUser.dateOfBirth = this.formatDate(new Date(updatedUser.dateOfBirth)) as unknown as Date;
    }

    const headers = { 'Content-Type': 'application/json' };

    this.http.put(`https://localhost:5001/api/account/${userId}`, updatedUser, { headers }).subscribe(
      () => {
        this.errorMessage = '';
        this.closeModal();
        this.fetchAllUsers(this.authService.getUserId()!);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error && error.error.errors) {
          const validationErrors: any = error.error.errors;
          let messages: string[] = [];
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              messages = messages.concat(validationErrors[key]);
            }
          }
          this.errorMessage = messages.join('; ');
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    );
  }

  deleteUser(userId: number | undefined): Observable<void> {
    return new Observable<void>(observer => {
      if (userId && confirm('Are you sure you want to delete this user?')) {
        this.loginAndRegisterService.deleteUser(userId).subscribe(
          () => {
            this.users = this.users.filter(u => u.id !== userId);
            this.filteredUsers = this.filteredUsers.filter(u => u.id !== userId);
            this.selectedUser = null;
            location.reload();
            observer.next(); // Notify that deletion is complete
            observer.complete(); // Complete the observable
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'An error occurred while deleting the user.';
            observer.error(error); // Pass error to observer
          }
        );
      }
    });
  }
  fetchUserDetails(userId: number): void {
    this.http.get<User>(`https://localhost:5001/api/account/${userId}`).subscribe(
      (user: User) => {
        this.user = user;
        this.updateUser = { ...user,password:'' };
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

    if (userId) {
      const headers = { 'Content-Type': 'application/json' };
      if (!this.userForm.valid) {
        alert('Please fill in all required fields.');
        return;
      }
      if (this.updateUser.dateOfBirth) {
        if (this.updateUser.dateOfBirth instanceof Date || !/^\d{4}-\d{2}-\d{2}$/.test(this.updateUser.dateOfBirth)) {
          this.updateUser.dateOfBirth = this.formatDate(new Date(this.updateUser.dateOfBirth)) as unknown as Date;
        }
      }

      const updatedFields = Object.fromEntries(
        Object.entries(this.updateUser).filter(([_, value]) => value !== null && value !== '')
      );

      this.http.put(`https://localhost:5001/api/account/${userId}`, updatedFields, { headers }).subscribe(
        () => {
          alert('Personal data successfully changed.');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error && error.error.errors) {
            const validationErrors: any = error.error.errors;
            let messages: string[] = [];
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                messages = messages.concat(validationErrors[key]);
              }
            }
            this.errorMessage = messages.join('; ');
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      );
    } else {
      this.errorMessage = 'User ID is not available.';
    }
  }

  userSelfDelete(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      // Display confirmation alert
      const confirmation = confirm('Are you sure you want to delete your account?');

      if (confirmation) {
        // User confirmed deletion, proceed with deletion
        alert("Step 1 , deleting data");
        this.loginAndRegisterService.deleteUser(userId).subscribe(
          () => {
            // User deleted successfully, clear authentication token and navigate to the login page
            alert("Step 2 , deleting token");
            this.authService.logout().subscribe(() => {
              console.log('User logged out'); // Add this line to verify logout
              // this.router.navigate(['/login']);
            }, error => {
              console.error('Error logging out:', error); // Log any errors during logout
            });
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting user:', error);
            this.errorMessage = 'An error occurred while deleting the user.';
          }
        );
      } else {
        // User cancelled deletion, do nothing
        console.log('Deletion cancelled');
      }
    } else {
      console.error('User ID is null or undefined');
      this.errorMessage = 'User ID is not available.';
    }
  }



  confirmUserDelete(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      // Display confirmation window pop-up
      const confirmation = window.confirm('Are you sure you want to delete your account?');

      if (confirmation) {
        // User confirmed deletion, proceed with deletion
        this.loginAndRegisterService.deleteUser(userId).subscribe(
          () => {
            // User deleted successfully
            // Logout the user
            this.authService.logout().subscribe(() => {
              // Navigate to the login page
              this.router.navigate(['account/login']);
            }, error => {
              console.error('Error logging out:', error); // Log any errors during logout
            });
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting user:', error);
            this.errorMessage = 'An error occurred while deleting the user.';
          }
        );
      } else {
        // User cancelled deletion, do nothing
        console.log('Deletion cancelled');
      }
    } else {
      console.error('User ID is null or undefined');
      this.errorMessage = 'User ID is not available.';
    }
  }

}  
