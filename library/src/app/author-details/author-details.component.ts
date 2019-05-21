import { Component, OnInit } from '@angular/core';
import { Author } from '../author'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { AuthorService} from '../author.service'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  author: Author
  authors: Author[]
  authorsUpdated = new Subject<Author[]>()

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAuthor()
  }

  getAuthor(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.authorService.getAuthor(id)
      .subscribe(author => this.author = author)
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    this.authorService
      .updateAuthor(this.author)
        .subscribe(() => this.goBack())
  }

  delete(author: Author): void {
    this.authorService.deleteAuthor(author).subscribe(() => {
      const updatedAuthors = this.authors.filter(author => this.author.auth_id !== author.auth_id)
      this.authors = updatedAuthors
      this.authorsUpdated.next([...this.authors])
    }), setTimeout(() => {
      this.goBack()
    }, 300);
    
  }

}