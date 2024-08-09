export type TypeInsertRentInfos = {
    open_id: string,
    month_rent_price: number,
    rent_type: string,
    rent_area: number,
    rent_address: string,
    room_structure: string,
    location_longitude: number,
    location_latitude: number,
    contact_information: string,
    cash_discount: number,
    additional_details: string,
    type: number,
    status: number,
    tags: string,
    image_urls: string[]
}

export type TypeUserInfo = {
    id: number,
    open_id: string,
    avatarUrl: string,
    nickName: string
}

export type TypeShareCounter = {
    id?: number,
    news_id: number,
    share_id: string,
    open_id: string,
    chain_hash: string,
    chain_type: string,
    type: number,
    status: number,
    created_at: string
}