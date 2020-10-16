import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {
  public addCreateForm: FormGroup;
  public title: string;
  public authors: string;
  public description: string;
  public date: string;
  public availability: boolean;
  public newBook: {};
  public thumbnailUrl: string;
  public addBookSubscription: Subscription;

  url = ' http://localhost:3000/books';

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.addCreateForm = this.formBuilder.group({
      title: [this.title, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      authors: [this.authors, [Validators.required]],
      description: [this.description],
      date: [this.date],
      availability: [this.availability],
      thumbnailUrl: [this.thumbnailUrl, [Validators.required]]
    });
  }
  onCreateBook() {
    this.newBook = this.addCreateForm.value
    this.addBookSubscription = this.http.post(this.url, this.newBook).subscribe ((data) => {
      console.log(data);
    }); 
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    if(this.addBookSubscription)
    this.addBookSubscription.unsubscribe()
  }

}
