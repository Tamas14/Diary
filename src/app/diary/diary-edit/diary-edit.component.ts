import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ModalConfig} from "../../shared/modal/modal.config";
import {Subject, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../store/story.reducer";
import {Story, StoryModel} from "../../shared/story.model";
import {EmojiEvent} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {style, animate, transition, trigger} from '@angular/animations';
import * as StoryActions from '../store/story.actions'
import {selectStories, getEditStoryId} from "../store/story.selectors";


@Component({
  selector: 'app-diary-edit',
  templateUrl: './diary-edit.component.html',
  styleUrls: ['./diary-edit.component.scss'],
  animations: [trigger(
    'inOutAnimation',
    [
      transition(
        ':enter',
        [
          style({opacity: 0}),
          animate('0.5s ease-out', style({opacity: 1}))
        ]
      ),
      transition(
        ':leave',
        [
          style({opacity: 1}),
          animate('0.5s ease-in', style({opacity: 0}))
        ]
      )
    ])
  ]
})
export class DiaryEditComponent implements OnInit, OnDestroy {
  //@Input() startEdit: Subject<any>;
  @ViewChild('modal') modal: any;
  @ViewChild('inputform') inputform: any;

  subscription: Subscription;

  emojiMartOpen = false;

  currentId: number;
  currentDate: Date;
  selectedEmoji: string = "grin";

  editMode:boolean = false;
  selectedStory: Story;

  title:string = "";
  content: string = "";

  modalConfig: ModalConfig = {
    modalTitle: "Edit story"
  }

  constructor(private store: Store<State>) {
    this.subscription = this.store.pipe(select(getEditStoryId)).subscribe(id => {
      this.currentId = id;
      this.currentDate = new Date();

      if(id === -1)
        return;

      this.editMode = true;

      this.store.pipe(select(selectStories)).subscribe((stories:Story[])=>{
        this.selectedStory = [...stories].filter(story => story.id === id)[0];

        if(this.selectedStory) {
          this.title = this.selectedStory.title;
          this.content = this.selectedStory.text;
        }else{
          this.editMode = false;
        }
      }).unsubscribe();

      this.modal.open();

      if(!!this.selectedStory){
        this.currentDate = this.selectedStory.date;
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.resetEditMode();
    this.subscription.unsubscribe();
  }

  onClose(){
    const formData = this.inputform.value;

    if(this.editMode){
      this.store.dispatch(StoryActions.editStory(new StoryModel(this.selectedStory.id, formData.title, new Date(formData.date), formData.content, this.selectedEmoji)));
    }else{
      this.store.dispatch(StoryActions.addStory(new StoryModel(this.currentId, formData.title, new Date(formData.date), formData.content, this.selectedEmoji)));
    }

    this.resetEditMode()
  }

  onDismiss(){
    this.resetEditMode()
  }

  resetEditMode(){
    this.store.dispatch(StoryActions.stopEditStory());
    // @ts-ignore
    window.modal.close();
    this.editMode = false;
    this.title = "";
    this.content = "";
  }

  addEmoji(event: any) {
    this.selectedEmoji = (<EmojiEvent><unknown>event).emoji.id;
  }

  toggleEmojiMart() {
    this.emojiMartOpen = !this.emojiMartOpen;
  }
}
