import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../store/story.reducer";
import {selectStories} from "../store/story.selectors";
import {Observable, Subscription} from "rxjs";
import {Story, StoryModel} from "../../shared/story.model";

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnDestroy {
  subscription: Subscription;
  stories: Story[] = [new StoryModel(0, "", new Date(), "", "santa")];

  constructor(private store: Store<State>) {
    this.subscription = this.store.pipe(select(selectStories)).subscribe((stories:Story[])=>{
      this.stories = [...stories];
      this.stories.sort((a:Story, b:Story)=>{
        return b.date.getTime() - a.date.getTime();
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
