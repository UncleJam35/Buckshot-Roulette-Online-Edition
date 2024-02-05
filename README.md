# Self control Buckshot Roulette Online Edition（自制Buckshot Roulette联机版）
使用html+css+js编写的模仿《Buckshot Roulette》游戏制作的联机版本，本项目使用到了threejs的库作为3d支持
# 如何部署本项目到个人计算机或服务器上？
首先，请保证您的计算机或服务器已经安装有Nodejs，若没有可以前往nodejs官方进行安装。
其次您需要安装一个hfs（Http File Server）来放置本项目。
当你安装好nodejs以及hfs后，首先先打开hfs将项目文件夹拖入hfs并选择“真实目录”，然后查看hfs给出的IP地址(若是放在服务器上则可在左上角选择IP地址查看官网IP),
记住这个IP地址，现在我们对index.html、room.html、以及logon目录下的index.html进行编辑，将这3个文件中的"JS区"内的"window.severURL="http://192.168.1.3:3100";"中的
"192.168.1.3"改为你刚刚在hfs得到的IP地址，然后保存。
完成以上步骤后，接下来你就可以在浏览器中打开在hfs里提供的链接了，请注意一定是通过hfs提供的链接打开而不是直接双击本地index.html文件，因为这样会导致threejs无法加载并且无法使用cookie。
# 如何游玩
当你完成部署后，只需要正常打开然后登录即可，登录后会跳转到room.html，你可以选择创建一个房间并让你的好友或者加入一个由您的好友创建的存在的房间，然后就可以游玩了！
