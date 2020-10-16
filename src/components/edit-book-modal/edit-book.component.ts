import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/services/book-service/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  public bookID: number
  public book: any
  public addEditForm: FormGroup
  public title: string;
  public authors: string;
  public description: string;
  public date: string;
  public availability: boolean;
  public newBook: {};
  public thumbnailUrl: string;

  private activatedRoute: ActivatedRoute;
  public bookRequest: Subscription;

  url = ' http://localhost:3000/books';

  constructor(
   private formBuilder: FormBuilder,
   private dialog: MatDialog,
   private http: HttpClient,
   private router: Router,
   private bookService: BookService
  ) { }

  ngOnInit(): void {
     this.bookID = 4;
     
      this.bookRequest = this.bookService
        .getBook(this.bookID)
        .subscribe((book: any)=> {
          this.book = book;
          console.log(this.book.title)
          }, (err) => {
          this.router.navigate(['/404'], { skipLocationChange: true });
        });
      
    this.addEditForm = this.formBuilder.group({
      title: [this.title, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      authors: [this.authors, [Validators.required]],
      description: [this.description],
      date: [this.date],
      availability: [this.availability],
      thumbnailUrl: [this.thumbnailUrl, [Validators.required]]
    });
  }

  onEditBook() {}

  closeDialog(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    if(this.bookRequest)
    this.bookRequest.unsubscribe();
  }

}
