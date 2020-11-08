import { Component, OnInit, Inject } from '@angular/core';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { RouterOutlet } from '@angular/router';
import { fader } from '../../app/route-animations';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    fader,
 ]
})
export class DashboardComponent implements OnInit {
  public rentedBooks = 0;
  public allBooks = 0;
  public books: Book[];
  public book: Book;
  public user: User;
  public users: User[];
  public allUsers = 0;
  public username: any;
  public admin: any;
  public loginUrl = 'http://localhost:3000/users';

  constructor(
    private bookService: BookService,
    private userService: UserService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.admin = this.storage.get('user');
    this.getAllRentedBooks();
    this.getAllUsers();
  }

  private async getAllRentedBooks(): Promise<void> {
    this.bookService.getAllBooks()
      .then(data => {
        this.books = data;
        for (this.book of this.books) {
          this.allBooks++;
          if (this.book.availability === false) {
            this.rentedBooks++;
          }
        }
      }).catch(err => {
        console.log(err);
      });
  }

  private async getAllUsers(): Promise<void> {
    this.userService.getAllUsers()
      .then((data) => {
        this.users = data;
        for (this.user of this.users) {
          this.allUsers ++;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
