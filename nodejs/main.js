//const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');

const app = express();

app.use(express.urlencoded({extended:false}))
const cors = require('cors')
app.use(cors())

const giveInfor = require('./infor.js')//启动infor文件
app.use(giveInfor)
const logOn = require('./logOn.js')//启动登录文件
app.use(logOn)
const roomInfor = require('./room.js')//房间信息文件
app.use(roomInfor)

app.listen(3100,()=>{
	console.log('服务器已启动,端口配置为3100');
})

