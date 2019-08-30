export interface Category {
        _id:string,       
        categories:CategoryDetails[]
}

export interface CategoryDetails{
    name:string,
    id: Number,
    no_of_subcategories: Number,
    no_of_discussions:Number
}