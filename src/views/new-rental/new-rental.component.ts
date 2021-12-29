import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BookService } from '../../services/book-service/book.service';
import { Book } from 'src/models/book';
import { User } from '../../models/user';
import { UserService } from 'src/services/user/user.service';

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
  filteredOptions: Observable<object[]>;
  myControl = new FormControl();
  book: Book;
  books: Book[];
  availableBooks: any[] = [];
  users: User[];
  user: User;
  error: Error;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAvailableBooks();
    this.getAllUsers();
    this.addRentalForm = this.formBuilder.group({
      userID: [this.user],
      id: [this.id],
      rentedFrom: [this.dateFrom],
      rentedTo: [this.dateTo],
      availability: [false]
    });
  }

  getAvailableBooks(): void {
    this.bookService.getAllBooks()
      .subscribe((books) => {
        this.books = books;
        for (const book of this.books) {
          if (book.availability === true) {
            this.availableBooks.push(book);
          }
        }
      });
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe((users) => {
        this.users = users;
      },
        (err => {
          console.log(err);
        }));
  }

  onNewRental(): void {
    this.bookService.editBook(this.addRentalForm.value.id, this.addRentalForm.value)
      .subscribe((book: Book) => {
        this.book = book;
      }, (error) => this.error = error);
  }
}

