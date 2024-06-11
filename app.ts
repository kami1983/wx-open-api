import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { insertUserInfo, insertRentInfos, TypeInsertRentInfos } from './libs/mysql';
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

    // const insertData = {
    //     open_id: req.headers['x-wx-openid'],
    //     month_rent_price,
    //     rent_type,
    //     rent_area,
    //     rent_address,
    //     room_structure,
    //     location_longitude,
    //     location_latitude,
    //     contact_information,
    //     cash_discount,
    //     additional_details,
    //     tags,
    //     image_urls
    // }
    // console.log('Insert data ', {insertData});


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

    // const formatRawData = () => {
    //     return {
    //          ...raw_data,
    //          tags: raw_data.tags.join(','),
    //          cash_discount: Number(raw_data.cash_discount ?? '0'),
    //          room_structure: raw_data.room_structure.join(','),
    //          rent_area: Number(raw_data.rent_area),
    //          month_rent_price: Number(raw_data.month_rent_price),
    //          open_id: 'test_open_id',
    //          image_urls:[]
    //     }
    //  }

    const insertRes = await insertRentInfos(formatRawData(raw_data));
    if (insertRes) {
        res.send({status: true, backData: insertRes});
    }else {
        res.send({status: false, rawData: raw_data});
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

    // const raw_data = {
    //     open_id: undefined,
    //     month_rent_price: '3100',
    //     rent_type: '合租',
    //     rent_area: '91',
    //     rent_address: 'Beijing tongzhou1',
    //     room_structure: [ 1, 2, 0 ],
    //     location_longitude: 113.32452,
    //     location_latitude: 23.099994,
    //     contact_information: '',
    //     cash_discount: '',
    //     additional_details: '',
    //     tags: [ '电梯房', '明厨明卫' ],
    //     image_urls: [ 'http://tmp/UWh1JoKjRBlKc02be25f8dc1bb6b068595db3b037890.png' ],
    // }

    const raw_data = {
        image_urls: [ 'http://tmp/EKmKo4Vsbv3ic02be25f8dc1bb6b068595db3b037890.png' ],
        tags: [ '非中介', '电梯房' ],
        additional_details: '',
        cash_discount: '',
        contact_information: '18210008157',
        location_latitude: 23.097056049821507,
        location_longitude: 113.32077285011394,
        room_structure: [ 1, 2, 0 ],
        rent_address: 'lizhuang',
        rent_area: '98',
        rent_type: '合租',
        month_rent_price: '3100',
        open_id: 'test_open_id',
    }

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
//     return {
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
   return {
        open_id: 'test_open_id',
        month_rent_price: parseFloat(raw_data.month_rent_price),
        rent_type: raw_data.rent_type??'',
        rent_area: parseFloat(raw_data.number) ,
        rent_address: raw_data.rent_address??'',
        room_structure: raw_data.room_structure??[].join(',').toString(),
        location_longitude: parseFloat(raw_data.location_longitude),
        location_latitude: parseFloat(raw_data.location_latitude),
        contact_information: raw_data.contact_information,
        cash_discount: parseFloat(raw_data.cash_discount),
        additional_details: raw_data.additional_details??'',
        tags: (raw_data.tags??[]).join(',').toString(),
        image_urls: raw_data.image_urls??[],
    }
}



const PORT = process.env.PORT || 6010;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});


