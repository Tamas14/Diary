import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DiaryComponent } from './diary/diary.component';
import { DiaryEditComponent } from './diary/diary-edit/diary-edit.component';
import { DiaryListComponent } from './diary/diary-list/diary-list.component';
import { DiaryPageComponent } from './diary/diary-page/diary-page.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './shared/modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import {reducer, storyFeatureKey} from "./diary/store/story.reducer";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DiaryComponent,
    DiaryEditComponent,
    DiaryListComponent,
    DiaryPageComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule,
    EmojiModule,
    NgbModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreModule.forFeature(storyFeatureKey, reducer),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
