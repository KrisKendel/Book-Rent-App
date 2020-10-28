import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddBookComponent } from '../../components/add-book-modal/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/models/book';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {

  public books: any = {};
  public book: Book;
  public displayedColumns: string[] = ['authors', 'title', 'cover', 'availability'];
  public dataSource: any = [];
  public bookEdit: any;
  public data: any;
  public url: string;

  constructor(
      private dialog: MatDialog,
      private http: HttpClient,
      private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.url = this.bookService.url;
    this.getAllBooks();
  }

  private async getAllBooks(): Promise<void> {
    this.books = await this.http.get(`${this.url}`).toPromise()
      .then(data => {
        this.books = data;
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
