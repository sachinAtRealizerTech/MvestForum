export interface categoryList{
    id:number,
    categoryName:string
}

export interface subCategoryList{
    id:number,
    name:string,
    noOfDiscussions:number
}

export interface discussions{
    category:string;
    subcategory:string;
    subcategory_id:number;
    discussionList:[discussionList];
}

export interface discussionList{
    id:string;
    no_of_posts:number;
    post_by:string;
    post_msg:string;
    post_time:Date;
    title:string;
}

export interface discussionDetails{
    category:string;
    discussion_time:Date;
    discussion_title:string;
    discussion_title_description:string;
    subcategory:string;
    subcategory_id:number;
    posts:[posts]
}

export interface posts{
    comments:[];
    likes:number;
    no_of_posts:number;
    post_by:string;
    post_msg:string;
    post_time:string;
    post_type:string;
    sr_no:number;
}
