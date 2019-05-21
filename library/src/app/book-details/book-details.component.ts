import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../book.service';
import { Author } from '../author'
import { AuthorService } from '../author.service'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  books: Book[]
  author: Author
  authors: Author[]
  booksUpdated = new Subject<Book[]>()

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook()
    this.getAuthors()
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book)
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => this.authors = authors)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    if (this.book.book_isbn.length === 10 || this.book.book_isbn.length === 13){
      this.bookService
        .updateBook(this.book)
          .subscribe(() => this.goBack());
      }
  }

  delete(book: Book): void {
    this.bookService.deleteBook(book).subscribe(()=> {
      const updatedBooks = this.books.filter(book => this.book.book_id !== book.book_id)
      this.books = updatedBooks
      this.booksUpdated.next([...this.books])
    }), setTimeout(() => {
      this.goBack()
    }, 300);
    
  }

}
