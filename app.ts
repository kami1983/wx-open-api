import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { insertUserInfo, insertRentInfos, TypeInsertRentInfos, deleteRentInfosByOpenId, fetchRentInfosByOpenIdPaged, refreshRentInfosByOpenId, getRentImagesByRentid, fetchRentInfos, fetchRentDetail } from './libs/mysql';
import { open } from 'fs';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log({headers: req.headers});
    res.send({headers: req.headers});
});

app.post('/registerUser', async (req, res) => {
    const insertData = {
        ...req.body,
        open_id: req.headers['x-wx-openid'],
    }
    const insertRes = await insertUserInfo({
        open_id: insertData.open_id, // VARCHAR(255) UNIQUE,
        avatarUrl: insertData.avatarUrl, //  VARCHAR(255),
        city: insertData.city, // VARCHAR(255),
        country: insertData.country, // VARCHAR(255),
        gender: insertData.gender, // INT,
        language:  insertData.language, // VARCHAR(255),
        nickName: insertData.nickName, // VARCHAR(255),
    });
    if (insertRes) {
        res.send({status: true, backData: insertRes});
    }else {
        res.send({status: false, backData: insertRes});
    }
});

app.post('/insertRentInfos', async (req, res) => {

    console.log('Raw body', req.body)
    const {
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
    } = req.body;

    const raw_data = {
        open_id: req.headers['x-wx-openid'],
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
        image_urls,
    }

    const insertRes = await insertRentInfos(formatRawData(raw_data));
    if (insertRes) {
        res.send({status: true, backData: insertRes});
    }else {
        res.send({status: false, backData: JSON.stringify(raw_data)});
    }

});

app.get('/user/rent-infos', async (req, res) => {
    const { page = '1', limit = '10' } = req.query; // 从请求中获取分页参数
    const open_id = req.headers['x-wx-openid'] as string ??''
    // const open_id = 'o4IK35VLNtV7Cd_t0fiZKP67tOPU'
    const result = await fetchRentInfosByOpenIdPaged(open_id, parseInt(page as string), parseInt(limit as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/rent-infos', async (req, res) => {
    const { page = '1', limit = '10' } = req.query; // 从请求中获取分页参数
    const result = await fetchRentInfos(parseInt(page as string), parseInt(limit as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/rent-detail', async (req, res) => {
    const { rentid = '0' } = req.query; // 从请求中获取分页参数
    const result = await fetchRentDetail(parseInt(rentid as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/user/refresh-rent', async (req, res) => {
    const { rentid = '0' } = req.query; // 从请求中获取分页参数
    const open_id = req.headers['x-wx-openid'] as string ??''
    // const open_id = 'o4IK35VLNtV7Cd_t0fiZKP67tOPU'
    const result = await refreshRentInfosByOpenId(open_id, parseInt(rentid as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/user/delete-rent', async (req, res) => {
    const { rentid = '0' } = req.query; // 从请求中获取分页参数
    const open_id = req.headers['x-wx-openid'] as string ??''
    // const open_id = 'o4IK35VLNtV7Cd_t0fiZKP67tOPU'
    const result = await deleteRentInfosByOpenId(open_id, parseInt(rentid as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/user/rent-images', async (req, res) => {
    try {
     const { rentid = '0' } = req.query; // 从请求中获取分页参数
        const rentId = parseInt(rentid as string);
        if (isNaN(rentId) || rentId <= 0) {
            return res.status(400).json({ error: 'Invalid rent ID provided' });
        }
        
        const images = await getRentImagesByRentid(rentId);
        if (images) {
            res.send({status: true, backData: images});
        } else {
            res.send({status: false, backData: JSON.stringify(req.query)});
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/testDeleteRentInfosByOpenId', async (req, res) => {
    const { rentid = '0' } = req.query; // 从请求中获取分页参数
    const result = await deleteRentInfosByOpenId('o4IK35VLNtV7Cd_t0fiZKP67tOPU', parseInt(rentid as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/testRefreshRentInfosByOpenId', async (req, res) => {
    const { rentid = '0' } = req.query; // 从请求中获取分页参数
    const result = await refreshRentInfosByOpenId('o4IK35VLNtV7Cd_t0fiZKP67tOPU', parseInt(rentid as string));
    if (result) {
        res.send({status: true, backData: result});
    } else {
        res.send({status: false, backData: JSON.stringify(req.query)});
    }
});

app.get('/testInsertUser', async (req, res) => {
    const insertRes = await insertUserInfo({
        open_id: "test_open_id", // VARCHAR(255) UNIQUE,
        avatarUrl: "test_avatarUrl", //  VARCHAR(255),
        city: "test_city", // VARCHAR(255),
        country: "test_country", // VARCHAR(255),
        gender: 2, // INT,
        language:  "test_language", // VARCHAR(255),
        nickName: "test_nickName", // VARCHAR(255),
    });
    res.send({insertRes});
});

app.get('/testInsertRentinfos', async (req, res) => {

    const raw_data = {
        "open_id":"xxxxxxxxxxx",
        "month_rent_price":"3100",
        "rent_type":"合租",
        "rent_area":"98",
        "rent_address":"北京",
        "room_structure":[0,2,0]
        ,"location_longitude":113.32452,
        "location_latitude":23.099994,
        "contact_information":"18210008157",
        "cash_discount":"",
        "additional_details":"",
        "tags":["明厨明卫","带家电"],
        "status": 99,
        "type": 99,
        "image_urls":["http://tmp/WA8kpNfpWFNTbcb0a020db0e35d949a5c2c5f53f59e6.png"]
    }
    const insertRes = await insertRentInfos(formatRawData(raw_data));
    res.send({insertRes});
});

function formatRawData(raw_data: any): TypeInsertRentInfos {

    const convertToFloat = (value: any) => {
        return isNaN(parseFloat(value??'0'))?0:parseFloat(value??'0');
    }

   return {
        open_id: raw_data.open_id??'',
        month_rent_price: convertToFloat(raw_data.month_rent_price),
        rent_type: raw_data.rent_type??'',
        rent_area: convertToFloat(raw_data.rent_area) ,
        rent_address: raw_data.rent_address??'',
        room_structure: (raw_data.room_structure??[]).join(',').toString(),
        location_longitude: convertToFloat(raw_data.location_longitude),
        location_latitude: convertToFloat(raw_data.location_latitude),
        contact_information: raw_data.contact_information,
        cash_discount: convertToFloat(raw_data.cash_discount),
        additional_details: raw_data.additional_details??'',
        tags: (raw_data.tags??[]).join(',').toString(),
        status: parseInt(raw_data.status??"0"),
        type: parseInt(raw_data.type??"0"),
        image_urls: raw_data.image_urls??[],
    }
}



const PORT = process.env.PORT || 6010;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});


