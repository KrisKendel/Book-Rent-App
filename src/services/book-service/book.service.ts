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
    private router: Router
  ) { }

  url = 'http://localhost:3000/books';

  // getBooks() {
  //   return this.http.get<Book>(this.url)
  // }

  // async getBook(bookID): Promise<void> {
  //   await this.http.get<Book>(`${this.url}/${bookID}`).toPromise();
  // }

  async createBook(newBook): Promise<void> {
    await this.http.post(this.url, newBook).toPromise();
  }

   async deleteBook(bookID): Promise<void>{
    await this.http.delete(`${this.url}/${bookID}`).toPromise()
    .then(() => {
      this.router.navigateByUrl('/dashboard/all-books');
    }).catch(err => {
      console.log(err);
    });
   }

  async editBook(bookID: number, body: object): Promise<any> {
    await this.http.patch<Book>(`${this.url}/${bookID}`, body)
    .toPromise()
    .then((book: Book) => {
      this.book = book;
      this.router.navigateByUrl('/dashboard/all-books');
    })
    .catch(err => {
      console.log(err);
    });
  }

}
