import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log({headers: req.headers});
    res.send({headers: req.headers});
});

app.post('/login', async (req, res) => {
    const { code } = req.body;
    const appId = process.env.APP_ID;  // 使用环境变量中的appId
    const appSecret = process.env.APP_SECRET;  // 使用环境变量中的appSecret
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;

    try {
        const response = await axios.get(url);
        const { openid, session_key } = response.data;
        // 这里可以添加逻辑来处理 openid 和 session_key，如创建会话等
        res.json({ openid, session_key });
    } catch (error) {
        console.error('登录失败:', error);
        res.status(500).send('登录失败');
    }
});

const PORT = process.env.PORT || 6010;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
