import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AddBookComponent } from './add-book/add-book.component';


const routes: Routes = [
  { path: 'books', component: BooksComponent},
  { path: '', redirectTo: '/books', pathMatch: 'full'},
  { path: 'bookAdd', component: AddBookComponent},
  { path: 'authors', component: AuthorsComponent},
  { path: 'bookEdit/:id', component: BookDetailsComponent},
  { path: 'authEdit/:id', component: AuthorDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
