import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStory from './story.reducer'

export const selectStoryState = createFeatureSelector<fromStory.State>(
  fromStory.storyFeatureKey
)

export const selectStories = createSelector(
  selectStoryState,
  (state: fromStory.State) => state.stories
);

export const getEditStoryId = createSelector(
  selectStoryState,
  (state: fromStory.State) => state.editStoryId
);
