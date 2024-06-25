
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
    type: number,
    status: number,
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
            type,
            status,
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
            cover_image: image_urls[0] ?? '',
            type,
            status,
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
        console.error('插入数据失败:', error);
        return null;
    }
}

/**
 * 分页获取租赁信息
 * @param {number} page - 当前页码
 * @param {number} limit - 每页显示的记录数
 * @returns {Promise<object>} 包含当前页数据和总记录数的对象
 */
export async function fetchRentInfos(page = 1, limit = 10, type = 1, status = 1) {

    const offset = (page - 1) * limit; // 计算分页的起始点

    try {
        const results = await knex('rent_infos')
            .select(
                'id',
                'month_rent_price',
                'rent_type',
                'rent_area',
                'rent_address',
                'room_structure',
                'location_longitude',
                'location_latitude',
                'contact_information',
                'cash_discount',
                'additional_details',
                'cover_image',
                'tags',
                'created_at',
                'updated_at'
            ).where({ type, status })
            .orderBy('updated_at', 'desc')
            .offset(offset)
            .limit(limit);

        return results;
    } catch (error) {
        console.error('分页查询租赁信息失败:', error);
        return [];
    }
}

export async function fetchRentDetail(rentid: number) {
    try {
        const results = await knex('rent_infos')
            .select(
                'id',
                'month_rent_price',
                'rent_type',
                'rent_area',
                'rent_address',
                'room_structure',
                'location_longitude',
                'location_latitude',
                'contact_information',
                'cash_discount',
                'additional_details',
                'cover_image',
                'tags',
                'created_at',
                'updated_at'
            ).where({ id: rentid });

        if (results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('查询租赁信息失败:', error);
        return null;
    }
}

/**
 * 根据 open_id 获取所有相关的租赁信息，并支持分页
 * @param {string} open_id - 用户的 open_id
 * @param {number} page - 请求的页码，基于 1 开始计算
 * @param {number} limit - 每页显示的记录数
 * @returns {Promise<Array>} 返回分页的租赁信息数组
 */
export async function fetchRentInfosByOpenIdPaged(open_id: string, page = 1, limit = 10, type = 1) {
    const offset = (page - 1) * limit; // 计算分页的起始点

    try {
        const results = await knex('rent_infos')
            .select(
                'id',
                'month_rent_price',
                'rent_type',
                'rent_area',
                'rent_address',
                'room_structure',
                'location_longitude',
                'location_latitude',
                'contact_information',
                'cash_discount',
                'additional_details',
                'cover_image',
                'tags',
                'created_at',
                'updated_at'
            )
            .where({ open_id, type })
            .orderBy('updated_at', 'desc')
            .offset(offset)
            .limit(limit);

        return results;
    } catch (error) {
        console.error('分页查询租赁信息失败:', error);
        return [];
    }
}

/**
 * Refreshes the rent info entry by updating the updated_at timestamp to the current time.
 * @param {string} open_id - The user's OpenID associated with the rent info.
 * @param {number} rentid - The ID of the rent info entry to update.
 * @returns {Promise<object|null>} - Returns the updated record, or null if the update fails.
 */
export async function refreshRentInfosByOpenId(open_id: string, rentid: number) {
    try {
        console.log({ open_id, rentid})
        // 更新记录，并获取更新后的记录返回
        const updatedRows = await knex('rent_infos')
            .where({ id: rentid, open_id: open_id })
            .update({ updated_at: knex.fn.now() })
            .then(() => 
                knex('rent_infos')
                .where({ id: rentid })
                .select()
            );
        console.log({updatedRows})
        if (updatedRows.length > 0) {
            return updatedRows[0];  // 返回更新后的记录
        } else {
            return null; // 未找到记录或没有更新
        }
    } catch (error) {
        console.error('更新失败:', error);
        return null;
    }
}


/**
 * Deletes a rental info record by ID, ensuring it belongs to the specified open_id.
 * @param {string} open_id - The user's unique identifier.
 * @param {number} rentid - The ID of the rent info to be deleted.
 * @returns {Promise<object|null>} - The result of the deletion operation.
 */
export async function deleteRentInfosByOpenId(open_id: string, rentid: number) {
    try {
        const deletedRows = await knex('rent_infos')
            .where({ id: rentid, open_id: open_id }) // Ensuring the rent belongs to the user
            .del(); // Deletes the record

        if (deletedRows) {
            return { deletedRows, rentid, open_id };
        } else {
            return null; // No records deleted
        }
    } catch (error) {
        console.error('Error deleting rental info:', error);
        return null; // Return null on error
    }
}


/**
 * Fetches all images for a given rent ID from the rent_images table.
 * @param {number} rentId - The unique identifier for the rental entry.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of image records or null if an error occurs.
 */
export async function getRentImagesByRentid(rentId: number) {
    try {
        console.log('Fetching images for rentId:', rentId);
        // Fetch all images linked to the given rent ID
        const images = await knex('rent_images')
            .select('id', 'image_url', 'created_at', 'updated_at')
            .where({ rent_id: rentId });
        return images;
    } catch (error) {
        console.error('Failed to fetch images:', error);
        return null; // Handle the error appropriately, returning null or throwing an error
    }
}

/**
 * Fetches a paged list of favorites for a given user.
 * @param {string} open_id - The user's OpenID.
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<Array>} - A list of favorite entries.
 */
export async function fetchFavoritesByOpenId(open_id: string, page = 1, limit = 10) {
    const offset = (page - 1) * limit; // Calculate the offset for the page

    try {
        const favorites = await knex('favorites')
            .where({'favorites.open_id': open_id, 'favorites.status': 1}) // Use the table name in the where clause to remove ambiguity
            .join('rent_infos', 'favorites.rent_id', '=', 'rent_infos.id')
            .select('favorites.id', 'rent_infos.*')
            .orderBy('favorites.created_at', 'desc')
            .limit(limit)
            .offset(offset);

        return favorites;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}


/**
 * Deletes a favorite entry for a given user and rent_id.
 * @param {string} open_id - The user's OpenID.
 * @param {number} rent_id - The ID of the rent info to be un-favorited.
 * @returns {Promise<boolean>} - True if the deletion was successful, false otherwise.
 */
export async function deleteFavorite(open_id: string, rent_id: number) {
    try {
        const deletedRows = await knex('favorites')
            .where({ open_id, rent_id })
            .del();

        return deletedRows > 0;
    } catch (error) {
        console.error('Error deleting favorite:', error);
        return false;
    }
}

/**
 * Adds a new favorite to the favorites table.
 * @param {string} open_id - The open ID of the user.
 * @param {number} rent_id - The rent ID that the user wants to favorite.
 * @param {number} type - The type of the favorite.
 * @param {number} status - The status of the favorite.
 * @returns {Promise<object|null>} - The result of the insert operation.
 */
export async function insertFavorite(open_id: string, rent_id: number, type: number, status: number, title: string) {
    try {
        const [id] = await knex('favorites').insert({
            open_id,
            rent_id,
            title,
            type,
            status
        }).onConflict(['open_id', 'rent_id']).ignore();
        return id ? { id, open_id, rent_id, type, status } : null; // Return the inserted data or null if ignored
    } catch (error) {
        console.error('Error inserting favorite:', error);
        return null;
    }
}
