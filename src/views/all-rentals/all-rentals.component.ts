import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/models/book';
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

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private async getAllBooks(): Promise<void> {
    this.bookService.getAllBooks()
      .then(data => {
        this.allBooks = data;
        for (const book of this.allBooks) {
          if (book.availability === false) {
             this.rentedBooks.push(book);
          }
        }
        this.dataSource = new MatTableDataSource(this.rentedBooks);
      }).catch(err => {
        console.log(err);
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
