import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Book } from './book';
import { MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'http://127.0.0.1:3000/books'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(_ => this.log('Fetched all books')),
        catchError(this.handleError<Book[]>('getBooks', []))
      )
  }

  getBook(id: any): Observable<Book> {
    const url = `${this.booksUrl}/bookEdit/${id}`
    return this.http.get<Book>(url)
    .pipe(
      tap(_ => this.log(`Fetched book with ID ${id}`)),
      catchError(this.handleError<Book>(`getBook id =${id}`))
    )
  }

  getCorBooks(term: string): Observable<Book[]> {
    if ( !this.http.get<Book[]>(`${this.booksUrl}/${term}`)) {
      return of([])
    }
    return this.http.get<Book[]>(`${this.booksUrl}/${term}`)
      .pipe(
        tap(_ => this.log(`Fetched books corresponding to term "${term}"`)),
        catchError(this.handleError<Book[]>(`getCorBooks term=${term}`, []))
      )
  }

  updateBook(book: Book): Observable<any> {
    const url = `${this.booksUrl}/bookEdit/${book.book_id}`
    return this.http.put(url, book, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated book with ID ${book.book_id}`)),
        catchError(this.handleError<any>('updateBook'))
      )
  }

  addBook(book: Book): Observable<Book> {
    const url = `${this.booksUrl}/bookAdd`
    return this.http.post<Book>(url, book, httpOptions)
      .pipe(
        tap((newBook: Book) => this.log(`Added book with ID ${newBook.book_id}`)),
        catchError(this.handleError<Book>('addBook'))
      )
  }

  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book: book.book_id
    const url = `${this.booksUrl}/${id}`
    return this.http.delete<Book>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted book with ID ${id}`)),
        catchError(this.handleError<Book>('deleteBook'))
      )
  }

  searchBooks(term: string): Observable<Book[]> {
    if(!term.trim()) {
      return of([])
    }
    return this.http.get<Book[]>(`${this.booksUrl}/${term}`)
      .pipe(
        tap(_ => this.log(`Returned books matching "${term}"`)),
        catchError(this.handleError<Book[]>('searchBooks', []))
    )
  }

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result?: T) 
  {
    return (error:any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
}
