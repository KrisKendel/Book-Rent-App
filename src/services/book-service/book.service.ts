import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { books } from 'src/environments/rest';
import { Book } from 'src/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = `${environment.apiUrl}${books}`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}`);
  }

  getBook(bookID: number): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${bookID}`);
  }

  createBook(newBook: Book): Observable<any> {
    return this.http.post(`${this.url}`, newBook);
  }

  deleteBook(bookID: number): Observable<any> {
    return this.http.delete(`${this.url}/${bookID}`);
  }

  editBook(bookID: number, body: object): Observable<Book> {
    return this.http.patch<Book>(`${this.url}/${bookID}`, body);
  }

}
