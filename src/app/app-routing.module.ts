import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/views/dashboard/dashboard.component';
import { LoginComponent } from 'src/views/login/login.component';
import { AllBooksComponent } from 'src/views/all-books/all-books.component';
import { AllRentalsComponent } from 'src/views/all-rentals/all-rentals.component';
import { NewRentalComponent } from 'src/views/new-rental/new-rental.component';
import { BookEditComponent } from 'src/views/book-edit/book-edit.component';
import { AllUsersComponent } from 'src/views/all-users/all-users.component';
import { EditUserComponent } from 'src/views/user-edit/edit-user.component';
import { AuthGuard } from 'src/services/auth.guard';
import { RegisterComponent } from 'src/views/register/register.component';


const routes: Routes = [
  { path : '', component: LoginComponent, data: {animation: 'login'}},
  { path : 'registration', component: RegisterComponent, data: {animation: 'register'}},
  { path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {animation: 'dashboard'}},
  { path : 'dashboard/all-books', component: AllBooksComponent, canActivate: [AuthGuard], data: {animation: 'allBooks'}},
  { path : 'dashboard/all-rentals', component: AllRentalsComponent, canActivate: [AuthGuard], data: {animation: 'allRentals'}},
  { path : 'dashboard/new-rental', component: NewRentalComponent, canActivate: [AuthGuard], data: {animation: 'newRental'}},
  { path : 'dashboard/all-users', component: AllUsersComponent, canActivate: [AuthGuard], data: {animation: 'allUsers'}},
  { path : 'dashboard/all-books/:bookID/edit-book', component: BookEditComponent, canActivate: [AuthGuard] },
  { path : 'dashboard/all-users/:userID/edit-user', component: EditUserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
