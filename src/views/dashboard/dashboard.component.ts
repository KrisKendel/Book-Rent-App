import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { Book } from 'src/models/book';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/services/book-service/book.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../../models/user';

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public rentedBooks: number = 0;
  
  public books: any;
  public url: string = this.bookService.url;
  public book: Book;
  public user: any;
  public users: any;
  public allUsers: number = 0;
  public username: any;
  public admin: any;
  public loginUrl = "http://localhost:3000/users";

  constructor(
    private http: HttpClient,
    private bookService: BookService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.admin = JSON.parse(this.storage.get('user'))
    this.getAllRentedBooks()
    this.getAllUsers()
  }

  private async getAllRentedBooks() {
    this.books = await this.http.get<Book>(this.url).toPromise()
      .then(data => {
        this.books = data;
        for (this.book of this.books) {
          if (this.book.availability === false)
            this.rentedBooks++;
        }
      }).catch(err => {
        console.log(err)
      })
  }

  private async getAllUsers() {
    this.users = await this.http.get<any>(this.loginUrl).toPromise()
      .then((data) => {
        this.users = data;
        for (this.user of this.users) {
          this.allUsers ++;
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
