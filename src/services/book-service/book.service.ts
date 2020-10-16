import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  url = ' http://localhost:3000/books';

  getBooks() {
    return this.http.get<Book>(this.url)
  }

  getBook(bookID) {
    return this.http.get<Book>(`${this.url}/${bookID}`)
  }

  deleteBook(bookID){
    return this.http.delete<Book>(`${this.url}/${bookID}`)
  }
}
