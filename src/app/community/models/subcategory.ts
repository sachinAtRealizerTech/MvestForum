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