		/*设置 Cookie*/
        function setCookie() {
            document.cookie = "userID="+cookieText+";max-age=604800;path=/";
        }
        /*删除 Cookie*/
        function deleteCookie() {
            document.cookie = "userID=;max-age=0;path=/";
        }
        /*读取cookie中的用户信息*/
        window.readUserIDCookie=function() 
        {
		  var cookies = document.cookie.split("; ");
		  for (var i = 0; i < cookies.length; i++) {
		    var cookie = cookies[i].split("=");
		    var cookieName = cookie[0];
		    var cookieValue = cookie[1];
		    if (cookieName === "userID") {
		      console.log("userID 的值为: " + cookieValue);
		      return cookieValue;
		    }
		  }
		  return 0;
		}
		/*进入页面后自动登录*/
				window.AutomaticLogOn=async function()
				{
					var userName=readUserIDCookie();
					if(userName!=0&&userName!="")//判断不为空和不为0
						{
							const res = await axios({
				            	url:window.severURL+'/password',
				            	method:'get',
				            	params:
				            	{
				            		cookie:userName
				            	}
				        	})
				        	if(res.data.return)
				        	{
								window.PlayerID=res.data.userName;
								//return 1;
								InitFunction();
		        			}
		        			else
		        			{
		        				deleteCookie();
		        				window.open("./logon/index.html","_self");
		        			}
						}else{window.open("./logon/index.html","_self");}
				}
				
/******************/