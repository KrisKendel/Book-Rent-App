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
  public addRentalForm: FormGroup;
  public title: string;
  public id: number;
  public dateFrom: string;
  public dateTo: string;
  public filteredOptions: Observable<object[]>;
  public myControl = new FormControl();
  public book: Book;
  public books: Book[];
  public availableBooks: any[] = [];
  public users: User[];
  public user: User;


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

  public async getAvailableBooks(): Promise<void> {
    this.bookService.getAllBooks()
      .then((books) => {
        this.books = books;
        for (const book of this.books) {
          if (book.availability === true) {
            this.availableBooks.push(book);
          }
        }
      });
  }

  public async getAllUsers(): Promise<void> {
    this.userService.getAllUsers()
      .then((users) => {
        this.users = users;
      })
     .catch(err => {
        console.log(err);
     });
  }

  public async onNewRental(): Promise<void> {
    this.bookService.editBook(this.addRentalForm.value.id , this.addRentalForm.value)
    .then((book: Book) => {
         this.book = book;
       })
       .catch(err => {
         console.log(err);
       });
  }
}

