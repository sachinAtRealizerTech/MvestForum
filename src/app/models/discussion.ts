export interface Discussion{
title:string,
id:Number
}

export interface post{
srno:Number,
post_type:string,
name:string,
likes:Number,
comments:[],
logtime:string,
postby:string
}

export interface  DiscussionList{
    title : string, 
    category : string, 
    sub_category :string , 
    no_of_subcategories :Number , 
    no_of_discussions :Number , 
    posts:post[]
}