import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { insertUserInfo, insertRentInfos } from './libs/mysql';
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
    } = req.body;

    const insertData = {
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
        image_urls
    }
    console.log('Insert data ', {insertData});

    const insertRes = await insertRentInfos(insertData);
    if (insertRes) {
        res.send({status: true, backData: insertRes});
    }else {
        res.send({status: false, backData: insertRes});
    }

});

app.get('/testInsert', async (req, res) => {
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

const PORT = process.env.PORT || 6010;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});


