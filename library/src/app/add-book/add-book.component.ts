import { Component, OnInit } from '@angular/core';
import { Book } from '../book'
import { BookService } from '../book.service'
import { Author } from '../author'
import { AuthorService } from '../author.service'
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book
  books: Book[]
  author: Author
  authors: Author[]

  constructor(private bookService: BookService, private authorService: AuthorService, private location: Location) { }

  ngOnInit(): void {
    this.getAuthors()
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => this.authors = authors)
  }

  add(book_isbn: string, book_title: string, authors_auth_id: number): void {
    book_isbn = book_isbn.trim();
    book_title = book_title.trim();
    if ((book_isbn && book_title && authors_auth_id) && (book_isbn.length === 10 || book_isbn.length === 13)){
      this.bookService.addBook({book_isbn, book_title, authors_auth_id } as Book)
      .subscribe(book => { this.books.push(book); })
    }
    else { return; }
  }

  goBack(): void {
    this.location.back()
  }

}
