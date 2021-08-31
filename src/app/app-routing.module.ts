import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DiaryListComponent} from "./diary/diary-list/diary-list.component";
import {DiaryEditComponent} from "./diary/diary-edit/diary-edit.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'history', component: DiaryListComponent},
  {path: 'edit/:id', component: DiaryEditComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
