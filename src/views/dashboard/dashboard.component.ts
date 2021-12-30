import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allBooks$: Observable<Book[]>;
  rentedBooks$: Observable<Book[]>;
  users$: Observable<User[]>;
  username: string;
  admin: any;
  loginUrl = 'http://localhost:3000/users';

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('user'));
    this.username = atob(this.admin.username);
    this.getAllRentedBooks();
    this.getAllUsers();
  }

  getAllRentedBooks(): void {
    this.rentedBooks$ = this.bookService.getAllBooks().pipe(
      map((el) => [...el].filter((book) => !book.availability)),
    );
    this.allBooks$ = this.bookService.getAllBooks();
  }

  getAllUsers(): void {
    this.users$ = this.userService.getAllUsers();
  }
}
