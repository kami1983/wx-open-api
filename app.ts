import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { insertUserInfo, insertRentInfos, TypeInsertRentInfos, fetchRentInfos, fetchRentInfosByOpenIdPaged, refreshRentInfosByOpenId } from './libs/mysql';
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
        "image_urls":["http://tmp/WA8kpNfpWFNTbcb0a020db0e35d949a5c2c5f53f59e6.png"]
    }


    // const raw_data = {
    //     image_urls: [ 'http://tmp/EKmKo4Vsbv3ic02be25f8dc1bb6b068595db3b037890.png' ],
    //     tags: [ '非中介', '电梯房' ],
    //     additional_details: '',
    //     cash_discount: '',
    //     contact_information: '18210008157',
    //     location_latitude: 23.097056049821507,
    //     location_longitude: 113.32077285011394,
    //     room_structure: [ 1, 2, 0 ],
    //     rent_address: 'lizhuang',
    //     rent_area: '98',
    //     rent_type: '合租',
    //     month_rent_price: '3100',
    //     open_id: 'test_open_id',
    // }

    // const formatRawData = () => {
    //    return {
    //         ...raw_data,
    //         tags: raw_data.tags.join(',') as string,
    //         cash_discount: Number(raw_data.cash_discount ?? '0'),
    //         room_structure: raw_data.room_structure.join(',') as string,
    //         rent_area: Number(raw_data.rent_area),
    //         month_rent_price: Number(raw_data.month_rent_price),
    //         location_latitude: raw_data.location_latitude,
    //         location_longitude: raw_data.location_longitude,
    //         open_id: 'test_open_id',
      
    //    }
    // }

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
        image_urls: raw_data.image_urls??[],
    }
}



const PORT = process.env.PORT || 6010;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});


