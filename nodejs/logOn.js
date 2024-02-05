const express = require('express');
const router = express.Router();
var crypto = require('crypto');
var fs = require('fs');

var userIDfile="./jsonFile/userID.json";//存储球员信息的json文件路径

/************/
/*登录验证*/
router.get('/password',(req,res) => {
	const AccessIP=req.ip//提取ip
	const user=req.query;//提取get值
    //if(user.aaa==null){console.log("yes")}else{console.log("no")}
    /**/
	fs.readFile(userIDfile, 'utf8', (err, data) => {
	      if (err) {
	        console.error('读取文件时发生错误：', err);
	        return;
	      }
	      try {
	        // 解析 JSON 数据
	        const jsonData = JSON.parse(data);
	        /*cookie登录*/
	        if(user.cookie!=null)
	        {
	        	if((jsonData.userID.findIndex(item => item.cookie === user.cookie))>=0)//判断cookie是否存在
	        	{
	        		res.send({
	        			return:1,//cookie正确标志
	        			userName:jsonData.userID[jsonData.userID.findIndex(item => item.cookie === user.cookie)].userID
	        		});
	        	}else{res.send({return:0})}
	        }
	      else
	    {
	        if((jsonData.userID.findIndex(item => item.userID === user.userID))>=0)//判断用户是否存在
	        {
	        	console.log("用户为:"+user.userID+"登录IP为:"+AccessIP);
	        	/*哈希处理密码*/
				const hash = crypto.createHash('sha256');
			    hash.update(user.password);
			    const hashedValue = hash.digest("hex");
			    /*哈希处理cookie标识*/
				const cookieHash = crypto.createHash('sha256');
			    cookieHash.update(user.userID+AccessIP);
			    const cookieValue = cookieHash.digest("hex");
	        	if(hashedValue===jsonData.userID[jsonData.userID.findIndex(item => item.userID === user.userID)].password)//判断密码是否正确
	        	{
	        		res.send({
	        			return:1,//密码正确标志
	        			cookie:cookieValue
	        		});
	        		/*把cookie信息记录*/
	        		jsonData.userID[jsonData.userID.findIndex(item => item.userID === user.userID)].cookie=cookieValue;
	        		const updatedJsonData = JSON.stringify(jsonData, null, 2);
					fs.writeFileSync(userIDfile, updatedJsonData, 'utf-8');
					/***/
	        	}else{res.send({return:0});}
	        }else{res.send({return:0});}
	    }
	      } catch (err) {
	        console.error('解析 JSON 数据时发生错误：', err);
	      }
	    
	});
})
/*****************/
module.exports = router;

