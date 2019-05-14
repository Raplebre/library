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

  

}
