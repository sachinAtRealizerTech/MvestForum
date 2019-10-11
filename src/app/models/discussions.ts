export interface CategoryList{
    cat_id:number;
    doc_id:string;
    name:string
}

export interface SubCategoryList{
    category_id:number;
    category_name:string;
    no_of_subcategories:number;
    sub_categories:[SubCategories];
    noOfDiscussions:number;
}

export interface SubCategories{
    subcat_id:number;
    name:string;
    no_of_discussions:number;
}

export interface DiscussionsList{
    category:string;
    subcategory:string;
    subcategory_id:number;
    _id:string;
    Discussions:Discussions[];
}

export interface Discussions{
    id:string;
    no_of_posts:number;
    post_by:string;
    post_msg:string;
    post_time:Date;
    title:string;
}

export interface DiscussionDetails{
    category:string;
    discussion_time:Date;
    discussion_title:string;
    discussion_title_description:string;
    subcategory:string;
    subcategory_id:number;
    posts:[Posts]
}

export interface Posts{
    comments:[];
    likes:number;
    no_of_posts:number;
    post_by:string;
    post_msg:string;
    post_time:string;
    post_type:string;
    sr_no:number;
}
