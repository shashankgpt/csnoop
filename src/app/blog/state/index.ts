import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { BlogState } from './blog.state';

export interface State extends fromRoot.State {
  admin: BlogState;
}

const getBlogFeatureState = createFeatureSelector<BlogState>('blogs');

export const getBlogsData = createSelector(getBlogFeatureState,
  state => state.blogs
);
export const getBlogsMessage = createSelector(getBlogFeatureState,
  state => state.message
);
export const getActiveBlogID = createSelector(getBlogFeatureState,
  state => state.activeBlog
);
