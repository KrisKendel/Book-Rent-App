import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book-service/book.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rentedBooks: number = 0;
  rentedbooksSubscription: Subscription;
  books: any;
  book: any;


  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.rentedbooksSubscription = this.bookService.getBooks().subscribe
    (
      (data) => {
        this.books = data;
        for(this.book of this.books){
          if(this.book.availability === false){
          this.rentedBooks++;
          }
        }
        
      },
      (error) => console.log(error)
    )
  }



}
