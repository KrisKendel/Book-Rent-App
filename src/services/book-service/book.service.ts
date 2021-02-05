import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public url = 'http://localhost:3000/books';

  constructor(
    private http: HttpClient,
  ) { }

  async getAllBooks(): Promise<Book[]> {
    return this.http.get<Book[]>(`${this.url}`).toPromise();
  }

   async getBook(bookID: number): Promise<Book> {
     return this.http.get<Book>(`${this.url}/${bookID}`).toPromise();
   }

  async createBook(newBook: Book): Promise<void> {
    await this.http.post(`${this.url}`, newBook).toPromise();
  }

   async deleteBook(bookID: number): Promise<void>{
    await this.http.delete(`${this.url}/${bookID}`).toPromise();
  }

  async editBook(bookID: number, body: object): Promise<Book> {
    return this.http.patch<Book>(`${this.url}/${bookID}`, body).toPromise();
  }

}
