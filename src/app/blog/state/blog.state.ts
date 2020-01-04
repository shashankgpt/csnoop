import { IBlog , IBlogReg} from '../dataTypes';
import {ISnackbar} from '../../dataTypes/snackbar';

export interface BlogState {
  blogs: IBlogReg[];
  activeBlog: IBlogReg;
  message: ISnackbar;
}
export const blogPage: IBlog = {
  blogHeading: '',
  details: '',
  pageNo: 0,
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
  details: '',
}];
export const blog: IBlogReg = {
  author: '',
blogId: '',
blogName: '',
blog: [blogPage],
tags: '',
category: '',
active: true,
userName: '',
flagged: false,
details: ''
};

const message: ISnackbar = {
  snackBarActive: false,
  snackBarAction: '',
  snackBarMessage: '',
  redirectUrl: ''
};
export const initialState: BlogState = {
  message,
  activeBlog: blog,
  blogs: InitialStateBlogs,
};
