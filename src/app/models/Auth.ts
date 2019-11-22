export interface Auth {
    city: string,
    email_id: string,
    f_name: string,
    l_name: string,
    mailing_st_address: string,
    member_id: number,
    member_type: string,
    membership_expirydate: Date,
    membership_planid: string,
    notification_email: string,
    notification_phonenumber: string,
    password: string,
    phone_number: string,
    preference_optioncode: string,
    registration_date: Date,
    token: string,
    zip_code: string,
}

export interface userProfile {
    city: string,
    f_name: string,
    l_name: string,
    mailing_st_address: string,
    member_id: number
    member_type: string,
    phone_number: string,
    state_master_id: any
    zip_code: string,
}