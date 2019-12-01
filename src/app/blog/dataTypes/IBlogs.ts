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
}

export interface IBlog {
  blogHeading: string;
  details: string;
  pageNo: string;
}
