
/**
 * 
 * CREATE TABLE user_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    open_id VARCHAR(255) UNIQUE,
    avatarUrl VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    gender INT,
    language VARCHAR(255),
    nickName VARCHAR(255),
    INDEX idx_nickName (nickName),
    INDEX idx_city (city),
    INDEX idx_country (country),
    INDEX idx_gender (gender),
    INDEX idx_language (language)
);

 */

// 获取 knex 数据对象

import exp from 'constants';
import dotenv from 'dotenv';
dotenv.config();

console.log('process.env.DB_HOST:', process.env.DB_HOST);
console.log('process.env.DB_USER:', process.env.DB_USER);
console.log('process.env.DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('process.env.DB_NAME:', process.env.DB_NAME);
console.log('process.env.DB_PORT:', process.env.DB_PORT);


const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    },
    pool: {
        min: 0,
        max: 7, // Adjust the maximum pool size as needed
        acquireTimeoutMillis: 10000, // Set a timeout for acquiring connections
    }
});

// 用 knex 插入 user_info 表数据，当 open_id 重复时，更新数据
export async function insertUserInfo(data: {
    open_id: string, // VARCHAR(255) UNIQUE,
    avatarUrl: string, //  VARCHAR(255),
    city: string, // VARCHAR(255),
    country: string, // VARCHAR(255),
    gender: number, // INT,
    language: string, // VARCHAR(255),
    nickName: string, // VARCHAR(255),
}): Promise<object|null> {

    try {
        return await knex('user_info').insert(data).onConflict('open_id').merge();
    } catch (error) {
        console.error('插入数据失败:', error);
    } 
    return null;
}

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
    tags: string,
    image_urls: string[]
}

export async function insertRentInfos(params: TypeInsertRentInfos): Promise<object|null> {
    try {
        const {
            open_id,
            month_rent_price,
            rent_type,
            rent_area,
            rent_address,
            room_structure,
            location_longitude,
            location_latitude,
            contact_information,
            cash_discount,
            additional_details,
            tags,
            image_urls // 假设这是一个图片 URL 数组
        } = params;

        // 插入租赁信息
        const [rent_id] = await knex('rent_infos').insert({
            open_id,
            month_rent_price,
            rent_type,
            rent_area,
            rent_address,
            room_structure,
            location_longitude,
            location_latitude,
            contact_information,
            cash_discount,
            additional_details,
            tags
        });

        // 插入图片信息
        if (image_urls && image_urls.length > 0) {
            const imageRecords = image_urls.map(url => ({
                rent_id,
                image_url: url
            }));
            await knex('rent_images').insert(imageRecords);
        }

        return { rent_id };
    } catch (error) {
        return null;
    }
}