import {Component, Input, OnInit} from '@angular/core';
import {Story} from "../shared/story.model";
import {Store} from "@ngrx/store";
import {State} from "./store/story.reducer";
import * as StoryActions from './store/story.actions'

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit, Story {

  @Input() id = -1;
  @Input() emoji: string | undefined = 'santa';
  @Input() title = '';
  @Input() date = new Date();
  @Input() text = '';

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  onEditStory(id: number) {
    console.log(id);
    this.store.dispatch(StoryActions.startEditStory(id));
  }
}
