export interface IBlogReg {
author: string; // Username
blogId: string;
blogName: string;
blog: IBlog[];
tags: string;
category: string;
active: boolean;
userName: string;
flagged: boolean;
details: string;
}

export interface IBlog {
  blogHeading: string;
  details: string;
  pageNo: number;
}

export interface IBlogCheck {
  blogId: string;
  blogName: string;
}
