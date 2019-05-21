import { Component, OnInit } from '@angular/core';
import { Author } from '../author'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorService } from '../author.service'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[]
  author: Author

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private location: Location) { }

  ngOnInit() {
    const term = this.route.snapshot.paramMap.get('term')
    if(term){
      this.getCorAuthors(term)
    }
    else{
      this.getAuthors()
    }
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors)
  }

  getCorAuthors(term): void {
    this.authorService.getCorAuthors(term)
      .subscribe(authors => this.authors = authors)
  }

  add(auth_name: string) {
    auth_name = auth_name.trim()
    if (!auth_name){ return; }
    this.authorService.addAuthor({ auth_name } as Author)
      .subscribe(author => {this.authors.push(author); })
    // window.location.reload()
  }

}
