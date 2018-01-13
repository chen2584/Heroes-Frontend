import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HeroService } from './hero.service';

import { Hero } from '../hero';
declare var $: any;

@Injectable()
export class AdminService {

  isLoggedin: boolean = false;
  constructor(private http: Http,
              private heroService: HeroService) { }

  checkLogin() {
    if(localStorage.getItem("userToken") != null) {
      this.isLoggedin = true;
    }
  }

  Login(username: string, password: string) {
    let account = {
      Username: username,
      Password: password
    }
    let body = JSON.stringify(account);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    this.http.post(`${this.heroService.hostIP}/api/hero/login`, body, options).map(res => res.json())
    .subscribe(token => {
      if(token != null) {
        this.isLoggedin = true;
        $("#modal-id").modal("hide");
        localStorage.setItem("userToken", token);        
        alert("เข้าสู่ระบบแล้ว!");
      }
      else {
        alert("Error! Username หรือ Password ผิด");
      }
    })
  }

  Logout() {
    localStorage.clear();
    this.isLoggedin = false;
  }

}
