import {Action, createReducer, on} from '@ngrx/store';
import {Story, StoryModel} from "../../shared/story.model";
import * as StoryActions from './story.actions'
import {getEditStoryId} from "./story.selectors";
import {startEditStory} from "./story.actions";

export const storyFeatureKey = 'story';

export interface State {
  stories: Story[],
  editStoryId: number
}

const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid aspernatur dignissimos dolores eaque eligendi harum hic, ipsa laboriosam laborum maxime minus nisi nostrum, officiis, rerum saepe ut voluptates! Accusantium ad aliquid aspernatur corporis deserunt error eveniet ex labore mollitia nemo, nihil, optio repellat soluta. Aperiam assumenda consectetur dolorem doloremque dolores, eaque eius eos error eum expedita facilis incidunt inventore labore laborum laudantium libero nam neque nihil nisi nulla praesentium quae quia quo ratione reiciendis rem repellat repellendus sint sit soluta suscipit tempora totam unde vel veniam veritatis vero. Ab beatae exercitationem nemo odit pariatur perferendis quos, rerum similique temporibus."

export const initialState: State = {
  stories: [
    new StoryModel(1, "Én kicsi naplóm", new Date("2020.01.01."),lorem, "santa"),
    new StoryModel(2, "Másik bejegyzés", new Date("2020.02.01."),lorem),
    new StoryModel(3, "Ez a legutóbbi", new Date("2020.03.01."),lorem),
  ],
  editStoryId: -1
};


export const storyReducer = createReducer(
  initialState,
  on(StoryActions.addStory,
    (state: State, {story}) =>
      ({
        ...state,
        stories: [...state.stories, story]
      })),
    on(StoryActions.editStory,
    (state: State, {story}) =>
      ({
        ...state,
        stories: [...state.stories.filter(stories => stories.id !== story.id), story]
      })),
  on(StoryActions.startEditStory,
    (state: State, {id}) => ({
      ...state,
      editStoryId: id
    })),
  on(StoryActions.stopEditStory,
    (state: State) => ({
      ...state,
      editStoryId: -1
    }))
);

export function reducer(state: State | undefined, action: Action): any {
  return storyReducer(state, action);
}
