base.clazz('base.component.TabNavi', function(_cfg){
	this.cfg=base.cfgDefault(_cfg,{
		data:null,
		cb_select: null,
		default_index:0,
		class_name:'tab-navi',
		render:null,
		self:false,
		flag:true,//是否触发默认事件
		loading:null
	});
	var own = this;
	this.root = document.createElement('div');
	$(this.root).addClass(this.cfg.class_name);
	
	if(null != this.cfg.loading){
		this.loading = this.cfg.loading;
	}else{
		this.loading = document.createElement('div');
		$(this.loading).html('&nbsp;');
		$(this.loading).addClass('active');
		$(this.loading).css(IMAGES.IMAGE.LOADING.SIZE16);
		$(this.loading).addClass('loading');
	}
	
	if(null == this.cfg.data) {
		$(this.root).append(this.loading);
	} else{
		own.reflushData(this.cfg.data);
	}
return{
	height:function(){
		return own.root.height;
	},
	getRoot:function(){
		return own.root;
	},
	reflushData:function(data,flag){
		own.reflushData(data,flag);
	},
	trigger:function(inx,flag) {
		own.trigger(inx,flag);
	}
}
},{
	reflushData:function(data,flag){
		var own = this;
		if(null == flag){
			flag = own.cfg.flag;
		}
		own.insertTabNavi(data);	
		own.trigger(own.cfg.default_index,flag);
	},
	trigger:function(inx,flag) {
			$(this.root).children().each(function(){
				var _inx = this.index;
				if(_inx == inx ){
					$(this).trigger('click',flag);
					return;
				}
			});
			$(this.root).children().eq(inx).trigger('click',flag);
	},
	insertTabNavi:function(_data){
		var own = this;
		$(own.root).empty();
		var _render = own.cfg.render;
		for(var k in _data){
			var _obj = _data[k];
			var _col = null;
			if ('function' == typeof _obj.render){//自行渲染其中的一个
				_col = _data[k].render(_obj.data);
			}else if('function' == typeof _render){//自行渲染
				_col = _render(_obj.data);
			}
			//else{
			if(null ==_col){//按照默认的渲染
				_col = document.createElement('div');
				$(_col).html(_obj.data.label);
			}
			var _width = -1;
			if('number' == typeof _obj.width){
				$(_col).css({'width':_obj.width+'px'});
			}
			$(_col).addClass('cell inline');
			own.bindFun(_col,_obj);
			$(own.root).append(_col);	
		}
		//调整高度
		$(own.root).ready(function(){
			var _max_height = -1;
			$(own.root).children().each(function(){
				if($(this).height() > _max_height){
					_max_height = $(this).height();
				}
			});
			if($(own.root).height() > _max_height){
				_max_height = $(own.root).height()-2;
			}
			if(_max_height != -1){
				//$(own.root).css({'height':_max_height,'line-height':_max_height+'px'});
				$(own.root).children().each(function(){
					$(this).css({'height':(_max_height+1)+'px','line-height':_max_height+'px'});
				});
			}
		});

	},
	//单击
	bindFun:function(_obj,data){
		var _flag = false;
		if(null !=data.self){
			_flag = data.self;
		}else if(null != this.cfg.self){
			_flag = this.cfg.self;
		}
		_obj.index = data.data.index;
		var _cb_select = this.cfg.cb_select;
		var active_class = 'active';
		var default_class = 'cell';
		$(_obj).click(function(e,flag){
			if(!_flag){
					$(this).siblings().removeClass(active_class).addClass(default_class);
					$(this).addClass(active_class);
			}
			if(null != flag && false == flag){
				return;
			}
			if ('function' == typeof _cb_select){
				_cb_select(data.data.index,_obj,data.data);
			}
		});
	}

});