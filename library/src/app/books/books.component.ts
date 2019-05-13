import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: Book[]
  book: Book

  constructor(private route: ActivatedRoute, private bookService: BookService, private location: Location) { }

  ngOnInit() {
    const term = this.route.snapshot.paramMap.get('term');
    if(term) {
      this.getCorBooks(term)
    }
    else {
      this.getBooks()
    }
  }
  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books)
  }

  getCorBooks(term): void {
    this.bookService.getCorBooks(term)
      .subscribe(books => this.books = books)
  }

  add(book_isbn: string, book_title: string, authors_auth_id: number): void {
    book_isbn = book_isbn.trim();
    book_title = book_title.trim();
    if (!book_isbn || !book_title || !authors_auth_id) { return;}
    this.bookService.addBook({book_isbn, book_title, authors_auth_id } as Book)
      .subscribe(book => { this.books.push(book); })
    window.location.reload()
  }

  delete(book: Book): void {
    this.books = this.books.filter(b => b !== book)
    this.bookService.deleteBook(book).subscribe()
  }

}
