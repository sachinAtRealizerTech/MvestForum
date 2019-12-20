export interface FollowingMembers {
    member_id: number,
    member_type: string,
    f_name: string,
    l_name: string,
    email_id: string,
    mailing_st_address: string,
    city: string,
    status: string
}

export interface FollowerMembers {
    member_id: number,
    member_type: string,
    f_name: string,
    l_name: string,
    email_id: string,
    mailing_st_address: string,
    city: string,
    status: string
}

export interface FollowRequest {
    member_id: number,
    member_type: string,
    f_name: string,
    l_name: string,
    email_id: string,
    mailing_st_address: string,
    city: string,
    status: string
}

export interface SearchedMembers {
    member_id: number,
    member_type: string,
    f_name: string,
    l_name: string,
    email_id: string,
    mailing_st_address: string,
    city: string,
    status: string
}