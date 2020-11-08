import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddBookComponent } from '../../components/add-book-modal/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  public books: Book[];
  public book: Book;
  public displayedColumns: string[] = ['authors', 'title', 'cover', 'availability'];
  public dataSource: any = [];
  public bookEdit: any;

  constructor(
    private dialog: MatDialog,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  public async getBooks(): Promise<void> {
    this.bookService.getAllBooks()
      .then((books) => {
        this.books = books;
        this.dataSource = new MatTableDataSource(this.books);
      }).catch(err => {
        console.log(err);
      });
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(): void {
   this.dialog.open(AddBookComponent, { width: '640px', disableClose: true });
  }
}
