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
  public bookIDValue: number;
  public book: Book;
  public bookFetch: any;
  public title: string;
  public authors: string;
  public shortDescription: string;
  public publishDate: string;
  public availability = false;
  public thumbnailUrl: string;
  public bookEdit: any;
  public addEditForm: FormGroup;
  public url: string = this.bookService.url;

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

  private async fetchBook(bookID: number): Promise<void> {
    this.bookService.getBook(bookID)
      .then(book => {
        this.bookEdit = book;
        this.addEditForm = this.formBuilder.group({
          title: [this.bookEdit.title, [Validators.required]],
          publishDate: [this.bookEdit.publishDate],
          thumbnailUrl: [this.bookEdit.thumbnailUrl, [Validators.required]],
          shortDescription: [this.bookEdit.shortDescription],
          authors: [this.bookEdit.authors, [Validators.required]],
          availability: [this.bookEdit.availability]
        });
      }).catch(err => {
        console.log(err);
      });
  }

  public async onEditBook(): Promise <void> {
    this.bookService.editBook(this.bookIDValue, this.addEditForm.value)
    .then((book: Book) => {
      this.book = book;
      this.router.navigateByUrl('/dashboard/all-books');
    }).catch(err => {
      console.log(err);
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
