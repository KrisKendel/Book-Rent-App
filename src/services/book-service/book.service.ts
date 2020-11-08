import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public book: Book;

  constructor(
    private http: HttpClient,
  ) { }

  url = 'http://localhost:3000/books';

  async getAllBooks(): Promise<any> {
    return this.http.get<Book[]>(`${this.url}`).toPromise();
  }

   async getBook(bookID: number): Promise<any> {
     return this.http.get<Book>(`${this.url}/${bookID}`).toPromise();
   }

  async createBook(newBook: Book): Promise<void> {
    await this.http.post(`${this.url}`, newBook).toPromise();
  }

   async deleteBook(bookID: number): Promise<void>{
    await this.http.delete(`${this.url}/${bookID}`).toPromise();
  }

  async editBook(bookID: number, body: object): Promise<any> {
    await this.http.patch<Book>(`${this.url}/${bookID}`, body).toPromise();
  }

}
