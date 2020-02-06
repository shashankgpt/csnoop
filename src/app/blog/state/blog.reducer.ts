import { BlogState, InitialStateBlogs, initialState, blog } from './blog.state';
import { BlogActions as BlogActions, blogActionTypes } from './blog.action';
import { ISnackbar } from '../../dataTypes/snackbar';


export function reducer(state= initialState, action: BlogActions): BlogState  {
  switch (action.type) {
    case blogActionTypes.SetActiveBlog:
          return {
            ...state,
            activeBlog: action.payload,
      };
      case blogActionTypes.LoadBlogSuccess:
        return {
          ...state,
          activeBlog: action.payload.data.blog,
    };
    case blogActionTypes.LoadBlogFail:
        const messageBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'View All Blog',
          snackBarMessage: action.payload,
          redirectUrl: '/blog'
        };
        return {
          ...state,
          activeBlog: blog,
          message: messageBlogFail
    };
    case blogActionTypes.LoadAllBlogSuccess:
      const messageLoadBlogSuccess: ISnackbar = {
        snackBarActive: true,
        snackBarAction: 'View All Blog',
        snackBarMessage: action.payload.Message,
        redirectUrl: '/blog'
      };
      return {
          ...state,
          blogs: action.payload.data.blogs,
          message: messageLoadBlogSuccess
    };
    case blogActionTypes.LoadAllBlogFail:
      const messageLoadBlogFail: ISnackbar = {
        snackBarActive: true,
        snackBarAction: 'Unable to load all blogs',
        snackBarMessage: action.payload,
        redirectUrl: '/blog'
      };
      return {
        ...state,
        blogs: InitialStateBlogs,
        message: messageLoadBlogFail
  };
  case blogActionTypes.LoadMyBlogSuccess:
      const messageLoadMyBlogSuccess: ISnackbar = {
        snackBarActive: true,
        snackBarAction: 'View All My Blog',
        snackBarMessage: action.payload.Message,
        redirectUrl: '/blog/all'
      };
      return {
          ...state,
          myBlogs: action.payload.data.blogs,
          message: messageLoadMyBlogSuccess
    };
    case blogActionTypes.LoadMyBlogFail:
      const messageLoadMyBlogFail: ISnackbar = {
        snackBarActive: true,
        snackBarAction: 'Unable to load all blogs',
        snackBarMessage: action.payload,
        redirectUrl: '/blog/all'
      };
      return {
        ...state,
        myBlogs: InitialStateBlogs,
        message: messageLoadMyBlogFail
  };
      case blogActionTypes.CheckNameBlogExistSuccess:
        const messageCheckBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Blog Check success',
          snackBarMessage: action.payload.Message,
          redirectUrl: ''
        };
        return {
            ...state,
            noNameExist: true,
            message: messageCheckBlogSuccess
      };
      case blogActionTypes.CheckNameBlogExistFail:
        const messageCheckBlogFail: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'Blog Check fail',
          snackBarMessage: action.payload,
          redirectUrl: ''
        };
        return {
            ...state,
            noNameExist: false,
            message: messageCheckBlogFail
      };
      case blogActionTypes.RegisterBlogSuccess:
        const messageRegisterBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog register success',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog'
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
          redirectUrl: ''
        };
        return {
            ...state,
            message: messageRegisterBlogFail
      };
      case blogActionTypes.FlaggedBlogSuccess:
        const messageFlaggedBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Edit Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: ''
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
          redirectUrl: ''
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
          redirectUrl: ''
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
          redirectUrl: ''
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
          redirectUrl: '/blog'
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
          redirectUrl: ''
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
          redirectUrl: ''
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
          redirectUrl: ''
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
          redirectUrl: '/blog'
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
          redirectUrl: ''
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
          redirectUrl: '/blog'
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
      case blogActionTypes.LoadBlogSuccess:
        const messageLogoutBlogSuccess: ISnackbar = {
          snackBarActive: true,
          snackBarAction: 'blog Logout Blog',
          snackBarMessage: action.payload.Message,
          redirectUrl: '/blog'
        };
        return {
            ...state,
            message: messageLogoutBlogSuccess
      };
      case blogActionTypes.LoadBlogFail:
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

