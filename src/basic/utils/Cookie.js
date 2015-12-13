base.clazz("base.utils.Cookie",function(){
	var own = this;	
	return {
		addCookie:function(name,value){
			if (typeof this.getCookie(name) == "undefined") {
				var str = name + "=" + escape(value);
				document.cookie = str+';path=/';				
			}	
		},
		delCookie:function(name){
			var date = new Date();
			date.setTime(date.getTime() - 10000);
			document.cookie = name + "=a; expires=" + date.toGMTString();			
		},
		getCookie:function(c_name){
			/*var arrStr = document.cookie.split("; ");
			console.log(arrStr);
			for(var i = 0;i < arrStr.length;i ++){
				var temp = arrStr[i].split("=");
				console.log("temp[0]:"+temp[0]+";temp[1]:" + temp[1]);
				console.log(name);
				if(temp[0] == name) return unescape(temp[1]);
			}		*/
			if (document.cookie.length>0)  {  
				var c_start=document.cookie.indexOf(c_name + "=");  
				if (c_start!=-1)  {   
					c_start=c_start + c_name.length+1 ; 
					var c_end=document.cookie.indexOf(";",c_start);  
					if (c_end==-1) c_end=document.cookie.length;  
					 return unescape(document.cookie.substring(c_start,c_end));  
				}   
			}  
		 return;  	
		},
		removeCookie:function(name) {
			var res = this.getCookie(name);
			this.delCookie(name);
			return res;
		}
	}},{

});