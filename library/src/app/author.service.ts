import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Author } from './author';
import { MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl = 'http://127.0.0.1:3000/authors'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl)
      .pipe(
        tap(_ => this.log('Fetched all authors')),
        catchError(this.handleError<Author[]>('getAuthors', []))
      )
  }

  getAuthor(id: any): Observable<Author>{
    const url = `${this.authorsUrl}/bookEdit/${id}`
    return this.http.get<Author>(url)
      .pipe(
        tap(_ => this.log(`Fetched author with ID ${id}`)),
        catchError(this.handleError<Author>(`getAuthor id=${id}`))
      )
  }

  getCorAuthors(term: string): Observable<Author[]> {
    if (!this.http.get<Author[]>(`${this.authorsUrl}/${term}`)){
      return of ([])
    }
    return this.http.get<Author[]>(`${this.authorsUrl}/${term}`)
      .pipe(
        tap(_ => this.log(`Fetched authors corresponding to term "${term}"`)),
        catchError(this.handleError<Author[]>(`getCorAuthors term=${term}`, []))
      )
  }

  updateAuthor(author: Author): Observable<any> {
    const url = `${this.authorsUrl}/authEdit/${author.auth_id}`
    return this.http.put(url, author, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated author with ID ${author.auth_id}`)),
        catchError(this.handleError<any>('updateAuthor'))
      )
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorsUrl, author, httpOptions)
      .pipe(
        tap((newAuthor: Author) => this.log(`Added author with ID ${newAuthor.auth_id}`)),
        catchError(this.handleError<Author>('addAuthor'))
      )
  }

  deleteAuthor(author: Author | number): Observable<Author> {
    const id = typeof author === 'number' ? author: author.auth_id
    const url = `${this.authorsUrl}/${id}`
    return this.http.delete<Author>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted author with ID ${id}`)),
        catchError(this.handleError<Author>('deleteAuthor'))
      )
  }

  searchAuthors(term: string): Observable<Author[]> {
    if(!term.trim()) {
      return of ([])
    }
    return this.http.get<Author[]>(`${this.authorsUrl}/${term}`)
      .pipe(
        tap(_ => this.log(`Returned authors matching "${term}"`)),
        catchError(this.handleError<Author[]>('searchAuthors', []))
      )
  }

  private log(message: string) {
    this.messageService.add(`AuthorService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result ?: T)
  {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
}
