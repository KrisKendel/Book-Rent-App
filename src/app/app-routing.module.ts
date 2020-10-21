import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/views/dashboard/dashboard.component';
import { LoginComponent } from 'src/views/login/login.component';
import { AllBooksComponent } from 'src/views/all-books/all-books.component';
import { AllRentalsComponent } from 'src/views/all-rentals/all-rentals.component';
import { NewRentalComponent } from 'src/views/new-rental/new-rental.component';
import { BookEditComponent } from 'src/views/book-edit/book-edit.component';
import { AllUsersComponent } from 'src/views/all-users/all-users.component';
import { AuthGuard } from 'src/services/auth.guard';

const routes: Routes = [
  { path : '', component: LoginComponent },
  { path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path : 'dashboard/all-books', component: AllBooksComponent, canActivate: [AuthGuard] },
  { path : 'dashboard/all-rentals', component: AllRentalsComponent, canActivate: [AuthGuard] },
  { path : 'dashboard/new-rental', component: NewRentalComponent, canActivate: [AuthGuard] },
  { path : 'dashboard/all-users', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path : 'dashboard/all-books/:bookID/edit-book', component: BookEditComponent, canActivate: [AuthGuard] } 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
