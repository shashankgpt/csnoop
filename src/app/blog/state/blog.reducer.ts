import { BlogState, InitialStateBlogs, initialState } from './blog.state';
import { BlogActions as BlogActions, blogActionTypes } from './blog.action';
import { ISnackbar } from '../../dataTypes/snackbar';


export function reducer(state= initialState, action: BlogActions): BlogState  {
  switch (action.type) {
    case blogActionTypes.SetActiveBlog:
          return {
            ...state,
            activeBlog: action.payload,
      };
      case blogActionTypes.LoadAllBlogSuccess:
          return {
            ...state,
            blogs: action.payload,
      };
      case blogActionTypes.LoadAllBlogFail:
          const messageLoadBlogFail: ISnackbar = {
            snackBarActive: true,
            snackBarAction: 'View All Blog',
            snackBarMessage: action.payload,
            redirectUrl: ''
          };
          return {
            ...state,
            blogs: InitialStateBlogs,
            message: messageLoadBlogFail
      };
      case blogActionTypes.RegisterBlogSuccess:
        const messageRegisterBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog register success',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageRegisterBlogSuccess
      };
      case blogActionTypes.RegisterBlogFail:
        const messageRegisterBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog register fail',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageRegisterBlogFail
      };
      case blogActionTypes.FlaggedBlog:
        const messageFlaggedBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageFlaggedBlogSuccess
      };
      case blogActionTypes.UnFlaggedBlogFail:
        const messageUnFlaggedBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageUnFlaggedBlogFail
      };
      case blogActionTypes.UnFlaggedBlogSuccess:
        const messageUnFlaggedBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageUnFlaggedBlogSuccess
      };
      case blogActionTypes.UnFlaggedBlogFail:
        const messageUnflaggedBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageUnflaggedBlogFail
      };
      case blogActionTypes.ActivateBlogSuccess:
        const messageActivateBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageRegisterBlogSuccess
      };
      case blogActionTypes.ActivateBlogFail:
        const messageActivateBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageRegisterBlogFail
      };
      case blogActionTypes.DeactivateBlogSuccess:
        const messageDeactivateBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageDeactivateBlogSuccess
      };
      case blogActionTypes.DeactivateBlogFail:
        const messageDeactivateBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageDeactivateBlogFail
      };
      case blogActionTypes.UpdateBlogSuccess:
        const messageUpdateBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Update Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageUpdateBlogSuccess
      };
      case blogActionTypes.UpdateBlogFail:
        const messageUpdateBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Update Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageUpdateBlogFail
      };
      case blogActionTypes.DeleteBlogSuccess:
        const messageDeleteBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Delete Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageDeleteBlogSuccess
      };
      case blogActionTypes.DeleteBlogFail:
        const messageDeleteBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Delete Blog',
          snackBarMessage: action.payload,
          redirectUrl: ''
        };
        return {
            ...state,
            message: messageDeleteBlogFail
      };
      case blogActionTypes.LogoutBlogSuccess:
        const messageLogoutBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Logout Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog/allBlogs'
        };
        return {
            ...state,
            message: messageLogoutBlogSuccess
      };
      case blogActionTypes.LogoutBlogFail:
        const messageLogoutBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Logout Blog',
          snackBarMessage: action.payload,
          redirectUrl: ''
        };
        return {
            ...state,
            message: messageLogoutBlogFail
      };
    default:
      return state;
  }

}

