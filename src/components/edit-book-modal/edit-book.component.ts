import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/services/book-service/book.service';
import { Book } from 'src/models/book';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  providers: [DatePipe]
})
export class EditBookComponent implements OnInit {
  bookIDValue: number;
  book: Book;
  bookFetch: any;
  title: string;
  authors: string;
  shortDescription: string;
  publishDate: string;
  availability = false;
  thumbnailUrl: string;
  bookEdit: any;
  addEditForm: FormGroup;
  url: string = this.bookService.url;
  error: Error;

  constructor(
    @Inject(MAT_DIALOG_DATA) public bookID: object,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    for (const id in this.bookID) {
      if (this.bookID.hasOwnProperty(id)) {
        this.bookIDValue = this.bookID[id];
        if (this.bookIDValue) {
          this.bookFetch = this.fetchBook(this.bookIDValue);
        }
      }
    }
  }

  fetchBook(bookID: number): void {
    this.bookService.getBook(bookID)
      .subscribe(book => {
        this.bookEdit = book;
        this.addEditForm = this.formBuilder.group({
          title: [this.bookEdit.title, [Validators.required]],
          publishDate: [this.bookEdit.publishDate],
          thumbnailUrl: [this.bookEdit.thumbnailUrl, [Validators.required]],
          shortDescription: [this.bookEdit.shortDescription],
          authors: [this.bookEdit.authors, [Validators.required]],
          availability: [this.bookEdit.availability]
        });
      }, (error) => { this.error = error });
  }

  onEditBook(): void {
    this.bookService.editBook(this.bookIDValue, this.addEditForm.value)
      .subscribe((book: Book) => {
        this.book = book;
        this.router.navigateByUrl('/dashboard/all-books');
      }, (error) => { this.error = error; });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
