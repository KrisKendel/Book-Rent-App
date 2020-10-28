import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/models/book';
import { DeleteBookComponent } from '../../components/delete-book-modal/delete-book.component';
import { EditBookComponent } from '../../components/edit-book-modal/edit-book.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/services/book-service/book.service';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit{

  public book: any;
  public bookID: number;
  public url: string;
  public fechedBook: Book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.url = this.bookService.url;
    this.bookID = this.activatedRoute.snapshot.params.bookID;
    this.fetchBook(this.bookID);
  }

  private async fetchBook(bookID: number): Promise<void> {
    await this.http.get<Book>(`${this.url}/${bookID}`).toPromise()
    .then((book: Book) => {
      this.fechedBook = book;
    }).catch(err => {
      console.log(err);
    });
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteBookComponent, {width: '640px', disableClose: true,  data: { bookID: this.bookID }});
  }

  openEditModal(): void {
    this.dialog.open(EditBookComponent, {width: '640px', disableClose: true, data: { bookID: this.bookID }});
  }
}
