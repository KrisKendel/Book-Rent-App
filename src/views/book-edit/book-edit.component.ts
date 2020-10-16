import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/models/book';
import { Subscription } from 'rxjs';
import { BookService } from 'src/services/book-service/book.service';
import { Location } from '@angular/common';
import { DeleteBookComponent } from '../../components/delete-book-modal/delete-book.component';
import { EditBookComponent } from '../../components/edit-book-modal/edit-book.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
 
  public book: any;
  public bookID: number;
  public isLoading: boolean = false;
  public bookRequest: Subscription;
 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.bookID = this.activatedRoute.snapshot.params['bookID'];
    this.fetchBook(this.bookID);
    console.log(this.bookID)
  }

  async fetchBook(bookID) {
    this.isLoading = true;

     this.bookRequest = this.bookService
      .getBook(bookID)
      .subscribe((book: any)=> {
        this.isLoading = false;
        this.book = book;
        }, (err) => {
        this.router.navigate(['/404'], { skipLocationChange: true });
      });
    }
     
    openDeleteModal() {
     this.dialog.open(DeleteBookComponent,{width: '640px',disableClose: true });
    }

    openEditModal() {
      this.dialog.open(EditBookComponent,{width: '640px',disableClose: true });
    }
  

  onDeleteBook() {}

  ngOnDestroy(){
    if(this.bookRequest)
    this.bookRequest.unsubscribe();
  }

}
