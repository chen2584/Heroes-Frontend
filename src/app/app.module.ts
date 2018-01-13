import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './module/app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { HeroDetailComponent } from './component/hero-detail/hero-detail.component';

import { HeroService } from './service/hero.service';
import { AdminService } from './service/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeroDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HeroService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
