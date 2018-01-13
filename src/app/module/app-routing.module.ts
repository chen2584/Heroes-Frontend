import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../component/main/main.component';
import { HeroDetailComponent } from '../component/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
