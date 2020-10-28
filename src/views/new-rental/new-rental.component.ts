import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BookService } from '../../services/book-service/book.service';
import { Book } from 'src/models/book';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

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
  public books: any;
  public availableBooks: any[] = [];
  public url: string = this.bookService.url;
  public usersUrl = 'http://localhost:3000/users';
  public users: any;
  public user: User;


  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private http: HttpClient
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
    await this.http.get(`${this.url}`).toPromise()
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
    await this.http.get(`${this.usersUrl}`).toPromise()
      .then((users) => {
        this.users = users;
      })
     .catch(err => {
        console.log(err);
     });
  }

  public async onNewRental(): Promise<void> {
    console.log(this.addRentalForm.value);
    await this.http.patch<Book>(`${this.url}/${this.addRentalForm.value.id}`, this.addRentalForm.value)
       .toPromise()
       .then((book: Book) => {
         this.book = book;
         console.log(this.book);
       })
       .catch(err => {
         console.log(err);
       });
  }
}

