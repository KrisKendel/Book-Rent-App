import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/models/book';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.scss']
})
export class AllRentalsComponent implements OnInit {
  public rented: any = {};
  public dataSource: any = [];
  public displayedColumns: string[] = ['id', 'authors', 'title', 'rented-to-date', 'user'];
  public allBooks: any;
  public rentedBooks: Book[] = [];
  public url: string;

  constructor(
    private http: HttpClient,
    private bookService: BookService
  ) { }
   
  ngOnInit(): void {
    this.url = this.bookService.url
    this.getAllBooks()
  }

  private async getAllBooks() {
    this.allBooks = await this.http.get<Book>(this.url).toPromise()
      .then(data => {
        this.allBooks = data;
        for(let book of this.allBooks) {
          if(book.availability === false) {
             this.rentedBooks.push(book)
          }
        }
       this.dataSource = new MatTableDataSource(this.rentedBooks)
      }).catch(err => {
        console.log(err)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
