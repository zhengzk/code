//分类组件
base.clazz('base.componet.ClassifyNavi', function(_cfg){
	this.cfg=base.cfgDefault(_cfg,{
		title:'',
		cb_click:null,
		data:null,
		style:base.componet.ClassifyNavi.style
	});
	var own = this;
	own.style = own.cfg.style;
	own.root = document.createElement('div');
	$(own.root).css(own.style.root);
	own.createContent();
	if(null != own.cfg.data){
		own.reflushData(data);
	}

	return{
		getRoot:function(){
			return own.root;
		},
		setLoading:function(){
			$(own.body).empty().append(_loading);
		},
		trigger:function(_inx,flag){
			own.trigger(_inx,flag);
		},
		reflushData:function(data,flag){
			own.reflushData(data,flag);
		}
	}
},{
	trigger:function(_inx,flag){
		var own = this;
		flag = (null == flag?true:flag);
		if(!flag){
			$(own.body).children().eq(_inx).trigger('on');
		}else{
			$(own.body).children().eq(_inx).trigger('click');
		}
	},
	reflushData:function(data,flag){
		var own = this;
		flag = (null == flag?true:flag);
		var _div = own.body;
		$(_div).empty();
		for(var k in data){
			$(_div).append(own.createNaviCell(data[k]));
		}
		if(!flag){
			$(_div).children().eq(0).trigger('on');
		}else{
			$(_div).children().eq(0).trigger('click');
		}
	},
	createContent:function(){
		var own = this;
		var _title = own.createTitle(own.cfg.title);
		own.body = own.createBody();
		$(own.root).append(_title).append(own.body);
	},
	//创建分类标题
	createTitle:function(_text){
		var own = this;
		var _title = document.createElement('div');
		$(_title).html(_text);
		$(_title).css(own.style.title);
		$(_title).addClass(base.inlineDisplayClass);
		return _title;
	},
	createBody:function(){
		var own = this;
		var _body = document.createElement('div');
		$(_body).css(own.style.body);
		$(_body).addClass(base.inlineDisplayClass);
		var _loading = own.createNaviCellLoading();
		$(_body).append(_loading);
		return _body;
	},
	createNaviCell:function(navi_data){
		var own = this;
		var _span = document.createElement('div');
		var _text = navi_data.text;//所有的
		if(null != navi_data.num){
			 _text +="("+navi_data.num+")";
		}
		$(_span).html('&nbsp;&nbsp;'+_text+'&nbsp;&nbsp;');
		$(_span).css(own.style.item);
		$(_span).addClass(base.inlineDisplayClass);
		$(_span).bind('on',function(){
			$(_span).siblings().trigger('reset');
			$(_span).css(own.style.item_on);
		});

		$(_span).bind('reset',function(){
			$(_span).css(own.style.item);
		});
		var cb_click = own.cfg.cb_click;
		$(_span).click(function(){
			$(_span).trigger('on');
			if('function' == typeof cb_click){
				cb_click(navi_data.data);
			}
		});
		return _span;
	},
	createNaviCellLoading:function(){
		var own = this;
		var _load = document.createElement('div');
		$(_load).css(STC_IMGRES.CMCC.LOADING.SIZE16);
		$(_load).css(own.style.waitting);
		$(_load).addClass(base.inlineDisplayClass);
		return _load;
	}
});

base.componet.ClassifyNavi.style ={
	root:{
		'line-height':'22px',
		'margin':'0px 5px',
		'vertical-align':'top',
		'border-bottom':'1px dashed #e0e0e0'
	},
	title:{
		'margin':'5px 10px 5px 0px',
		'font-size': '12px',
		'font-weight':'bolder'
	},
	body:{
		'margin-left':'5px',
		'width':'650px'
	},
	waitting:{
		'background-position':'center',
		'background-repeat':'no-repeat',
		'height':'30px',
		'width':'100px',
		'margin-left':'5px'
	},
	item:{
		'white-space': 'nowrap',
		'cursor':'pointer',
		'line-height': '22px',
		'height': '22px',
		'margin':'5px 20px  5px 0px',
		'padding': '0px 5px',
		'text-align':'center',
		'font-size':'12px',
		'background-color':'#FFF',
		'color':'#666'
	},
	item_on:{
		'background-color':'#0085D0',
		'color':'#FFF'
	}
}