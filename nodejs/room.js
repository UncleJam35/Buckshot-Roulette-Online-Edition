const express = require('express');
const router = express.Router();

var fs = require('fs');

var play="./jsonFile/play.json";//存储球员信息的json文件路径
/*返回房间数以及信息*/
router.get('/getRoomInfor',(req,res) => {
  //const body=req.query
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        var roomID=[jsonData.room.length];
        var roomPlayer1=[jsonData.room.length];
        var roomPlayer2=[jsonData.room.length];
        for (var i = 0; i < jsonData.room.length; i++) 
        {
            roomID[i]=jsonData.room[i].ID;
            roomPlayer1[i]=jsonData.room[i].Player[0].ID;
            roomPlayer2[i]=jsonData.room[i].Player[1].ID;
        }
        res.send({
            num:jsonData.room.length,
            ID:roomID,
            roomPlayer1:roomPlayer1,
            roomPlayer2:roomPlayer2
        })
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
	});
})
/**************/
/*创建房间*/
router.get('/CreateRoom',(req,res) => {
  const body=req.query
  console.log("创建房间"+body);
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        if(body.roomID!=""&&body.roomID!=null)
        {
            console.log("创建房间"+body.roomID);
            var TBnum=Math.round(Math.random() * 4)+1;
            var FBnum=Math.round(Math.random() * 4)+2;
            var TFsum=TBnum+FBnum;
            var newJsonInfor = 
            {
                "ID": body.roomID,
                "round":1,
                "delete": 0,
                  "Player": [
                    {
                      "ID": "",
                      "HP": 5,
                      "decision": 0,
                      "prop":
                      [
                        {"type":0},
                        {"type":0},
                        {"type":0},
                        {"type":0}
                      ]
                    },
                    {
                      "ID": "",
                      "HP": 5,
                      "decision": 0,
                      "prop":
                      [
                        {"type":0},
                        {"type":0},
                        {"type":0},
                        {"type":0}
                      ]
                    }
                  ],
                  "now": 0,
                  "sum": TFsum,
                  "ture": TBnum,
                  "false": FBnum
            };
            jsonData.room.push(newJsonInfor);
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync(play, updatedJsonData, 'utf-8');
            res.send({return:1});
        }else{res.send({return:0});}
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
    });
})
/**************/
/*删除房间*/
router.get('/DeleteRoom',(req,res) => {
  const body=req.query
  console.log("删除房间"+body.room);
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        const RoomIndex=jsonData.room.findIndex(item => item.ID === body.room);
        if(RoomIndex>=0)//确认房间存在
        {
            var number=0;
            if(jsonData.room[RoomIndex].Player[0].ID!="")number+=1;
            if(jsonData.room[RoomIndex].Player[1].ID!="")number+=1;
            const PlayerIndex=jsonData.room[RoomIndex].Player.findIndex(item => item.ID === body.Player);
            if(PlayerIndex>=0)//确认用户存在
            {
                if(jsonData.room[RoomIndex].delete>=(number-1))
                {
                    jsonData.room.splice(RoomIndex, 1);
                }
                else
                {
                    jsonData.room[RoomIndex].delete+=1;
                    jsonData.room[RoomIndex].Player[PlayerIndex].ID="";//抹除用户ID
                }
                const modifiedJsonString = JSON.stringify(jsonData,null, 2);
                fs.writeFileSync(play, modifiedJsonString, 'utf-8');
                res.send({return:1});
            }
            else{res.send({return:0});}
        }else{res.send({return:0});}
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
    });
})
/***********/
/****************/
module.exports = router;

