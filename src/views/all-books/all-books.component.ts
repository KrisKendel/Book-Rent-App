import { Component, OnInit } from '@angular/core';
import { AddBookComponent } from '../../components/add-book-modal/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  displayedColumns: string[] = ['authors', 'title', 'cover', 'availability'];
  books$: Observable<Book[]>;

  constructor(
    private dialog: MatDialog,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.books$ = this.bookService.getAllBooks();
  }

  // APPLY FILTER TO OBSERVABLE
  // applyFilter(event: Event): any {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openModal(): void {
    this.dialog.open(AddBookComponent, { width: '640px', disableClose: true });
  }
}
