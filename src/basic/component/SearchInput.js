base.clazz('base.component.SearchInput',function(_cfg){
	this.cfg=base.cfgDefault(_cfg,{
		text:'',//默认文本输入框提示信息 input自定义时无效
		input:null,
		data:[],
		cb_click:null,
		maxlen:12,  //最多展示多少行数据
		style:base.component.SearchInput.style
	});
	var own = this;
	own.style = own.cfg.style;
	own.createContent();
	this.expand = false;//是否展开

	return {
		getRoot:function(){
			return own.root;
		},
		getInput:function(){
			return own.input;
		},
		reflush:function(root){//添加至dom树时需执行此初始化方法
			own.init(root);
		},
		reflushData:function(data){
			own.cfg.data=base.cfgDefault(data,[]);
		},
		show:function(){
			own.show();
		},
		hide:function(){
			own.hide();
		}
	}
},{
	show:function(){
		this.expand = true;
		this.down.show();
	},
	hide:function(){
		this.expand = false;
		this.down.hide();
	},
	init:function(root){
		var own = this;
		//修正位置和大小
		own.cfg.root = root;
		own.fixSize();
		own.fixPosition(own.cfg.root);

		$('body').click(function(e){//给body绑定事件 如果事件源不属于当前组件就隐藏
			if('undefined' == typeof($(own.root).has(e.target)[0]) && own.expand){
				own.hide();
			}
		});
	},
	qryStr:function(_str){
		var own = this;
		if(null !=_str && ''!=_str ){
			var _r = own.search(_str);
			if(_r.length>0){
				own.reflushDown(_r);
				own.show();
			}else{
				own.reflushDown([]);
				own.hide();
			}
		}
	},
	search:function(_keywords){
		var own = this;
		var _results = [];
		var _data =  own.cfg.data;
		for(var k in _data){
			//var _flag = false;
			try{
				var _str =  String(_data[k]);
				var reg = new RegExp("("+_keywords+")",'i');
				var _inx = _str.search(reg)
				if(-1 !=_inx){
					var _text = _str.replace(reg,"<span style='color:#FF6600;'>$1</span>"); //给关键词加样式
					_results.push({text:_text,value:_str});
				}
			}catch(err){
					//_flag = false;
			}
		}
		return _results;
	},
	fixPosition:function(root){
		var own = this;
		var p = $(own.root);
		$(own.down).css({
				top: (p.offset().top-$(root).offset().top+p.height())+'px',
				left:(p.offset().left - $(root).offset().left-1)+'px'
		});
	},
	fixSize:function(){
		var own = this;
		var _w0 = $(own.input).css('margin-left')+$(own.input).css('margin-right');
		var _w1 = own.input.offsetWidth +_w0+ own.btn.getRoot().offsetWidth;
		$(own.root).css({'width':_w1+'px'});
		var _w = own.input.clientWidth;
		$(own.down.getRoot()).css({'width':_w+'px'});
		$(own.bottom).css({'width':_w+'px'});
		//var _h = own.input.clientHeight;
		//$(own.btn.getRoot()).css({'height':_h+'px','line-height':_h+'px'});
	},
	reflushDown:function(data){
		var own = this;
		var _data = base.cfgDefault(data,[]);
		var  _maxlen = own.cfg.maxlen;
		own.down.reflush(_data,_maxlen);
	},
	createContent:function(){
		var own = this;
		own.root = document.createElement('div');
		$(own.root).addClass(base.inlineDisplayClass).css(own.style.root);
		own.input = own.createInput();
		var cb_click = own.cfg.cb_click;
		own.btn =  commfunc.getButton('搜索',function(){
			var _str = own.getInputVal();
			if('function' == typeof cb_click){
				cb_click(_str);
			}
			own.hide();
		});
		//own.btn =  own.createBtn('搜索');
		var _div = document.createElement('div');
		var _idiv = document.createElement('div');
		$(_idiv).addClass(base.inlineDisplayClass).append(own.input);
		$(_div).append(_idiv).append(own.btn.getRoot());
		own.down = own.createDown();
		$(own.root).append(_div).append(own.down.getRoot());
	},
	createInput:function(){
		var own = this;
		var _input = own.cfg.input;
		var _text = own.cfg.text;
		if(null == _input){
			_input = commfunc.getInput(_text);
		}
		$(_input).addClass(base.inlineDisplayClass).css(own.style.input);
		
		$(_input).keyup(function(){
			var _str = $(_input).val();
			own.qryStr((_text == _str?'':_str));
		});
		$(_input).focus(function(){
			var _str = $(_input).val();
			own.qryStr((_text == _str?'':_str));
		});
		$(_input).blur(function(){
			if('' == $.trim($(this).val())){
				$(_input).trigger('reset');
			}
		});
		return _input;
	},
	getInputVal:function(){
		var own = this;
		var _text = own.cfg.text;
		var _str = $(own.input).val();
		return (_text == _str?null:_str);
	},
	createDown:function(){
		var own = this;
		var _div = document.createElement('div');
		$(_div).css(own.style.down);
		var _content = document.createElement('div');
		own.bottom = own.createBottom();
		$(_div).append(_content).append(own.bottom).hide();

		return {
			getRoot:function(){
				return _div;
			},
			reflush:function(data,_len){
				$(_content).empty();
				for(var k in data){
					if(k == _len)
						break;
					$(_content).append(own.createCol(data[k]));
				}
			},
			show:function(){
				$(_div).slideDown("normal");
			},
			hide:function(){
				$(_div).slideUp("normal");
			}
		}
	},
	createBottom:function(){
		var own = this;
		var _div = document.createElement('div');
		$(_div).addClass(base.inlineDisplayClass).css(own.style.bottom);
		var _close = document.createElement('div');
		$(_close).css(own.style.close);
		$(_close).click(function(){
			own.hide();
		});
		$(_close).html('关闭');
		$(_div).append(_close);
		return _div;
	},
	createCol:function(data){
		var own = this;
		var _div = document.createElement('div');
		$(_div).css(own.style.line);
		$(_div).html(data.text);
		var cb_click = own.cfg.cb_click;
		$(_div).bind('click',function(){
			$(own.input).val(data.value);
			if('function' == typeof cb_click){
				cb_click(data.value);
			}
			own.hide();
		});

		$(_div).hover(function(){
			$(_div).css(own.style.line_on);
		},function(){
			$(_div).css(own.style.line);
		});
		return _div;
	}
});

base.component.SearchInput.style={
	root:{
		//'border':'1px solid #CCC'
	},
	input:{
		'height':'28px',
		'line-height':'28px',
		'margin-right':'10px',
		'border':'1px solid #CCC'
	},
	down:{
		'position':'absolute',
		'vertical-align':'top',
		'margin-left':'2px',
		'width':'100%',
		'z-index':'300',
		'font-size':'14px',
		'border-left':'1px solid #CCC',
		'border-right':'1px solid #CCC',
		'background-color':'#FFF'
	},
	line:{
		'height':'22px',
		'line-height':'22px',
		'padding':'1px 6px',
		'overflow':'hidden',
		'text-overflow':'ellipsis',
		'white-space':'nowrap',
		'font-family':'Arial,"宋体"',
		'color':'#666',
		'cursor':'pointer',
		'background':'#FFF'
	},
	line_on:{
		'background':'#FFDFC6'
	},
	bottom:{
		'position':'relative',
		'text-align':'right',
		'height':'22px',
		'line-height':'22px',
		'border-top':'1px solid #CCC',
		'border-bottom':'1px solid #CCC'
	},
	close:{
		'font-weight':'normal',
		'margin-right':'5px',
		'right':'0px',
		'position':'absolute',
		'cursor':'pointer'
	}/*,
	btn:{
		'cursor':'pointer',
		'height':'22px',
		'line-height':'22px',
		'width':'50px',
		'text-align':'center',
		'font-size':'14px',
		'border-left':'1px solid #CCC',
		'vertical-align':'top',
		'background-color':'#FFF'
	},
	btn_on:{
		'background-color':'#FCFCFC',
		'color':'#2F2F2F'
	}*/
}