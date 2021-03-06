export interface albumList {
    album_docId: string
    album_name: string
    thumbnail_file_name: string
    no_of_photos: number
    create_ts: Date
    isActive: boolean
}

export interface myLeasesList {
    dist_number: string
    leasenumber: string
    leasename: string
}

export interface AlbumImageList {
    original_file_name: string,
    thumbnail_file_name: string,
    upload_ts: Date,
    isDeleted: boolean
}

export interface FullImageUrl {
    img: string
}