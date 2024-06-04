
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
    // pool: {
    //     min: 0,
    //     max: 7, // Adjust the maximum pool size as needed
    //     acquireTimeoutMillis: 10000, // Set a timeout for acquiring connections
    // }
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
    } finally {
        knex.destroy();
    }
    return null;
}