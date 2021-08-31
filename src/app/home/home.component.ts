import {Component, OnInit} from '@angular/core';
import {EmojiEvent} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {select, Store} from "@ngrx/store";
import {State} from "../diary/store/story.reducer";
import {selectStories} from "../diary/store/story.selectors";
import {Story, StoryModel} from "../shared/story.model";
import * as StoryActions from '../diary/store/story.actions'
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedEmoji = "santa";
  modal = undefined;
  stories: Story[]
  selectedStory: Story;
  latestId: number;

  constructor(private store: Store<State>, private datePipe: DatePipe) {
    this.store.pipe(select(selectStories)).subscribe(
      stories => {
        // this.selectedStory = stories[stories.length - 1];
        this.stories = stories

        let latest = stories.reduce((prev, curr) => (prev.date < curr.date) ? curr : prev);

        this.latestId = latest.id;

        if(latest.date.toDateString() === new Date().toDateString())
          this.selectedStory = latest;
      }
    );
  }

  ngOnInit(): void {
/*    fromArray(this.stories).pipe(
      reduce((prev, curr) => (prev.date < curr.date) ? curr : prev),
      tap(val => console.log(val.date.toDateString())),
      tap(val => val.date.toDateString() === this.datePipe.transform(new Date, 'yyyy-MM-dd') ? this.selectedStory = val : '' )
    ).subscribe();*/
  }

  addEmoji(event: Event) {
    this.selectedEmoji = (<EmojiEvent><unknown>event).emoji.id;
  }

  onClick() {
    //this.startEdit.next(101);
  }

  dispatch() {
    this.store.dispatch(StoryActions.addStory(new StoryModel(5, "Most diszpeccseltem", new Date("2021.08.23."), "Szövegecske")))
  }

  onAddClick() {
    this.store.dispatch(StoryActions.startEditStory(++this.latestId));
  }

  printStories() {
    console.log(this.stories)
  }
}
