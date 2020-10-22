import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../views/login/login.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { AllBooksComponent } from '../views/all-books/all-books.component';
import { AllRentalsComponent } from '../views/all-rentals/all-rentals.component';
import { NewRentalComponent } from '../views/new-rental/new-rental.component';
import { BookEditComponent } from '../views/book-edit/book-edit.component';
import { AllUsersComponent } from '../views/all-users/all-users.component';
import { AddBookComponent } from '../components/add-book-modal/add-book.component';
import { DeleteBookComponent } from '../components/delete-book-modal/delete-book.component';
import { EditBookComponent } from '../components/edit-book-modal/edit-book.component';
import { DeleteUserComponent } from '../components/delete-user-modal/delete-user.component';
import { CreateUserComponent } from '../components/create-user-modal/create-user.component';
import { EditUserComponent } from '../views/user-edit/edit-user.component';
import { EditUserModalComponent } from '../components/edit-user-modal/edit-user.component';
import { AuthGuard } from '../services/auth.guard';

//Material

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AllBooksComponent,
    AllRentalsComponent,
    NewRentalComponent,
    BookEditComponent,
    AddBookComponent,
    DeleteBookComponent,
    EditBookComponent,
    AllUsersComponent,
    DeleteUserComponent,
    CreateUserComponent,
    EditUserComponent,
    EditUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    StorageServiceModule,
    MatSelectModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
