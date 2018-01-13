import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service'
import { Hero, HeroComment, PostComment } from '../../hero';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../../service/admin.service';
declare var $: any

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private heroService: HeroService, 
              public adminService: AdminService,
              private route: ActivatedRoute,
              private title: Title) { }

  hero: Hero;
  heroIMG: string[] = [];
  heroComment: HeroComment[] = [];
  Name: string;

  comment: PostComment = {
    Name: "",
    Email: "",
    Message: "",
    HeroID: this.route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.getHeroDetail();

  }

  getHeroDetail():void {
    let heroid: string = this.route.snapshot.paramMap.get("id");
    this.heroService.GetHeroDetail(heroid).subscribe(hero => { 
      if(hero != null) {
        this.title.setTitle(hero.HeroName + " Detail");

        let heroImg = hero.HeroIMG.split(";");
        heroImg.length -= 1; //ลบช่องสุดท้าย
        heroImg.forEach(h => { 
          h = this.heroService.hostIP + h; //เพิ่มลิ้งค์ hostAPI
          this.heroIMG.push(h);
        });

        this.hero = hero;
        this.getHeroComment();
      }
      else {
        alert("ไม่มีฮีโร่ชื่อนี้อยู่");
      }
    });
  }

  timer1: any;
  onVoteHero(): void {
    let heroid: string = this.route.snapshot.paramMap.get("id");
    this.heroService.InsertVoteHero(heroid)
    .subscribe(hero => {
      clearTimeout(this.timer1);
      $(".alert").hide(); 

      if(heroid == hero)
      {
        this.hero.HeroVoted++;
        $(".alert-success").show();
      }
      else
      {
        $(".alert-danger").show();
      }

      //jquery naja
      this.timer1 = setTimeout(() => {
        $(".alert").hide(); 
      }, 5000);
    });

    
  }

  getHeroComment(): void {
    let heroid: string = this.route.snapshot.paramMap.get("id");
    this.heroService.GetHeroComment(heroid).subscribe(comment => {
      this.heroComment = comment;
    });
  }

  submitcomment: any;
  onSubmitComment() {
    this.submitcomment = this.heroService.SubmitComment(this.comment).subscribe(commented => {
      if(commented === true) {
        alert("Comment เรียบร้อยแล้ว!");
        this.getHeroComment();
      }
      else
        alert("ไม่สามารถ Comment ได้! โปรดตรวจสอบว่ากรอกข้อมูลถูกหรือไม่");
      this.submitcomment.unsubscribe();

    })
    return false;
  }

  DeleteComment(heroid: number)
  {
    this.heroService.DeleteComment(heroid).subscribe(status => {
      if(status == true) {
        alert("ลบคอมเม้นต์แล้ว!");
      }
    });
  }


  errorImg(event) {
    event.target.src = "../assets/images/errorimage.jpg";
  }


}