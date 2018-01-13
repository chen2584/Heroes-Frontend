import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { Hero, HeroSearch, HeroComment, PostComment } from '../hero'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroService {

  //hostIP: string = "http://localhost:5000";
  hostIP: string = "";
  constructor(private http: Http) { }

  GetTopHero(): Observable<Hero[]> {
    return this.http.get(this.hostIP + "/api/hero").map(response => response.json());
  }

  GetMoreHero(length: number): Observable<Hero[]> {
    return this.http.get(`${this.hostIP}/api/hero/${length}`).map(response => response.json());
  }

  GetHeroDetail(heroid: string): Observable<Hero> {
    return this.http.get(`${this.hostIP}/api/hero/detail/${heroid}`).map(res => res.json());
  }

  InsertVoteHero(heroid: string): Observable<string> {
    let body = JSON.stringify(heroid);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.hostIP}/api/hero`, body, options).map(res => res.json());
  }

  searchHeroes(term: string): Observable<HeroSearch[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get(`${this.hostIP}/api/hero/search/${term}`).map(res => res.json());
  }

  GetHeroComment(heroid: string): Observable<HeroComment[]> {
    return this.http.get(`${this.hostIP}/api/hero/comment/${heroid}`).map(res => res.json());
  }
  
  SubmitComment(commend: PostComment): Observable<boolean> {
    let body = JSON.stringify(commend);
    let headers = new Headers({ 'Content-Type': 'application/json' } );
    let options = new RequestOptions({ headers: headers});
    return this.http.post(`${this.hostIP}/api/hero/comment`, body, options).map(res => res.json());
  }

  DeleteComment(heroid: number): Observable<boolean> {
    let userToken = localStorage.getItem("userToken");
    let headers = new Headers({ 'Content-Type': 'application/json' } );
    headers.append('Authorization','Bearer ' + userToken)
    let options = new RequestOptions({ headers: headers, body: heroid});
    return this.http.delete(`${this.hostIP}/api/hero/comment`, options).map(res => res.json());
  }
}
