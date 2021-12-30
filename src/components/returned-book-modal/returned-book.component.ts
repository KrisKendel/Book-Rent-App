import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/models/book';

@Component({
  selector: 'app-returned-book',
  templateUrl: './returned-book.component.html',
  styleUrls: ['./returned-book.component.scss']
})
export class ReturnedBookComponent implements OnInit {
  returnedForm: FormGroup;
  rentedBook: Book;

  constructor(
    @Inject(MAT_DIALOG_DATA) public rented: object,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
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

  onConfirmBookReturned(event): void {
    event.stopPropagation();
    const data = {
      id: this.rentedBook.id,
      formValue: this.returnedForm.value,
    };
    this.dialogRef.close(data);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
