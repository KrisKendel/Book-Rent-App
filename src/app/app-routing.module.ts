import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/views/dashboard/dashboard.component';
import { LoginComponent } from 'src/views/login/login.component';
import { AllBooksComponent } from 'src/views/all-books/all-books.component';
import { AllRentalsComponent } from 'src/views/all-rentals/all-rentals.component';
import { NewRentalComponent } from 'src/views/new-rental/new-rental.component';
import { BookEditComponent } from 'src/views/book-edit/book-edit.component';

const routes: Routes = [
  { path : '', component: LoginComponent },
  { path : 'dashboard', component: DashboardComponent },
  { path : 'dashboard/all-books', component: AllBooksComponent },
  { path : 'dashboard/all-rentals', component: AllRentalsComponent },
  { path : 'dashboard/new-rental', component: NewRentalComponent },
  { path : 'dashboard/all-books/:bookID/edit-book', component: BookEditComponent } 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
