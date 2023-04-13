import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch :"full"},
  {path : "home", component : HomeComponent},
  {path : "preview/:id", component: PreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
