/**
* 图片资源统一定义
*/
var IMGRES_SERV_PATH1=""+RELATIVE_PATH;//图片服务器url1
var MGRES_SERV_PATH2=""+RELATIVE_PATH;//图片服务器url2

/**
*@description 图片资源对象
*/
IMAGES = {
	/**
	*@param 合成图标
	*/
	ICON:{
		/*@description 16*16大小图标*/
		SIZE16:{

		},
		/*@description 32*32大小图标*/
		SIZE32:{

		},
		/*@description 48*48大小图标*/
		SIZE48:{

		},
		/*@description 其它尺寸图标*/
		SIZEMIX:{

		}
	},
   /**
	*@description 独立图片
	*/
	IMAGE:{
		/**
		*@description 内容加载效果图
		*/
		 LOADING:{
				SIZE32:{'background-image':"url("+IMGRES_SERV_PATH1+"images/loading.gif)"},
				SIZE16:{'background-image':"url("+IMGRES_SERV_PATH1+"images/loading-16.gif)"}
		 }
	}
};


