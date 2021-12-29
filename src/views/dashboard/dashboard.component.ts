import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  rentedBooks = 0;
  allBooks = 0;
  books: Book[];
  book: Book;
  user: User;
  users: User[];
  allUsers = 0;
  username: string;
  admin: any;
  loginUrl = 'http://localhost:3000/users';

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('user'));
    this.getAllRentedBooks();
    this.getAllUsers();
  }

  private async getAllRentedBooks(): Promise<void> {
    this.bookService.getAllBooks()
      .subscribe(data => {
        this.books = data;
        for (this.book of this.books) {
          this.allBooks++;
          if (this.book.availability === false) {
            this.rentedBooks++;
          }
        }
      });
  }

  private async getAllUsers(): Promise<void> {
    this.userService.getAllUsers()
      .subscribe((data) => {
        this.users = data;
        for (this.user of this.users) {
          this.allUsers++;
        }
      },
        (err => {
          console.log(err);
        }));
  }
}
