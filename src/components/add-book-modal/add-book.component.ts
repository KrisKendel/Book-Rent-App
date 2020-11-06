import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public addCreateForm: FormGroup;
  public title: string;
  public authors: Array<string>;
  public shortDescription: string;
  public publishDate: string;
  public availability = true;
  public newBook: Book;
  public thumbnailUrl: string;
  public rentedFrom: string;
  public availableAfter: string;
  public url: string = this.bookService.url;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public http: HttpClient,
    public bookService: BookService
  ) { }

  ngOnInit(): void {
    this.addCreateForm = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      publishDate: [this.publishDate],
      thumbnailUrl: [this.thumbnailUrl, [Validators.required]],
      shortDescription: [this.shortDescription],
      authors: [this.authors, [Validators.required]],
      availability: [this.availability]
    });
  }
  public async onCreateBook(): Promise<void> {
     this.newBook = this.addCreateForm.value;
     this.bookService.createBook(this.newBook);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
