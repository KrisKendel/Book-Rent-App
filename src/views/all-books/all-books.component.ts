import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book-service/book.service'
import { MatTableDataSource } from '@angular/material/table';
import { AddBookComponent } from '../../components/add-book-modal/add-book.component'
import { MatDialog } from '@angular/material/dialog'


import { Subscription } from 'rxjs';
import { Book } from 'src/models/book';

//import { Book } from 'src/models/books';


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit, OnDestroy {

  books: any = {};
  book: any = {};
  displayedColumns: string[] = ['authors', 'title', 'cover', 'availability'];
  dataSource: any = [];
  booksSubscription: Subscription;
  bookSubscription: Subscription;

  constructor(
      private bookService: BookService,
      private dialog: MatDialog
  ) 
  { }

  ngOnInit(): void {
    this.booksSubscription = this.bookService.getBooks().subscribe
      ((data) => {
          this.books = data;
          this.dataSource = new MatTableDataSource(this.books)
      },
        (error) => console.log(error)
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBook(id: number) {
    this.bookSubscription = this.bookService.getBook(id).subscribe
      (
        (data) => {
          this.book = data;
        },
        (error) => console.log(error)
      );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddBookComponent,{
      width: '640px',disableClose: true 
    });
  }

  ngOnDestroy() {
    if(this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    } 

    if(this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
    
  }

}
