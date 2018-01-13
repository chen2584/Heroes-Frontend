import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Hero } from '../../hero';
import { HeroService } from '../../service/hero.service'
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hero: Hero[];
  disabledBtn: boolean;
  constructor(public heroService:HeroService) { }
  ngOnInit() {
    this.GetTopHero();
  }

  GetTopHero(): void {
    this.heroService.GetTopHero().subscribe(res => { 
      res.forEach(h => {
        let heroImg = h.HeroIMG.split(";");
        h.HeroIMG = this.heroService.hostIP + heroImg[0]; //รูปแรก
      });
      //res.sort((a, b) => { return b.HeroVoted - a.HeroVoted; } );
      this.hero = res;

    });

  }

  loadMoreHero() {
    if(!this.disabledBtn) {
      this.disabledBtn = true;
      document.getElementById("loadBtn").innerText = "Loading...";
      this.heroService.GetMoreHero(this.hero.length).subscribe(hero => {
        hero.forEach(h => {
          let heroImg = h.HeroIMG.split(";");
          h.HeroIMG = this.heroService.hostIP + heroImg[0]; //รูปแรก
          this.hero.push(h);
        });

        document.getElementById("loadBtn").innerText = "Load More...";

        if(hero.length >= 4) //array ส่งกลับมามากสุดทีละ 4
          this.disabledBtn = false;
      });
    }
  }

  errorImg(event) {
    event.target.src = "../assets/images/errorimage.jpg";
  }

}