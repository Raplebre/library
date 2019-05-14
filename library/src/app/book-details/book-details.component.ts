import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../book.service';
import { Author } from '../author'
import { AuthorService } from '../author.service'

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  author: Author
  authors: Author[]

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
    this.bookService
      .updateBook(this.book)
        .subscribe(() => this.goBack());
  }

  delete(book: Book): void {
    this.bookService.deleteBook(book).subscribe()
    this.goBack()
  }

}
