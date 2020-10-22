import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { BookService } from '../../services/book-service/book.service'
import { Book } from 'src/models/book';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
    @Inject(MAT_DIALOG_DATA) public bookID: Object,
    private dialog: MatDialog,
    private router: Router,
    private bookService: BookService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.url = this.bookService.url;
    for(let id in this.bookID){
      if(this.bookID.hasOwnProperty(id)){
        this.bookIDValue = this.bookID[id]
      }
    }
  }

  async onDeleteBook() {
    await this.http.delete(`${this.url}/${this.bookIDValue}`).toPromise()
      .then(()=>{
        this.router.navigateByUrl('/dashboard/all-books');
      }).catch(err =>{
        console.log(err);
      })
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
