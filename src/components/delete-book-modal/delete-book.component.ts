import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit, OnDestroy {

  url = ' http://localhost:3000/books/';
  public bookID;
  public deleteBookSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onDeleteBook() {
   this.deleteBookSubscription= this.http.delete(this.url, {}).subscribe ((data) => {
       console.log(data)
    }); 
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    if(this.deleteBookSubscription)
    this.deleteBookSubscription.unsubscribe();
  }

}
