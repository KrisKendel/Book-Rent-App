import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-returned-book',
  templateUrl: './returned-book.component.html',
  styleUrls: ['./returned-book.component.scss']
})
export class ReturnedBookComponent implements OnInit {
  public returnedForm: FormGroup;
  public rentedBook: Book;

  constructor(
    @Inject(MAT_DIALOG_DATA) public rented: object,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    for (const id in this.rented) {
      if (this.rented.hasOwnProperty(id)) {
        this.rentedBook = this.rented[id];
      }
    }
    this.returnedForm = this.formBuilder.group({
      availability: [true],
      rentedFrom: [''],
      rentedTo: [''],
      userID: null
    });
  }

  async onConfirmBookReturned(event): Promise<void> {
    event.stopPropagation();
    this.bookService.editBook(this.rentedBook.id, this.returnedForm.value);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
