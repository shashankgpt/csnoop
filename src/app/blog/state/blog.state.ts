import { IBlog , IBlogReg} from '../dataTypes';
import {ISnackbar} from '../../dataTypes/snackbar';

export interface BlogState {
  blogs: IBlogReg[];
  activeBlog: string;
  message: ISnackbar;
}
export const blogPage: IBlog = {
  blogHeading: '',
  details: '',
  pageNo: '',
};
export const InitialStateBlogs: IBlogReg[] = [{
  author: '', // Username
  blogId: '',
  blogName: '',
  blog: [blogPage],
  tags: '',
  category: '',
  active: false,
  userName: '',
  flagged: false,
}];

const message: ISnackbar = {
  snackBarActive: false,
  snackBarAction: '',
  snackBarMessage: '',
  redirectUrl: ''
};
export const initialState: BlogState = {
  message,
  activeBlog: '',
  blogs: InitialStateBlogs,
};
