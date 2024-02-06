# Self control Buckshot Roulette Online Edition（自制Buckshot Roulette联机版）
使用html+css+js编写的模仿《Buckshot Roulette》游戏制作的联机版本，本项目使用到了threejs的库作为3d支持
# 如何部署本项目到个人计算机或服务器上？
首先，请保证您的计算机或服务器已经安装有Nodejs，若没有可以前往nodejs官方进行安装。
其次您需要安装一个hfs（Http File Server）来放置本项目。
当你安装好nodejs以及hfs后，首先先打开hfs将项目文件夹拖入hfs并选择“真实目录”，然后查看hfs给出的IP地址(若是放在服务器上则可在左上角选择IP地址查看官网IP),
记住这个IP地址，现在我们对index.html、room.html、以及logon目录下的index.html进行编辑，将这3个文件中的"JS区"内的"window.severURL="http://192.168.1.3:3100";"中的
"192.168.1.3"改为你刚刚在hfs得到的IP地址，然后保存。
解下打开命令行窗口(windows使用cmd)，在命令行中cd到nodejs的目录，然后使用node main命令启动文件即可
完成以上步骤后，接下来你就可以在浏览器中打开在hfs里提供的链接了，请注意一定是通过hfs提供的链接打开而不是直接双击本地index.html文件，因为这样会导致threejs无法加载并且无法使用cookie。
您可以观看项目中的“部署视频(Installation instructional video).mp4”了解具体操作
# 如何游玩
当你完成部署后，只需要正常打开然后登录即可，登录后会跳转到room.html，你可以选择创建一个房间并让你的好友或者加入一个由您的好友创建的存在的房间，然后就可以游玩了！
# 游戏视频(game video)


https://github.com/UncleJam35/Buckshot-Roulette-Online-Edition/assets/60509553/bce0d5ac-602a-4ba1-b199-2385a67ee49a


# 本项目使用的技术
1.本项目使用到了Nodejs来提供后台支持
其中nodejs文件夹中的main文件用来配置端口以及调用其他文件，infor文件中编写的各个路由函数用于接收玩家的房间加入请求、操作请求、对方操作请求、血量请求、子弹数量请求等。比如当玩家加入房间时infor文件会匹配玩家提供的房间ID是否存在于jsonFile中的play.json中。当玩家改变操作时也会修改play.json中的该玩家数组下的decision值供对方参考。
logOn文件用于登录认证，将玩家登录信息与jsonFile中的userID.json中的信息进行匹配并将玩家登录信息做特征处理将其记录在userID.json和玩家浏览器的cookie中，保证下次登录时直接检测cookie信息即可。
room文件用于创建和删除房间。

2.本项目使用threejs来进行加载3d模型以及绘制3d信息到客户端中
通过loader.load加载3dmodel文件夹中的glb文件。
