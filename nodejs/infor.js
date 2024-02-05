const express = require('express');
const router = express.Router();

var fs = require('fs');

var play="./jsonFile/play.json";//存储球员信息的json文件路径
var BulletType=[[0,0],[0,0],[0,0],[0,0],[0,0]];
var nowFireNum=[0,0];
/*客户端获取道具*/
router.get('/givePropInfor',(req,res) => {
  const body=req.query
  console.log("有请求");
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        const RoomIndex=jsonData.room.findIndex(item => item.ID === body.room);
        var PlayerIndex="";
        if(RoomIndex>=0)
            {PlayerIndex=jsonData.room[RoomIndex].Player.findIndex(item => item.ID === body.Player);}
            else{res.send({error:1,});return 0;}   
        if(RoomIndex>=0&&PlayerIndex>=0)
        {
            console.log("请求为"+body.Player);
            if(PlayerIndex==0)
            {
                res.send({
                    MyProp:jsonData.room[RoomIndex].Player[0].prop,
                    HeProp:jsonData.room[RoomIndex].Player[1].prop
                    //return:jsonData.room[RoomIndex].Player[1].decision
                });
            }
            if(PlayerIndex==1)
            {
                res.send({
                    MyProp:jsonData.room[RoomIndex].Player[1].prop,
                    HeProp:jsonData.room[RoomIndex].Player[0].prop
                    //return:jsonData.room[RoomIndex].Player[0].decision
                });     
            }
        }else{res.send({a:1})}
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
    });
})
/**************/
/*返回血量同时检测子弹数同时判断是否需要补充道具*/
router.get('/giveHP',(req,res) => {
  const body=req.query
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        const RoomIndex=jsonData.room.findIndex(item => item.ID === body.room);
        const PlayerIndex=jsonData.room[RoomIndex].Player.findIndex(item => item.ID === body.Player);
        if(RoomIndex>=0&&PlayerIndex>=0)
        {
            var TB=0;
            var FB=0;
            var P1Pnum=0;
            var P2Pnum=0;
            if((jsonData.room[RoomIndex].ture+jsonData.room[RoomIndex].false)<=0)//若子弹为0则重新补充
            {
                for (var i = 0; i < 4; i++)
                {
                  P1Pnum+=jsonData.room[RoomIndex].Player[0].prop[i].type;
                  P2Pnum+=jsonData.room[RoomIndex].Player[1].prop[i].type;
                }
                if((P1Pnum+P2Pnum)<=0)
                {
                    var propSum=Math.round(Math.random() * 3)+1;
                    for (var i = 0; i < propSum; i++)
                    {
                        jsonData.room[RoomIndex].Player[0].prop[i].type=Math.round(Math.random() * 1)+1;
                        jsonData.room[RoomIndex].Player[1].prop[i].type=Math.round(Math.random() * 1)+1;
                    }
                    jsonData.room[RoomIndex].round+=1;
                }
                TB=Math.round(Math.random() * 4)+1;
                FB=Math.round(Math.random() * 4)+2;
                jsonData.room[RoomIndex].ture=TB;
                jsonData.room[RoomIndex].false=FB;
                jsonData.room[RoomIndex].sum=TB+FB;
                
                const updatedJsonData = JSON.stringify(jsonData, null, 2);
                fs.writeFileSync(play, updatedJsonData, 'utf-8');
            }
            else
            {
                if((jsonData.room[RoomIndex].ture+jsonData.room[RoomIndex].false)==jsonData.room[RoomIndex].sum)
                {
                   TB=jsonData.room[RoomIndex].ture;
                   FB=jsonData.room[RoomIndex].false;
                }
            }
        	if(PlayerIndex==0)
        	{
        		res.send({
        			MyHP:jsonData.room[RoomIndex].Player[0].HP,
					HeHP:jsonData.room[RoomIndex].Player[1].HP,
                    round:jsonData.room[RoomIndex].round+1,
                    TB:TB,
                    FB:FB
        		});
        	}
        	if(PlayerIndex==1)
        	{
        		res.send({
        			MyHP:jsonData.room[RoomIndex].Player[1].HP,
					HeHP:jsonData.room[RoomIndex].Player[0].HP,
                    round:jsonData.room[RoomIndex].round+1,
                    TB:TB,
                    FB:FB
        		});		
        	}
        }else{res.send({a:1})}
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
	});
})
/**************/
/*返回对手动作信息*/
router.get('/play',(req,res) => {
  const body=req.query
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        const RoomIndex=jsonData.room.findIndex(item => item.ID === body.room);
        var PlayerIndex="";
        if(RoomIndex>=0)
            {PlayerIndex=jsonData.room[RoomIndex].Player.findIndex(item => item.ID === body.Player);}
            else{res.send({error:1,});return 0;}   
        if(RoomIndex>=0&&PlayerIndex>=0)
        {
        	if(PlayerIndex==0)
        	{
        		res.send({
        			now:jsonData.room[RoomIndex].Player[0].decision,
        			type:BulletType[RoomIndex][0],
        			return:jsonData.room[RoomIndex].Player[1].decision
        		});
        	}
        	if(PlayerIndex==1)
        	{
        		res.send({
        			now:jsonData.room[RoomIndex].Player[1].decision,
        			type:BulletType[RoomIndex][1],
        			return:jsonData.room[RoomIndex].Player[0].decision
        		});		
        	}
        }else{res.send({a:1})}
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
	});
})
/**************/
/*上传我的动作信息*/
router.get('/submitMyDecision',(req,res) => {
	const body=req.query
	console.log(Number(body.decision));
   // console.log(body);
	//res.send({a:1});
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        const RoomIndex=jsonData.room.findIndex(item => item.ID === body.room);
        const PlayerIndex=jsonData.room[RoomIndex].Player.findIndex(item => item.ID === body.Player);
        if(RoomIndex>=0&&PlayerIndex>=0)
        {
            var PropNum=-1;
                /**/
        	if((jsonData.room[RoomIndex].now==PlayerIndex)||Number(body.decision)==0)
        	{
                if(Number(body.PropNum)!=null&&Number(body.PropNum)>=0)
                {
                    if(jsonData.room[RoomIndex].Player[PlayerIndex].prop[Number(body.PropNum)].type!=0)
                    {
                        PropNum=jsonData.room[RoomIndex].Player[PlayerIndex].prop[Number(body.PropNum)].type//赋值
                        jsonData.room[RoomIndex].Player[PlayerIndex].prop[Number(body.PropNum)].type=0;//清空内容
                    }else{res.send({return:0});return 0;}
                }
        		if((Number(body.decision)==1)||PropNum==1)jsonData.room[RoomIndex].now=!jsonData.room[RoomIndex].now;//改变回合
        		if(Number(body.decision)==1||Number(body.decision)==2||PropNum==1)
        		{
        			if(jsonData.room[RoomIndex].ture>0&&jsonData.room[RoomIndex].false>0)
        			{
        				var typeNum=Math.round(Math.random() * 100)+1;//给子弹赋值真假
        				console.log(typeNum);
        				if(typeNum>50)
                            {
                                jsonData.room[RoomIndex].ture-=1;typeNum=1;
                            }
                            else
                            {
                                jsonData.room[RoomIndex].false-=1;typeNum=0;
                            }
        			}
        			else
        			{
        				if(jsonData.room[RoomIndex].ture>0)
        				{
        					var typeNum=1;
        					jsonData.room[RoomIndex].ture-=1;
        				}
            			if(jsonData.room[RoomIndex].false>0)
            			{
            				var typeNum=0;
            				jsonData.room[RoomIndex].false-=1;
            			}
        			}
        			BulletType[RoomIndex]=[typeNum,typeNum];
        			if(Number(body.decision)==2&&BulletType[RoomIndex][PlayerIndex]==1)//对自己开枪命中
        			{
        				jsonData.room[RoomIndex].Player[PlayerIndex].HP-=1;
        			}
        			if(Number(body.decision)==1&&BulletType[RoomIndex][PlayerIndex]==1)//对对手开枪命中
        			{
        				if(PlayerIndex==1)jsonData.room[RoomIndex].Player[0].HP-=1;
        				if(PlayerIndex==0)jsonData.room[RoomIndex].Player[1].HP-=1;
        			}
                    if(PropNum==1&&BulletType[RoomIndex][PlayerIndex]==1)//对对手开枪命中双倍
                    {
                        if(PlayerIndex==1)jsonData.room[RoomIndex].Player[0].HP-=2;
                        if(PlayerIndex==0)jsonData.room[RoomIndex].Player[1].HP-=2;
                    }
        		}
                if(PropNum==2)//加血
                {
                    jsonData.room[RoomIndex].Player[PlayerIndex].HP+=1;
                }
	        	jsonData.room[RoomIndex].Player[PlayerIndex].decision=Number(body.decision);
	        	const updatedJsonData = JSON.stringify(jsonData, null, 2);
				fs.writeFileSync(play, updatedJsonData, 'utf-8');
				res.send({return:1,type:BulletType[RoomIndex][PlayerIndex]});//回合有效
			}else{res.send({return:0});}
        }
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
	});
})
/**************/
/*加入房间*/
router.get('/JoinRoom',(req,res) => {
  const body=req.query
  fs.readFile(play, 'utf8', (err, data) => {
      if (err) {
        console.error('读取文件时发生错误：', err);
        return;
      }
      try {
        // 解析 JSON 数据
        const jsonData = JSON.parse(data);
        const RoomIndex=jsonData.room.findIndex(item => item.ID === body.room);
        var TB=0;//真子弹数
        var FB=0;//假子弹数
        if(RoomIndex>=0)
        {
            if((jsonData.room[RoomIndex].ture+jsonData.room[RoomIndex].false)==jsonData.room[RoomIndex].sum)
            {
                TB=jsonData.room[RoomIndex].ture;//配置真
                FB=jsonData.room[RoomIndex].false;//配置假
            }
            const PlayerIndex=jsonData.room[RoomIndex].Player.findIndex(item => item.ID === body.Player);
        	if(PlayerIndex<0)//判断用户是否不存在
        	{
        		if(jsonData.room[RoomIndex].Player[0].ID=="")
        		{
        			jsonData.room[RoomIndex].Player[0].ID=body.Player;
                    if(jsonData.room[RoomIndex].delete>=1)jsonData.room[RoomIndex].delete-=1;
        			const updatedJsonData = JSON.stringify(jsonData, null, 2);
					fs.writeFileSync(play, updatedJsonData, 'utf-8');
					res.send({
						MyHP:jsonData.room[RoomIndex].Player[0].HP,
						HeHP:jsonData.room[RoomIndex].Player[1].HP,
                        TB:TB,
                        FB:FB
					});
        		}
        		else
        		{
        			if(jsonData.room[RoomIndex].Player[1].ID=="")
	        		{
	        			jsonData.room[RoomIndex].Player[1].ID=body.Player;
                        if(jsonData.room[RoomIndex].delete>=1)jsonData.room[RoomIndex].delete-=1;
	        			const updatedJsonData = JSON.stringify(jsonData, null, 2);
						fs.writeFileSync(play, updatedJsonData, 'utf-8');
						res.send({
							MyHP:jsonData.room[RoomIndex].Player[1].HP,
							HeHP:jsonData.room[RoomIndex].Player[0].HP,
                            TB:TB,
                            FB:FB
						});
	        		}
                    else
                    {
                        res.send({return:0});
                    }
        		}
        	}
        	else
        	{
        		if(PlayerIndex==0)
        		{
	        		res.send({
                                return:1,
								MyHP:jsonData.room[RoomIndex].Player[0].HP,
								HeHP:jsonData.room[RoomIndex].Player[1].HP,
                                TB:TB,
                                FB:FB
							});
        		}
        		if(PlayerIndex==1)
        		{
        			res.send({
                                return:1,
								MyHP:jsonData.room[RoomIndex].Player[1].HP,
								HeHP:jsonData.room[RoomIndex].Player[0].HP,
                                TB:TB,
                                FB:FB
							});
        		}
        	}
        	console.log("用户"+body.Player+"加入房间"+body.room);
        }else{res.send({return:0});}
      } catch (err) {
        console.error('解析 JSON 数据时发生错误：', err);
      }
	});
})
/**************/
/****************/
module.exports = router;

