import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookService } from '../../services/book-service/book.service';
import { Book } from 'src/models/book';
import { User } from '../../models/user';
import { UserService } from 'src/services/user/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-rental',
  templateUrl: './new-rental.component.html',
  styleUrls: ['./new-rental.component.scss']
})
export class NewRentalComponent implements OnInit {
  addRentalForm: FormGroup;
  title: string;
  id: number;
  dateFrom: string;
  dateTo: string;
  user: User;
  availableBooks$: Observable<Book[]>;
  users$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAvailableBooks();
    this.getAllUsers();
    this.createFrom();
  }

  getAvailableBooks(): void {
    this.availableBooks$ = this.bookService.getAllBooks()
      .pipe(map((el) => [...el].filter((book) => book.availability)));
  }

  getAllUsers(): void {
    this.users$ = this.userService.getAllUsers();
  }

  createFrom(): void {
    this.addRentalForm = this.formBuilder.group({
      userID: [this.user],
      id: [this.id],
      rentedFrom: [this.dateFrom],
      rentedTo: [this.dateTo],
      availability: [false]
    });
  }

  onNewRental(): void {
    this.bookService.editBook(this.addRentalForm.value.id, this.addRentalForm.value).subscribe();
  }
}

