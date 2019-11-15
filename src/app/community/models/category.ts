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