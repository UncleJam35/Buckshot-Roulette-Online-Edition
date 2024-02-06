import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 820, 460 );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

//导入棋盘
/**/loader.load( './3dmodel/scene.glb', function ( gltf ) {

	scene.add( gltf.scene );
	gltf.scene.position.set(0, 0, 0);

}, undefined, function ( error ) {

	console.error( error );

} );

var a;
var bulletModel=[];
var dreak=[];
/*我方4个格的定位*/
var MyModelPR=
[
	[[2.5, 1, -2.7],[0, 0.3, -1.6]],//右上
	[[2.5, 1, -1.4],[0, 0.3, -1.6]],//右下
	[[-2.2, 1, -2.7],[0, 0.3, -1.6]],//左上
	[[-2.2, 1, -1.4],[0, 0.3, -1.6]]//左下
];
/*对方4个格子的定位*/
var HeModelPR=
[
	[[-2, 1, -7],[0, 0.5, 1.6]],//右上
	[[-2.1, 1, -8.5],[0, 0.5, 1.6]],//右下
	[[2.5, 1, -7.3],[0, 0.5, 1.6]],//左上
	[[2.5, 1, -8.6],[0, 0.5, 1.6]]//左下
];

async function bullet(num, P, R, CellNum, ifNum) {//导入子弹
  return new Promise((resolve, reject) => {
    loader.load('./3dmodel/2bullet.glb', function (gltf) {
      bulletModel[num] = gltf.scene;
      if (ifNum == 1) {MyCell[CellNum] = bulletModel[num];}
      if (ifNum == 2) {HeCell[CellNum] = bulletModel[num];}
      scene.add(bulletModel[num]);
      /*位置*/
      bulletModel[num].position.set(P[0], P[1], P[2]); //左右上下前后
      bulletModel[num].rotation.set(R[0], R[1], R[2]);
      resolve(1); // 添加成功后返回 1
    }, undefined, function (error) {
      console.error(0);
      reject(0); // 添加失败时返回错误信息
    });
  });
}

async function Adddreak(num, P, R, CellNum, ifNum) {//导入药丸
  return new Promise((resolve, reject) => {
    loader.load('./3dmodel/dreak.glb', function (gltf) {
      dreak[num] = gltf.scene;
      if (ifNum == 1) MyCell[CellNum] = dreak[num];
      if (ifNum == 2) HeCell[CellNum] = dreak[num];
      scene.add(dreak[num]);
      /*位置*/
      dreak[num].position.set(P[0], P[1], P[2]); //左右上下前后
      dreak[num].rotation.set(R[0], R[1], R[2]);
      resolve(1); // 添加成功后返回 1
    }, undefined, function (error) {
      console.error(0);
      reject(0); // 添加失败时返回错误信息
    });
  });
}

function gun(num)//导入枪模型
{
	loader.load( './3dmodel/gun.glb', function ( gltf ) {
		a=gltf.scene;
		scene.add(a);
		a.position.set(-2, 1, -6.5);
		a.rotation.set(0, 0.3, -1.5);

	}, undefined, function ( error ) {

		console.error( error );

	} );
}
gun(1);
//bullet();
//Adddreak(0,HeModelPR[3][0],HeModelPR[3][1]);
camera.position.z = 0.3;
camera.position.y = 4;
camera.position.x = 0.2;
camera.rotation.x = -Math.PI / 4;
var GunEnd=[-2,1,-6.5];
var GunAngle=[0, 0.3, -1.5];
var MyPropEnd=[-2,1,-6.5];
var MyPropAngle=[0, 0.3, -1.5];
var HePropEnd=[-2,1,-6.5];
var HePropAngle=[0, 0.3, -1.5];
window.MyCell=[0,0,0,0,1];//用于记录我方格子是否放有道具
window.HeCell=[0,0,0,0,1];//用于记录对方格子是否放有道具
var InitHeight=window.innerHeight*0.1;
var Initwidth=window.innerWidth*0.2;
var MyCellNumber=10;
var HeCellNumber=10;
var mouseX;
var mouseY;
/*鼠标点击判断*/
function handleMouseDown()
{
	/*中心枪*/
	  if((mouseX>Initwidth+375&&mouseY>InitHeight+150)&&(mouseX<Initwidth+470&&mouseY<InitHeight+230))
	  	{
			  if (event.button === 0)
			  {
			    	SelectedGun(1);
			  }
	  	}
	  	else
	  	{
			  if (event.button === 0)
			  {
			    	SelectedGun(0);
			  }
	  	}
	 /*我方4个道具区选择*/
	 	if((mouseX>Initwidth+508&&mouseY>InitHeight+216)&&(mouseX<Initwidth+584&&mouseY<InitHeight+268))
	 	{
	 		if (event.button === 0)
			  {
			  	submitMyUseProp(0);/*.then(result => {
				  if(result==1)MyUseProp(0);
				  //if(result!=1)alert("该回合不是你的回合或这里并没有道具");
				});*/
			  }
	 	}
	 	if((mouseX>Initwidth+540&&mouseY>InitHeight+302)&&(mouseX<Initwidth+622&&mouseY<InitHeight+372))
	 	{
	 		if (event.button === 0)
			  {
			  	submitMyUseProp(1)/*.then(result => {
				  if(result==1)MyUseProp(1);
				  //if(result!=1)alert("该回合不是你的回合或这里并没有道具");
				});*/
			  }
	 	}
	 	if((mouseX>Initwidth+254&&mouseY>InitHeight+214)&&(mouseX<Initwidth+286&&mouseY<InitHeight+265))
	 	{
	 		if (event.button === 0)
			  {
			  	submitMyUseProp(2);/*.then(result => {
				  if(result==1)MyUseProp(2);
				  //if(result!=1)alert("该回合不是你的回合或这里并没有道具");
				  //alert(result);
				});*/
			  }
	 	}
	 	if((mouseX>Initwidth+207&&mouseY>InitHeight+297)&&(mouseX<Initwidth+240&&mouseY<InitHeight+387))
	 	{
	 		if (event.button === 0)
			  {
			  	submitMyUseProp(3);/*.then(result => {
				  if(result==1)MyUseProp(3);
				  //if(result!=1)alert("该回合不是你的回合或这里并没有道具");
				});*/
			  }
	 	}
}
/*鼠标位置判断*/
function handleMouseMove()
{
	   mouseX = event.clientX;
 	   mouseY = event.clientY;
	  //console.log(InitHeight+""+Initwidth);
	  
	  /*我方右上格子*/
	 if((mouseX>Initwidth+508&&mouseY>InitHeight+216)&&(mouseX<Initwidth+584&&mouseY<InitHeight+268))
	 {
	 	if(MyCell[0]!=0&&MyCell[0]!=1)
	 	{
	 		MyCellNumber=0;
	 		MyPropEnd=MyModelPR[0][0];
	 		MyPropEnd[1]=1.5;
			MyPropAngle=MyModelPR[0][1];
			//document.addEventListener('mousedown', function(event) { if (event.button === 0) {MyUseProp(0);}});	
	 	}
	 }
	 else
	 {
	 	if(MyCell[0]!=0&&MyCell[0]!=1)
	 	{
	 		if(MyCell[0].position.y!=1)
	 		{
		 		MyCellNumber=0;
		 		MyPropEnd=MyModelPR[0][0];
		 		MyPropEnd[1]=1;
				MyPropAngle=MyModelPR[0][1];
			}
	 	}
	 }
	 /*我方右下格子*/
	 if((mouseX>Initwidth+540&&mouseY>InitHeight+302)&&(mouseX<Initwidth+622&&mouseY<InitHeight+372))
	 {
	 	if(MyCell[1]!=0&&MyCell[1]!=1)
	 	{
	 		MyCellNumber=1;
	 		MyPropEnd=MyModelPR[1][0];
	 		MyPropEnd[1]=1.5;
			MyPropAngle=MyModelPR[1][1];
			//document.addEventListener('mousedown', function(event) { if (event.button === 0) {MyUseProp(1);}});
	 	}

	 }
	 else
	 {
	 	if(MyCell[1]!=0&&MyCell[1]!=1)
	 	{
	 		if(MyCell[1].position.y!=1)
	 		{
		 		MyCellNumber=1;
		 		MyPropEnd=MyModelPR[1][0];
		 		MyPropEnd[1]=1;
				MyPropAngle=MyModelPR[1][1];
			}
	 	}
	 }
	 /*我方左上格子*/
	 if((mouseX>Initwidth+254&&mouseY>InitHeight+214)&&(mouseX<Initwidth+286&&mouseY<InitHeight+265))
	 {
	 	if(MyCell[2]!=0&&MyCell[2]!=1)
	 	{
	 		MyCellNumber=2;
	 		MyPropEnd=MyModelPR[2][0];
	 		MyPropEnd[1]=1.5;
			MyPropAngle=MyModelPR[2][1];
			//document.addEventListener('mousedown', function(event) { if (event.button === 0) {MyUseProp(2);}});
	 	}

	 }
	 else
	 {
	 	if(MyCell[2]!=0&&MyCell[2]!=1)
	 	{
	 		if(MyCell[2].position.y!=1)
	 		{
		 		MyCellNumber=2;
		 		MyPropEnd=MyModelPR[2][0];
		 		MyPropEnd[1]=1;
				MyPropAngle=MyModelPR[2][1];
			}
	 	}
	 }
	  /*我方左下格子*/
	 if((mouseX>Initwidth+207&&mouseY>InitHeight+297)&&(mouseX<Initwidth+240&&mouseY<InitHeight+387))
	 {
	 	if(MyCell[3]!=0&&MyCell[3]!=1)
	 	{
	 		MyCellNumber=3;
	 		MyPropEnd=MyModelPR[3][0];
	 		MyPropEnd[1]=1.5;
			MyPropAngle=MyModelPR[3][1];
			//document.addEventListener('mousedown', function(event) { if (event.button === 0) {MyUseProp(2);}});
	 	}

	 }
	 else
	 {
	 	if(MyCell[3]!=0&&MyCell[3]!=1)
	 	{
	 		if(MyCell[3].position.y!=1)
	 		{
		 		MyCellNumber=3;
		 		MyPropEnd=MyModelPR[3][0];
		 		MyPropEnd[1]=1;
				MyPropAngle=MyModelPR[3][1];
			}
	 	}
	 }

}
document.addEventListener('mousemove',handleMouseMove);
document.addEventListener('mousedown',handleMouseDown);
const pc=requestAnimationFrame(animate);
/*枪选中动画*/
function SelectedGun(num)
{
	if(num)
		{
			GunEnd[1]=1.5;

			document.getElementsByName('fireButton')[0].style.opacity=1;
			document.getElementsByName('fireButton')[1].style.opacity=1;
		}
	else
		{
			GunEnd[1]=1;
			document.getElementsByName('fireButton')[0].style.opacity=0;
			document.getElementsByName('fireButton')[1].style.opacity=0;
		}
}
/*我方道具放置*/
window.PropPlace = async function(type) {
  return new Promise((resolve, reject) => {
    var i = 0;
    var tab;

    for (i = 0; i < 5; i++) {
      if (MyCell[i] == 0) break;
      if (i>=4&&MyCell[i] == 1) return 0;
    }
    if (type == 0) {
      tab = 1;
      MyCell[i]=1;
      resolve(tab);
      return 0;
    }

    switch (type) {
      /*判断道具类型*/
      case 1: //子弹
        bullet([bulletModel.length], MyModelPR[i][0], MyModelPR[i][1], i, 1)
          .then(result => resolve(result))
          .catch(error => reject(error));
        break;
      case 2: //药丸
        Adddreak([dreak.length], MyModelPR[i][0], MyModelPR[i][1], i, 1)
          .then(result => resolve(result))
          .catch(error => reject(error));
        break;
    }
  });
}
/*对方道具放置*/
window.HePropPlace=function(type)
{
	return new Promise((resolve, reject) => {
		var i=0;
		var tab;
		for (i=0;i < 5; i++)
		{
			if(HeCell[i]==0)break;
			if(i>=4&&HeCell[i]==1)return 0;
		}
		if (type == 0)
		{
	      tab = 1;
	      HeCell[i]=1;
	      resolve(tab);
	      return 0;
	    }
		switch(type)
		{/*判断道具类型*/
			case 1://子弹
				bullet([bulletModel.length],HeModelPR[i][0],HeModelPR[i][1],i,2)
				.then(result => resolve(result))
        		.catch(error => reject(error));
			break;
			case 2://药丸
				Adddreak([dreak.length],HeModelPR[i][0],HeModelPR[i][1],i,2)
				.then(result => resolve(result))
         		.catch(error => reject(error));
			break;
		}
	});
}

/*我方举枪射击动画*/
window.MeShootGun = function(num,type)
{
	switch(num)
	{
	case 1:
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown',handleMouseDown);
			//submitMyDecision(0);
			/*第1步*/
			GunEnd=[1,1,-4];//xyz
			GunAngle=[0, 0, 0];//xyz
			setTimeout(function() {
				/*第2步*/
				GunEnd=[1,1,-4];//xyz
				GunAngle=[0.3, 0, 0];//xyz
			}, 1000);
			setTimeout(function() {
				/*第3步*/
				GunEnd=[1,1,-4];//xyz
				GunAngle=[0, 0, 0];//xyz
				document.getElementsByName('BulletAudio')[type].volume=1;
				document.getElementsByName('BulletAudio')[type].play();
			}, 1100);
			setTimeout(function() {
				/*第4步*/
				GunEnd=[-2,1,-6.5];
				GunAngle=[0, 0.3, -1.5];
				//document.addEventListener('mousemove',handleMouseMove);
				giveHP();
			}, 1500);
		break;
	case 2:
			document.removeEventListener('mousemove', handleMouseMove);			
			document.removeEventListener('mousedown',handleMouseDown);
			/*第1步*/
			GunEnd=[0,1,-2];//xyz
			GunAngle=[0, 3.2, 0];//xyz
			setTimeout(function() {
				/*第2步*/
				GunEnd=[0,1,-2];//xyz
				GunAngle=[0.3, 3.2, 0];//xyz
			}, 1000);
			setTimeout(function() {
				/*第3步*/
				GunEnd=[0,1,-2];//xyz
				GunAngle=[0, 3.2, 0];//xyz
				document.getElementsByName('BulletAudio')[type].volume=1;
				document.getElementsByName('BulletAudio')[type].play();
			}, 1100);
			setTimeout(function() {
				/*第4步*/
				GunEnd=[-2,1,-6.5];
				GunAngle=[0, 0.3, -1.5];
				document.addEventListener('mousemove',handleMouseMove);
				document.addEventListener('mousedown',handleMouseDown);
				giveHP();
			}, 1500);
	break;
	}
}/**/
/*对方举枪射击动画*/
window.YouShootGun =function(num,type)
{
	switch(num)
	{
	case 1:
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mousedown',handleMouseDown);
		/*第1步*/
		GunEnd=[0,1,-5];//xyz
		GunAngle=[-0.2, 3.2, 0];//xyz
		setTimeout(function() {
			/*第2步*/
			GunEnd=[0,1,-5];//xyz
			GunAngle=[-0.5, 3.2, 0];//xyz
		}, 1000);
		setTimeout(function() {
			/*第3步*/
			GunEnd=[0,1,-5];//xyz
			GunAngle=[-0.2, 3.2, 0];//xyz
			document.getElementsByName('BulletAudio')[type].volume=1;
			document.getElementsByName('BulletAudio')[type].play();
		}, 1100);
		setTimeout(function() {
			/*第4步*/
			GunEnd=[-2,1,-6.5];
			GunAngle=[0, 0.3, -1.5];
			//MeShootGun();
			document.addEventListener('mousemove',handleMouseMove);
			document.addEventListener('mousedown',handleMouseDown);
			giveHP();
		}, 1800);
	break;
	case 2:
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mousedown',handleMouseDown);
		/*第1步*/
		GunEnd=[0,0,-9];//xyz
		GunAngle=[-0.2, 0, 0];//xyz
		setTimeout(function() {
			/*第2步*/
			GunEnd=[0,0,-9];//xyz
			GunAngle=[-0.5, 0, 0];//xyz
		}, 1000);
		setTimeout(function() {
			/*第3步*/
			GunEnd=[0,0,-9];//xyz
			GunAngle=[-0.2, 0, 0];//xyz
			document.getElementsByName('BulletAudio')[type].volume=1;
			document.getElementsByName('BulletAudio')[type].play();
		}, 1100);
		setTimeout(function() {
			/*第4步*/
			GunEnd=[-2,1,-6.5];
			GunAngle=[0, 0.3, -1.5];
			//MeShootGun();
			//document.addEventListener('mousemove',handleMouseMove);
			giveHP();
		}, 1800);
	break;
	}
}/**/
/*我方道具使用动画*/
window.MyUseProp=function(num,type)
{
	for (var i = 0; i < bulletModel.length; i++)//检测道具是否为子弹
	{
		if(MyCell[num]==bulletModel[i])
		{
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown',handleMouseDown);
			/*第1步*/
			GunEnd=[1,1,-4];//xyz
			GunAngle=[0, 0, 0];//xyz
			setTimeout(function() {
				/*第2步*/
				MyCellNumber=num;
				MyPropEnd=[1, 2, 2];
				MyPropAngle=[0, 1.5, -1.6];
			}, 500);
			setTimeout(function() {
				/*第3步*/
				scene.remove(MyCell[num]);//移除模型
				//MyCell[num].dispose();//销毁模型
				MyCell[num]=0;
				MyCellNumber=10;
				GunEnd=[1,1,-4];//xyz
				GunAngle=[0.3, 0, 0];//xyz
			}, 1500);
			setTimeout(function() {
				/*第4步*/
				GunEnd=[1,1,-4];//xyz
				GunAngle=[0, 0, 0];//xyz
				document.getElementsByName('BulletAudio')[type].volume=1;
				document.getElementsByName('BulletAudio')[type].play();
			}, 1600);
			setTimeout(function() {
				/*第5步*/
				GunEnd=[-2,1,-6.5];
				GunAngle=[0, 0.3, -1.5];
				//document.addEventListener('mousemove',handleMouseMove);
				giveHP();
			}, 2000);
		}
	}
	/***********/
	for (var i = 0; i < dreak.length; i++)//检测道具是否为药丸
	{
		if(MyCell[num]==dreak[i])
		{
			document.removeEventListener('mousemove', handleMouseMove);	
			document.removeEventListener('mousedown',handleMouseDown);
			MyCellNumber=num;
			dreak[i]=1;
			MyPropEnd=[0, 3, 2];
			MyPropAngle=[0, 1.5, -1.6];
			setTimeout(function() {
				scene.remove(MyCell[num]);//移除模型
				//MyCell[num].dispose();//销毁模型
				MyCell[num]=0;
				MyCellNumber=10;
				
			}, 1000);
			setTimeout(function() {
				document.addEventListener('mousemove',handleMouseMove);
				document.addEventListener('mousedown',handleMouseDown);
				giveHP();
			}, 1500);
			break;
		}
	}
}
/*对方道具使用动画*/
window.HeUseProp=function(num,type)
{
	for (var i = 0; i < bulletModel.length; i++)//检测道具是否为子弹
	{
		if(HeCell[num]==bulletModel[i])
		{
			document.removeEventListener('mousemove', handleMouseMove);			
			document.removeEventListener('mousedown',handleMouseDown);
			/*第1步*/
			GunEnd=[0,1,-5];//xyz
			GunAngle=[-0.2, 3.2, 0];//xyz
			setTimeout(function() {
				/*第2步*/
				HeCellNumber=num;
				HePropEnd=[-0.2, 2.1, -8];
				HePropAngle=[0.1, 1.4, 1.5];
			}, 500);
			setTimeout(function() {
				/*第3步*/
				scene.remove(HeCell[num]);//移除模型
				//MyCell[num].dispose();//销毁模型
				HeCell[num]=0;
				HeCellNumber=10;
				GunEnd=[0,1,-5];//xyz
				GunAngle=[-0.5, 3.2, 0];//xyz
			}, 1500);
			setTimeout(function() {
				/*第4步*/
				GunEnd=[0,1,-5];//xyz
				GunAngle=[-0.2, 3.2, 0];//xyz
				document.getElementsByName('BulletAudio')[type].volume=1;
				document.getElementsByName('BulletAudio')[type].play();
			}, 1600);
			setTimeout(function() {
				/*第5步*/
				GunEnd=[-2,1,-6.5];
				GunAngle=[0, 0.3, -1.5];
				document.addEventListener('mousemove',handleMouseMove);
				document.addEventListener('mousedown',handleMouseDown);
				giveHP();
			}, 2000);
		}
	}
	/***********/
	for (var i = 0; i < dreak.length; i++)//检测道具是否为药丸
	{
		if(HeCell[num]==dreak[i])
		{
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown',handleMouseDown);
			HeCellNumber=num;
			//dreak[i]=1;
			HePropEnd=[0, 3, -8];
			HePropAngle=[0, 1.5, -1.6];
			setTimeout(function() {
				scene.remove(HeCell[num]);//移除模型
				//MyCell[num].dispose();//销毁模型
				HeCell[num]=0;
				HeCellNumber=10;
				
			}, 1000);
			setTimeout(function() {
				//document.addEventListener('mousemove',handleMouseMove);
				giveHP();
			}, 1500);
			break;
		}
	}
}
function animate()
{
	requestAnimationFrame(animate);
	/*枪的位置修正*/
		if(a.position.y!=GunEnd[1])
		{
			if(GunEnd[1]<a.position.y)a.position.y-=0.1;
			if(GunEnd[1]>a.position.y)a.position.y+=0.1;
		}
		if(a.position.x!=GunEnd[0])
		{
			if(GunEnd[0]<a.position.x)a.position.x-=0.1;
			if(GunEnd[0]>a.position.x)a.position.x+=0.1;
		}
		if(a.position.z!=GunEnd[2])
		{
			if(GunEnd[2]<a.position.z)a.position.z-=0.1;
			if(GunEnd[2]>a.position.z)a.position.z+=0.1;
		}
	/*枪的角度修正*/
		if(Number(a.rotation.y.toFixed(1))!=GunAngle[1])
		{
			if(GunAngle[1]<Number(a.rotation.y.toFixed(1)))a.rotation.y-=0.1;
			if(GunAngle[1]>Number(a.rotation.y.toFixed(1)))a.rotation.y+=0.1;
		}
		if(Number(a.rotation.x.toFixed(1))!=GunAngle[0])
		{
			if(GunAngle[0]<Number(a.rotation.x.toFixed(1)))a.rotation.x-=0.1;
			if(GunAngle[0]>Number(a.rotation.x.toFixed(1)))a.rotation.x+=0.1;
			//console.log(a.rotation.x);
		}
		if(Number(a.rotation.z.toFixed(1))!=GunAngle[2])
		{
			if(GunAngle[2]<Number(a.rotation.z.toFixed(1)))a.rotation.z-=0.1;
			if(GunAngle[2]>Number(a.rotation.z.toFixed(1)))a.rotation.z+=0.1;
		}
		if(MyCellNumber!=10){ModelPRUpdate(MyCellNumber);}
		if(HeCellNumber!=10){HeModelPRUpdate(HeCellNumber);}
	/************/
	renderer.render(scene,camera);
}
function ModelPRUpdate(num)//我方模型修正
{
	/*道具的位置修正*/
		if(MyCell[num].position.y!=MyPropEnd[1])
		{
			if(MyPropEnd[1]<MyCell[num].position.y)MyCell[num].position.y-=0.1;
			if(MyPropEnd[1]>MyCell[num].position.y)MyCell[num].position.y+=0.1;
		}
		if(MyCell[num].position.x!=MyPropEnd[0])
		{
			if(MyPropEnd[0]<MyCell[num].position.x)MyCell[num].position.x-=0.1;
			if(MyPropEnd[0]>MyCell[num].position.x)MyCell[num].position.x+=0.1;
		}
		if(MyCell[num].position.z!=MyPropEnd[2])
		{
			if(MyPropEnd[2]<MyCell[num].position.z)MyCell[num].position.z-=0.1;
			if(MyPropEnd[2]>MyCell[num].position.z)MyCell[num].position.z+=0.1;
		}
	/*道具的角度修正*/
		if(Number(MyCell[num].rotation.y.toFixed(1))!=MyPropAngle[1])
		{
			if(MyPropAngle[1]<Number(MyCell[num].rotation.y.toFixed(1)))MyCell[num].rotation.y-=0.1;
			if(MyPropAngle[1]>Number(MyCell[num].rotation.y.toFixed(1)))MyCell[num].rotation.y+=0.1;
		}
		if(Number(MyCell[num].rotation.x.toFixed(1))!=MyPropAngle[0])
		{
			if(MyPropAngle[0]<Number(MyCell[num].rotation.x.toFixed(1)))MyCell[num].rotation.x-=0.1;
			if(MyPropAngle[0]>Number(MyCell[num].rotation.x.toFixed(1)))MyCell[num].rotation.x+=0.1;
			//console.log(a.rotation.x);
		}
		if(Number(MyCell[num].rotation.z.toFixed(1))!=MyPropAngle[2])
		{
			if(MyPropAngle[2]<Number(MyCell[num].rotation.z.toFixed(1)))MyCell[num].rotation.z-=0.1;
			if(MyPropAngle[2]>Number(MyCell[num].rotation.z.toFixed(1)))MyCell[num].rotation.z+=0.1;
		}
	/************/
}
function HeModelPRUpdate(num)//对方模型修正
{
	/*道具的位置修正*/
		if(HeCell[num].position.y!=HePropEnd[1])
		{
			if(HePropEnd[1]<HeCell[num].position.y)HeCell[num].position.y-=0.1;
			if(HePropEnd[1]>HeCell[num].position.y)HeCell[num].position.y+=0.1;
		}
		if(HeCell[num].position.x!=HePropEnd[0])
		{
			if(HePropEnd[0]<HeCell[num].position.x)HeCell[num].position.x-=0.1;
			if(HePropEnd[0]>HeCell[num].position.x)HeCell[num].position.x+=0.1;
		}
		if(HeCell[num].position.z!=HePropEnd[2])
		{
			if(HePropEnd[2]<HeCell[num].position.z)HeCell[num].position.z-=0.1;
			if(HePropEnd[2]>HeCell[num].position.z)HeCell[num].position.z+=0.1;
		}
	/*道具的角度修正*/
		if(Number(HeCell[num].rotation.y.toFixed(1))!=HePropAngle[1])
		{
			if(HePropAngle[1]<Number(HeCell[num].rotation.y.toFixed(1)))HeCell[num].rotation.y-=0.1;
			if(HePropAngle[1]>Number(HeCell[num].rotation.y.toFixed(1)))HeCell[num].rotation.y+=0.1;
		}
		if(Number(HeCell[num].rotation.x.toFixed(1))!=HePropAngle[0])
		{
			if(HePropAngle[0]<Number(HeCell[num].rotation.x.toFixed(1)))HeCell[num].rotation.x-=0.1;
			if(HePropAngle[0]>Number(HeCell[num].rotation.x.toFixed(1)))HeCell[num].rotation.x+=0.1;
			//console.log(a.rotation.x);
		}
		if(Number(HeCell[num].rotation.z.toFixed(1))!=HePropAngle[2])
		{
			if(HePropAngle[2]<Number(HeCell[num].rotation.z.toFixed(1)))HeCell[num].rotation.z-=0.1;
			if(HePropAngle[2]>Number(HeCell[num].rotation.z.toFixed(1)))HeCell[num].rotation.z+=0.1;
		}
	/************/
}
animate();
//