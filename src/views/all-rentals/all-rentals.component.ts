import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnedBookComponent } from 'src/components/returned-book-modal/returned-book.component';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.scss']
})
export class AllRentalsComponent implements OnInit {
  rented: any;
  dataSource: any = [];
  displayedColumns: string[] = ['id', 'title', 'rented-to-date', 'user', 'returned-earlier'];
  allBooks: any;
  rented$: Observable<Book[]>;
  book: Book;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.rented$ = this.bookService.getAllBooks().pipe(
      map((el) => [...el].filter((book) => !book.availability)),
    );
  }
  // add filter
  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openReturnedBookModal(rented: any): void {
    const returnDialog = this.dialog.open(ReturnedBookComponent, { width: '640px', disableClose: true, data: { rented } });
    returnDialog.afterClosed().subscribe((data) => {
      this.bookService.editBook(data.id, data.formValue).subscribe();
    });
  }
}
