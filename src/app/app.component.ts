import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/Observable/of';

import { Hero, HeroSearch } from './hero';
import { HeroService } from './service/hero.service';
import { AdminService } from './service/admin.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  constructor(private heroService: HeroService,
              public adminService: AdminService,
              private _eref: ElementRef) {}

  heroes$: Observable<HeroSearch[]>;
  private searchTerms = new Subject<string>();
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

    this.adminService.checkLogin();

    //this.adminService.Login("user","pass");
  }

  Login(username: string, password: string): boolean {
    this.adminService.Login(username, password);
    return false;
  }

}
