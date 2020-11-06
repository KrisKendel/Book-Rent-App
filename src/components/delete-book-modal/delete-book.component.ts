import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book-service/book.service';
import { Book } from 'src/models/book';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  public book: Book;
  public bookIDValue: number;
  public url: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public bookID: object,
    private dialog: MatDialog,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.url = this.bookService.url;
    for (const id in this.bookID){
      if (this.bookID.hasOwnProperty(id)){
        this.bookIDValue = this.bookID[id];
      }
    }
  }

  async onDeleteBook(): Promise<void> {
    this.bookService.deleteBook(this.bookIDValue);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
