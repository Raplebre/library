import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSearchComponent } from './author-search.component';

describe('AuthorSearchComponent', () => {
  let component: AuthorSearchComponent;
  let fixture: ComponentFixture<AuthorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
