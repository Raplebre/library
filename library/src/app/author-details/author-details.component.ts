import { Component, OnInit } from '@angular/core';
import { Author } from '../author'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { AuthorService} from '../author.service'

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  author: Author
  authors: Author[]
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
    console.log(this.author)
    this.authorService
      .updateAuthor(this.author)
        .subscribe(() => this.goBack())
  }

  delete(author: Author): void {
    this.authorService.deleteAuthor(author).subscribe()
    this.goBack()
  }

}
