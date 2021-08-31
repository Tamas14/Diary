import { createAction, props } from '@ngrx/store';
import {Story} from "../../shared/story.model";

export const addStory = createAction(
  '[Diary] Add Story',
  (story: Story) => ({story})
);

export const editStory = createAction(
  '[Diary] Edit Story',
  (story: Story) => ({story})
);

export const startEditStory = createAction(
  '[Diary] Start Edit Story',
  (id: number) => ({id})
);

export const stopEditStory = createAction(
  '[Diary] STOP Edit Story'
);




