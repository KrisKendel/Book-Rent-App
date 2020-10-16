import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/services/book-service/book.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-rentals',
  templateUrl: './all-rentals.component.html',
  styleUrls: ['./all-rentals.component.scss']
})
export class AllRentalsComponent implements OnInit, OnDestroy {
  rented: any = {};
  dataSource: any = [];
  displayedColumns: string[] = ['id', 'authors', 'title', 'rented-to-date'];

  allRentalsSubscription: Subscription;
  allBooks: any;
  rentedBooks: any = [];

  constructor(
    private bookService: BookService
  ) { }
   

  ngOnInit(): void {
    this.allRentalsSubscription = this.bookService.getBooks().subscribe
    ((data) => {
        this.allBooks = data;
        for(let book of this.allBooks) {
          if(book.availability === false) {
             this.rentedBooks.push(book)
          }
        }
       this.dataSource = new MatTableDataSource(this.rentedBooks)
      },
      (error) => console.log(error)
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if(this.allRentalsSubscription)
    this.allRentalsSubscription.unsubscribe();
  }

}
