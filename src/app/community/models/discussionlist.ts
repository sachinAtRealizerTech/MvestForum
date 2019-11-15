export interface DiscussionsList {
    _id: string;
    category: string;
    category_id: string;
    sub_category: string;
    sub_category_id: string;
    discussions: Array<discussions>
}

export interface discussions {
    doc_id: string;
    post_by_emailId: string;
    post_by_name: string;
    post_date: Date;
    post_msg: string;
    title: string;
}