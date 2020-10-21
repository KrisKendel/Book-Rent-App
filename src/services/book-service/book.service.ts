import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  url = 'http://localhost:3000/books';

  // getBooks() {
  //   return this.http.get<Book>(this.url)
  // }

  // getBook(bookID) {
  //   this.http.get<Book>(`${this.url}/${bookID}`).toPromise()
  // }

  // deleteBook(bookID){
  //   return this.http.delete<Book>(`${this.url}/${bookID}`)
  // }

  // editBook(bookID, body){
  //   return this.http.patch<Book>(`${this.url}/${bookID}`, body)
  // }
}
