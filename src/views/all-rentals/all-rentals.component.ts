import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReturnedBookComponent } from 'src/components/returned-book-modal/returned-book.component';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.scss']
})
export class AllRentalsComponent implements OnInit {
  public rented: any;
  public dataSource: any = [];
  public displayedColumns: string[] = ['id', 'title', 'rented-to-date', 'user', 'returned-earlier'];
  public allBooks: any;
  public rentedBooks: Book[] = [];
  public book: Book;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private async getAllBooks(): Promise<void> {
    this.bookService.getAllBooks()
      .subscribe(data => {
        this.allBooks = data;
        for (const book of this.allBooks) {
          if (book.availability === false) {
            this.rentedBooks.push(book);
          }
        }
        this.dataSource = new MatTableDataSource(this.rentedBooks);
      })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openReturnedBookModal(rented: any): void {
    this.dialog.open(ReturnedBookComponent, { width: '640px', disableClose: true, data: { rented } });
  }
}
