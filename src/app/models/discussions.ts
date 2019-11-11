export interface CategoryList {
    _id: string;
    Categories: Categories
}

export interface Categories {
    cat_id: number;
    doc_id: string;
    image: string;
    isActive: boolean;
    name: string
}

export interface SubCategoryList {
    _id: string;
    category_id: number;
    category_name: string;
    no_of_subcategories: number;
    sub_categories: sub_Categories;
}

export interface sub_Categories {
    image: string;
    isActive: boolean;
    name: string;
    no_of_discussions: number
    subcat_id: string;
}

export interface DiscussionsList {
    _id: string;
    category: string;
    category_id: string;
    sub_category: string;
    sub_category_id: string;
    discussions: [Discussions]
}

export interface Discussions {
    doc_id: string;
    post_by_emailId: string;
    post_by_name: string;
    post_date: Date;
    post_msg: string;
    title: string;
}

export interface DiscussionDetails {
    category: string;
    category_id: string;
    posts: [Posts]
    sub_category: string;
    sub_category_id: string;
    title: string;
}

export interface Posts {
    comments: [PostComments]
    likes: [PostLikes]
    post_by_emailId: string;
    post_by_name: string;
    post_date: Date;
    post_id: string;
    post_msg: string;
    post_type: string;
}

export interface PostComments {
    comment_by_emailId: string;
    comment_by_name: string;
    comment_id: string;
    comment_text: string;
    comments: [Comment_Comments];
    create_ts: Date;
    likes: [Comment_Likes];
}

export interface PostLikes {
    Id: string;
    like_by_emailId: string;
    like_by_name: string;
    like_time: string;
}

export interface Comment_Comments {
    comment_by_emailId: string;
    comment_by_name: string;
    comment_id: string;
    comment_text: string;
    create_ts: Date;
    likes: [Comment_Comments_Likes];
}

export interface Comment_Likes {
    Id: string;
    like_by_emailId: string;
    like_by_name: string;
    like_time: Date;
}

export interface Comment_Comments_Likes {
    Id: string;
    like_by_emailId: string;
    like_by_name: string;
    like_time: string;
}
