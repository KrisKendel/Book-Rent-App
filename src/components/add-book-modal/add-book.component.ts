import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addCreateForm: FormGroup;
  title: string;
  authors: Array<string>;
  shortDescription: string;
  publishDate: string;
  availability: boolean;
  thumbnailUrl: string;
  rentedFrom: string;
  availableAfter: string;
  url: string = this.bookService.url;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.addCreateForm = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      publishDate: [this.publishDate],
      thumbnailUrl: [this.thumbnailUrl, [Validators.required]],
      shortDescription: [this.shortDescription],
      authors: [this.authors, [Validators.required]],
      availability: [true],
      userID: [null],
      rentedFrom: [''],
      rentedTo: ['']
    });
  }
  onCreateBook(): void {
    this.bookService.createBook(this.addCreateForm.value).subscribe();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
