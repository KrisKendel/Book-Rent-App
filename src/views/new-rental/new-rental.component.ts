import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookService } from '../../services/book-service/book.service';

@Component({
  selector: 'app-new-rental',
  templateUrl: './new-rental.component.html',
  styleUrls: ['./new-rental.component.scss']
})
export class NewRentalComponent implements OnInit, OnDestroy {
  public addRentalForm: FormGroup;
  public dateFrom: string;
  public dateTo: string;
  public filteredOptions: Observable<string[]>;
  public myControl= new FormControl();
  public options: string[] = ['One', 'Two', 'Three'];
  public books: any;
  public newRentalSubscription: Subscription;
  public availableBooks = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.addRentalForm = this.formBuilder.group({
        dateFrom: [this.dateFrom],
        dateTo: [this.dateTo]
    })

    this.newRentalSubscription = this.bookService.getBooks().subscribe
    ((data) => {
        this.books = data;
        for(let book of this.books) {
          if(book.availability === true) {
            //show me only books available for rent
             this.availableBooks.push(book)
          }
        }
    },
      (error) => console.log(error)
    )
  }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    ngOnDestroy() {
      if(this.newRentalSubscription)
      this.newRentalSubscription.unsubscribe();
    }
}

