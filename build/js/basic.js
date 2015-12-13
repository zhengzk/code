
var Base = function (){
	var own = this;
	own.__base_inline_style_mode__ = 0;
	var herf = new own.Href();
	var storage =new own.Storage();
	own.inlineDisplayClass();//调用该方法为了解决谷歌浏览器兼容性问题 该未加载被使用
    return{
	     Href:herf,
		 Storage:storage,
		 clazz:function() {
			 own.clazz(arguments[0],arguments[1],arguments[2]);
		 },
		 cfgDefault:function(src, def){
			 return own.cfgDefault(src, def);
		 },
		 addCss:function(path){
			document.write("<link type='text/css' rel='stylesheet' href='"+path+"' />");
		 },
		 addScript:function(path){
			document.write("<script type='text/javascript' src='"+path+"' ></script>");
		 },
		 loadScript:function(path){
			own.loadScript(path);
		 },
		 loadCss:function(path){
			own.loadCss(path);
		 },
		 packages:function(path){
			own.__ns(path, false);
		 },
		 string2Var:function(name){
			try {
				var o = eval(name);
				if(typeof o == 'undefined')
					return null;
				return o;
			} catch (e) {
				return null;
			}
		},
		inlineDisplayClass:function() {
			return own.inlineDisplayClass();
		}
	};
};

Base.prototype = {
    __ns:function(path, flag) {
        var arr = path.split(".");      
		var length = arr.length;
        if(flag==true) length--;
        if(length <= 0 ) return;

        var i=1;
        var ns = arr[0];
        do {
            eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
            ns += "."+arr[i++];
        }while(length>=i);
    },
    clazz:function() {
        var own = this;
        if(arguments.length < 2 || arguments.length >3)
            return;
		
        own.__ns(arguments[0],true);
        var inx = arguments[0].lastIndexOf('.');
        if(inx >= 0) {
            var pack = eval(arguments[0].substring(0,inx));
            pack[arguments[0].substring(inx+1)] = arguments[1];
        } else {
            window[arguments[0]] = arguments[1];
        }

        if(typeof arguments[2] == 'object') 
            eval(arguments[0]+".prototype = arguments[2]");
    },
    cfgDefault:function(src, def){
        if(typeof src == 'undefined')
            return def;

        if(def == null) return src;
        if (typeof def != 'object')
            return src;

            if (def instanceof Array) {  
                if (!(src instanceof Array)) 
                return def;
            } else {
            if(typeof src != 'object' || src instanceof Array)
                return def;
        }

        for (var i in def)
            src[i] = arguments.callee(src[i], def[i]);
        
        return src;
    },
    loadScript:function(path){  
        var x = document.createElement('script');
        x.src=path;
        x.type = 'text/javascript';
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(x);
    },
    loadCss:function(path){
        var x = document.createElement('link');
        x.href=path;
        x.rel = 'stylesheet';
        x.type="text/css";
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(x);
    },
	addCss:function(cssString){
	    var style=document.createElement("style");  
		style.setAttribute("type", "text/css");
		if(style.styleSheet){// IE  
			style.styleSheet.cssText = cssString;  
		} else {// w3c  
			var cssText = document.createTextNode(cssString);  
			style.appendChild(cssText);  
		}  
		var head = document.head || document.getElementsByTagName("head")[0];
		head.appendChild(style);
		/*
		var heads = document.getElementsByTagName("head");  
		if(heads.length)  
			heads[0].appendChild(style);  
		else  
			document.documentElement.appendChild(style);  
		*/
	},
	inlineDisplayClass:function() {
		var own = this;
		if(own.__base_inline_style_mode__ & 1 > 0) 
			return 'inline';

		own.addCss('.inline {zoom:1;display:inline-block;*display:inline;vertical-align:top;}');
		//$('head').append('<style type="text/css">.stc-base-display-inline {zoom:1;display:inline-block;*display:inline;vertical-align:top;}</style>');

		own.__base_inline_style_mode__ |= 1;
		return 'inline';
	},
    Href:function() {
        var args = [];

        var result = window.location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g"));
        if(result != null){
                for(var i = 0; i < result.length; i++){
                var ele = result[i];
                var inx = ele.indexOf("=");
                args[ele.substring(1, inx)] = ele.substring(inx+1);
                }
        }
        return {
            getParameter:function(key){
                var rt = args[key];
                if(rt == undefined)
                    return null;
                return rt;
            }, 
            getAllParameter:function() {
                return args;
            }
        };
    },
	Storage:function(){
		return{
			set:function(key,value){
				if(!window.localStorage){
					UserData.setItem(key,value);
				}else{
					localStorage.setItem(key,value);
				}
			},
			get:function(key){
				if(!window.localStorage){
					return UserData.getItem(key);
				}else{
					return localStorage.getItem(key);
				}
			},
			remove:function(key){
				if(!window.localStorage){
					UserData.remove(key);
				}else{
					localStorage.removeItem(key);
				}
			}
		};
	}
};

var UserData = {
	userData : null,
	name : location.hostname,
	init:function(){
		if (!UserData.userData) {
			try {
				UserData.userData = document.createElement('INPUT');
				UserData.userData.type = "hidden";
				UserData.userData.style.display = "none";
				//UserData.userData.style.behavior = "url('#default#userData')";
				UserData.userData.addBehavior ("#default#userData");
				document.body.appendChild(UserData.userData);
				var expires = new Date();
				expires.setDate(expires.getDate()+365);
				UserData.userData.expires = expires.toUTCString();
			} catch(e) {
				return false;
			}
		}
		return true;
	},
	setItem : function(key, value) {
		if(UserData.init()){
			UserData.userData.load(UserData.name);
			UserData.userData.setAttribute(key, value);
			UserData.userData.save(UserData.name);
		}
	},
	getItem : function(key) {
		if(UserData.init()){
			UserData.userData.load(UserData.name);
			return UserData.userData.getAttribute(key);
		}
	},
	remove : function(key) {
		if(UserData.init()){
			UserData.userData.load(UserData.name);
			UserData.userData.removeAttribute(key);
			UserData.userData.save(UserData.name);
		}

	}
};

//put、post请求时,body体中的json被转换成键值对，而不是json对象，导致后台接收报错
//需要调用JSON.stringify方法将JSON对象转化下
//JSON.stringify在某些浏览器中不能找到JSON这个方法
//找不到时，将此对象重写
if(typeof JSON == 'undefined') {
    JSON = function (){
        var m = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' },
        s = {
            'boolean': function (x) { return String(x); },
            number: function (x) { return isFinite(x) ? String(x) : 'null'; },
            string: function (x) { if (/["\\\x00-\x1f]/.test(x)) {
                x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) { return c; }

                        c = b.charCodeAt();
                        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            },
            object: function (x) {
                if (x) {
                    var a = [], b, f, i, l, v;
                    if (x instanceof Array) {
                        a[0] = '[';
                        l = x.length;
                        for (i = 0; i < l; i += 1) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) { a[a.length] = ','; }
                                    a[a.length] = v;
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = ']';
                    } else if (x instanceof Object) {
                        a[0] = '{';
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) { a[a.length] = ','; }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                            }
                        }
                    }

                    a[a.length] = '}';
                } else {
                    return;
                }
                return a.join('');
            }
            return 'null';
        }
        };
    return {
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == 'string') {
                    return v;
                }
            }
            return null;
        },
        parse: function (text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + text + ')');
            } catch (e) {
                return false;
            }
        }
        };
    }();
}

var model = {};
var  base = new Base();
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
	*@description 内容加载效果图
	*/
	LOADING:{
		SIZE32:{'background-image':"url("+IMGRES_SERV_PATH1+"static/images/loading.gif)"},
		SIZE16:{'background-image':"url("+IMGRES_SERV_PATH1+"static/images/loading-16.gif)"}
	}
}

ICONS = {
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
}



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
base.clazz('base.component.Table', function(_cfg){
	this.cfg=base.cfgDefault(_cfg, {
		head:[],
		data:null,
		select_model:0, 	//0:不支持行选择（缺省) 1 单选， 2 多选
		over_model:false,	//在行间移动是否变色, 缺省为false
		empty_text:'record not found!',
		style:base.component.Table.style
	});
	var own = this;

	this.model_select = [];
	this.root = document.createElement('div');
	this.cols_cfg = [];

	this.head = document.createElement('div');
	$(this.root).append(this.head);

	this.content = document.createElement('div');
	$(this.root).append(this.content);

	this.emptyData= document.createElement('div');
	$(this.emptyData).html(this.cfg.empty_text);
	$(this.emptyData).css(this.cfg.style.empty_data);

	this.loading = document.createElement('div');
	$(this.loading).css(this.cfg.style.loading);

	var bi = base.string2Var('base_IMGRES.CMCC.LOADING.SIZE32');
	if(bi != null)
		$(this.loading).css(bi);

	$(this.loading).css({
		'border-left-width':'1px',
		'border-right-width':'1px',
		'border-bottom-width':'1px'
	});

	this.createHead(this.cfg.head);
	if(null != this.cfg.data)
		this.insertData(this.cfg.data);
}, {
	selectAll:function(){
		if(own.cfg.select_model != 2)
			return;
	},
	getSelected:function(){
		return own.model_select;
	},
	renderTo:function(target){
		$(target).append(own.root);
	},
	reflushHead:function(head){
		own.createHead(head);
	},
	setLoading:function(cmp) {
		own.setLoading(cmp);
	},
	reflushData:function(data,cmp){
		own.insertData(data,cmp);	
	}
},{
	insertLine:function(data, par, base, arr){
		var line = document.createElement('div');
		var rd_div = [];

		var g_col_inx = base;
		for(var i=0; i< data.length; i++){
			var ele = data[i];
			if(ele instanceof Array) {
				var tl = document.createElement('div');
				$(tl).addClass("base_display_inline");
				$(tl).css({'vertical-align':'top'});
				var col_num = 0;
				for(var inx=0; inx< ele.length; inx++){
					col_num = this.insertLine(ele[inx], tl, g_col_inx, arr);
				}
				g_col_inx += col_num;
				
				$(line).append(tl);
				continue;
			}

			var cell = document.createElement('div');
			if(g_col_inx==0) {
				$(cell).css(this.cfg.style.cell_first); 
				$(cell).css('border-left-width', '1px'); 
			}

			if(ele instanceof Object && 'function' == typeof data[i].render) {
				var w = 0;
				if('number' == typeof data[i].col_num && data[i].col_num > 1) {
					var rc = this.cols_cfg.length - g_col_inx;
					for ( var jj = 0;  jj < data[i].col_num && jj < rc; jj++) {
						w += this.cols_cfg[g_col_inx].width +1;
						g_col_inx ++;
					}
					w--;
				} else {
					w = this.cols_cfg[g_col_inx].width;
					g_col_inx ++;
				}

				var rd = data[i].render(data[i].data, w);
				rd_div.push(rd);
				
				$(cell).append(rd);
				$(cell).css(this.cfg.style.cell);
				$(cell).css('width', w+'px');
				$(cell).css({
					'border-right-width':'1px',
					'border-bottom-width':'1px'
				}); 
			} else if ('function' == typeof this.cols_cfg[g_col_inx].render){
				var rd = this.cols_cfg[g_col_inx].render(data[i], this.cols_cfg[g_col_inx].width);
				rd_div.push(rd);

				$(cell).append(rd);
				$(cell).css(this.cfg.style.cell);
				$(cell).css({
					'border-right-width':'1px',
					'border-bottom-width':'1px'
				});
				g_col_inx++;
			} else {
				$(cell).html(data[i]);
				$(cell).css(this.cfg.style.cell);
				$(cell).css({
					'border-right-width':'1px',
					'border-bottom-width':'1px'
				}); 
				$(cell).css('width', this.cols_cfg[g_col_inx].width+'px');
				g_col_inx++;
			}

			$(cell).css({'vertical-align':'top'});
			$(cell).addClass("base_display_inline");
			$(line).append(cell);

		}
		$(par).append(line);

		if(base == 0) {
			this.setOverEvent(line, rd_div);
			this.setSelectEvent(line, rd_div);
		}

		arr.push({rd:rd_div, line:line});
		return g_col_inx - base;
	},
	setSelectEvent:function(line,rd){
		if(this.cfg.select_model != 1 && this.cfg.select_model != 2) return;

		var own = this;
		$(line).click(function(){
			var flag = false;
			var tmp = [];
			for(var i = 0; i < own.model_select.length; i++) {
				if (own.model_select[i] == line) {
					flag = true;
				}else 
					tmp.push(own.model_select[i]);
			}

			if(flag){
				own.model_select =  tmp;
				own.lineSetColor(line, rd, '#eaf5fc', true)
				return;
			} else {
				if(own.cfg.select_model == 1) {
					for(var j = 0; j < own.model_select.length; j++) {
						own.lineSetColor(own.model_select[j], rd, null, true)
					}
					own.model_select = [];
				}
				own.lineSetColor(line, rd, '#e0ffcc', true);
				own.model_select.push(line);
			}
		});
	},
	lineSetColor:function(ele, rd, color, flag){
		var own = this;
		
		if(null == color){
				$(ele).css('background-color', $(ele).attr('background-color'));
		} else {
			if(!Boolean(flag))
				$(ele).attr('background-color', $(ele).css('background-color'));
			$(ele).css('background-color', color);
		}

		for(var i = 0; i< rd.length; i++) {
			if(rd[i] == ele)
				return;
		}

		var fun = arguments.callee;
		$(ele).children().each(function(){
			fun.call(own, this, rd, color, flag);
		});
	},
	setOverEvent:function(line,rd){
		if(this.cfg.over_model == false) return;

		var own = this;
		$(line).hover(function(){
			for(var i = 0; i < own.model_select.length; i++) {
				if(own.model_select[i] == line) {
					return;
				}
			}

			$(line).children().each(function(){
				own.lineSetColor(this, rd, '#eaf5fc')
			});
		}, function(){
			for(var i = 0; i < own.model_select.length; i++) {
				if(own.model_select[i] == line) {
					return;
				}
			}

			$(line).children().each(function(){
				own.lineSetColor(this, rd, null);
			});
		});
	},
	insertData:function(data,cmp){
		$(this.content).empty();
		var w = 0;
		for(var i=0; i<this.cols_cfg.length;i++)
			w += this.cols_cfg[i].width;
		w += this.cols_cfg.length - 2;

		if(data.length == 0)  {
			$(this.emptyData).css('width', w+'px');
			$(this.content).append(this.emptyData);
			return;
		}
		$(this.root).css('width', w+3+'px');

		var own = this;
		$().ready(function(){
			var arr = [];
			for(var i=0; i< data.length; i++){
				own.insertLine(data[i], own.content, 0, arr);
			}
			
			own.calculateHeight(arr, 0, cmp);
		});
	},
	calculateHeight:function(arr, inx, cmp) {
		var own = this;
		if(inx >= arr.length) {
			if(typeof cmp == "function")
				cmp();
			return;
		}

		$().ready(function(){
			var node = arr[inx];
			
			var mh = 0;
			for( var ix = 0; ix<node.rd.length; ix++ ){
				if( mh <= $(node.rd[ix]).height() )
					mh = $(node.rd[ix]).height();
			}
		
			$(node.line).children().each(function(){
				if(mh < $(this).height()) 
					mh = $(this).height();
			});
			
			$(node.line).children().each(function(){
						$(this).css({'height': mh+'px','line-height': mh+'px'});
						$(this).children().trigger('base_resize');
			});	
		
			$().ready(function(){
				var p = $(node.line).parent();

				var h = 0;
				var last = null;
				p.children().each(function(){
					h+=$(this).height();
					last = this;
				});
				h -= 1;
				
				if(last == node.line && p[0] != own.content){
					p.css({'height': h+'px','line-height': h+'px'});
				}
						
				own.calculateHeight(arr, inx+1,cmp);	
			});		
		});
	},
	createHead:function(def){
		this.cfg.head = def;
		if(typeof this.head != 'undefined') {
			$(this.head).empty();
			this.createHeadContent(def);
		} else {
			this.createHeadContent(def);
		}
		this.setLoading();
	},
	createHeadContent:function(def) {
		for(var i=0; i< def.length; i++){
			var ele = def[i];	

			var width = 40;
			if(typeof ele.width != 'undefined')
				width=ele.width;
			this.cols_cfg[i] = {width:width, render:ele.render};

			var tmp = document.createElement('div');
			if(typeof ele.head_render == 'function') {
				$(tmp).append(ele.head_render(ele.data, width));
			} else
				$(tmp).html(ele.name);

			$(tmp).css('width', width+'px');
			if(i==0) { 
				//eg.head_border:"1px solid #0085D0"
				if(typeof ele.head_border !="undefined"){
					$(tmp).css('border-left',ele.head_border);//自渲染表头边框
				}else{
					$(tmp).css(this.cfg.style.head_first);
				}
				$(tmp).css('border-left-width', '1px'); 
			}
			$(tmp).css(this.cfg.style.head);
			if(typeof ele.head_border !="undefined"){//自渲染表头边框
				$(tmp).css('border-top',ele.head_border);
				$(tmp).css('border-bottom',ele.head_border);
				$(tmp).css('border-right',ele.head_border);
			}else{
				$(tmp).css(this.cfg.style.head_border);
			}

			$(tmp).css({
				'border-top-width':'1px',
				'border-right-width':'1px',
				'border-bottom-width':'1px'
			}); 

			$(tmp).css({'vertical-align':'top'});
			$(tmp).addClass("base_display_inline");

			$(this.head).append(tmp);
		}
	},
	setLoading:function(cmp){
		var w = 0;
		for(var i=0; i<this.cols_cfg.length;i++)
			w += this.cols_cfg[i].width;
		w += this.cols_cfg.length - 1;

		$(this.loading).css('width', w+'px');
		$(this.content).empty();
		$(this.content).append(this.loading);
		
		$(document).ready(function(){
			if(typeof cmp == "function") cmp();
		});
	}
});

//table规范样式
base.component.Table.style = {
		head: {
			overflow:'hidden',
			height:'32px',
			'line-height':'32px',
			'background-color':'#FCE3C9',
			color:'#333333',
			'font-size':'12px',
			'text-align':'center'
		},
		head_border:{
			'border-top':'1px solid #DADADA',
			'border-bottom':'1px solid #DADADA',
			'border-right':'1px solid #DADADA'
		},
		head_first:{
			'border-left':'1px solid #DADADA'
		},
		cell:{
			height:'32px',
			'line-height':'32px',
			'background-color':'white',
			'border-bottom':'1px solid #DADADA',
			'border-right':'1px solid #DADADA',
			'text-align':'center',
			overflow:'hidden'
		},
		cell_first: {
			'border-left':'1px solid #DADADA'
		},
		empty_data : {
			'font-color':'gray',
			height:'40px',
			'line-height':'40px',
			'background-color':'white',
			'border-bottom':'1px solid #DADADA',
			'border-right':'1px solid #DADADA',
			'border-left':'1px solid #DADADA',
			'text-align':'center'
		},
		loading : {
			'background-position':'center',
			'background-repeat':'no-repeat',
			height:'200px',
			'border-left':'1px solid #DADADA',
			'border-bottom':'1px solid #DADADA',
			'border-right':'1px solid #DADADA',
			'background-color':'white'
		}
	};

/*
text:显示文本
cb_click:按钮可用时的 回调函数
style:样式
*/
base.clazz('base.component.Button',function(_cfg) {
    this.cfg = base.cfgDefault(_cfg, {
        text: '',
        type: null,
        cb_click: null,
		style:base.component.Button.style.normal,
		sizes:base.component.Button.style.sizes
    });
    var own = this;
    this.enable_btn = null;
    this.disable_btn = null;
    this.root = this.createBtn();
	own.initSize();
	var _div = common.toFillet(own.root,true);//转换为圆角矩形

    return {
        getRoot: function() {
            return _div;
        },
        getBtn: function() { //得到可用的button 可进行绑定事件等更多处理
            return own.enable_btn;
        },
        getDisabled: function() {
            return own.disable_btn;
        },
        disabled: function(_flag, text) { //使按钮不可用 若text存在改变按钮文案(仅改变按钮不可用时的文案)
            own.disabled(_flag, text);
        }
    }
},{
	initSize:function(){
		var own = this;
		var sizes = own.cfg.sizes;
		var len = own.cfg.text.length;
		var size_css = sizes[own.cfg.type];
		if(null == size_css ){
			switch(len){
				case 2:size_css = sizes[0];break;
				case 4:size_css = sizes[1];break;
				case 6:size_css = sizes[2];break;
				default:size_css = sizes['other'];break; 
			}
		}
		$(own.root).css(size_css);
	},
    disabled: function(_flag, text) {
        var own = this;
        if (!_flag) {
            $(own.enable_btn).show();
            $(own.disable_btn).html(own.cfg.text);
        } else {
            if (null != text) {
                $(own.disable_btn).html(text);
            } else {
                $(own.disable_btn).html(own.cfg.text);
            }
            $(own.enable_btn).hide();
        }
    },
    createBtn: function() {
        var own = this;
        var root = document.createElement('div');
        $(root).css(this.cfg.style.root);
        $(root).addClass(base.inlineDisplayClass);
        own.enable_btn = own.createEnabledDiv();
        own.disable_btn = own.createDisabledDiv();
        $(root).append(own.enable_btn).append(own.disable_btn);
        return root;
    },
    createEnabledDiv: function() {
        var own = this;
        var _btn = document.createElement('div');
        $(_btn).html(own.cfg.text);
        $(_btn).css(own.cfg.style.enabled);
        $(_btn).addClass(base.inlineDisplayClass);
        $(_btn).hover(function() {
            $(_btn).css(own.cfg.style.hover);
        },
        function() {
            $(_btn).css(own.cfg.style.enabled);
        });
        var cb_click = own.cfg.cb_click;
        if ('function' == typeof(cb_click)) {
            $(_btn).click(function() {
                cb_click();
            });
        }
        return _btn;
    },
    createDisabledDiv: function() {
        var _btn = document.createElement('div');
        $(_btn).html(this.cfg.text);
        $(_btn).css(this.cfg.style.disabled);
        $(_btn).addClass(base.inlineDisplayClass);
        return _btn;
    }
});


base.component.Button.style = {
	normal:{//按钮样式1
		root:{
			"font-weight":"bold",
			"color":"#fff",
			'font-weight':'bolder',
			'textAlign': 'center',
			'overflow': 'hidden'
		},
		enabled: {
			"backgroundColor":"#0085D0",
			'cursor': 'pointer',
			'width':'100%',
			'height':'100%'
		},
		hover: {
			"backgroundColor":"#00ade5"
		},
		disabled: {
			"backgroundColor":"#A4A4A4",
			'cursor':'default',
			'width':'100%',
			'height':'100%'
		}
	},
	bright:{
		root:{
			"color":"#fff",
			"font-weight":"bolder",
			'textAlign': 'center',
			'overflow': 'hidden'
		},
		enabled: {
			"backgroundColor":"#8EC31E",
			'cursor': 'pointer',
			'width':'100%',
			'height':'100%'
		},
		hover: {
			"backgroundColor":"#8eeb33"
		},
		disabled: {
			"backgroundColor":"#A4A4A4",
			'cursor':'default',
			'width':'100%',
			'height':'100%'
		}
	},
	gray:{
		root:{
			//"font-size":stc_global.font.size_12,
			//"font-family":stc_global.font.family,
			"color":"#fff",
			"font-weight":"bolder",
			'textAlign': 'center',
			'overflow': 'hidden'
		},
		enabled: {
			"backgroundColor":"#A4A4A4",//"#8EC31E"
			'cursor': 'pointer',
			'width':'100%',
			'height':'100%'
		},
		hover: {
			"backgroundColor":"#DADADA"
		},
		disabled: {
			"backgroundColor":"#A4A4A4",
			'cursor':'default',
			'width':'100%',
			'height':'100%'
		}
	},
	sizes:{//按钮尺寸
		'0': {//两字
			'width': '60px',
			'height': '30px',
			'line-height': '30px'
		},
		'1': {//四字
			'width': '90px',
			'height': '30px',
			'line-height': '30px'
		},
		'2': {//六字
			'width':'120px',
			'height':'30px',
			'line-height':'30px'
		},
		//非标准按钮
		'other':{//其它
			'padding':'15px'
		}
	}
};
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
/**
 * @author echd
 * @description Float类型运算公共方法
 * @version 1.0
 */
base.clazz('base.utils.FloatOperation',function() {
    var own = this;
    return {
		 //float加法
        floatAdd: function(arg1, arg2) {
            return own.floatAdd(arg1, arg2);
        },
        //float减法
        floatSubtract: function(arg1, arg2) {
            return own.floatSubtract(arg1, arg2);
        },
        //float乘法
        floatMultiply: function(arg1, arg2) {
            return own.floatMultiply(arg1, arg2);
        },
        //float除法
        floatDivide: function(arg1, arg2) {
            return own.floatDivide(arg1, arg2);
        },
		//float向下取整 precision:保留位数
		floatFloor:function(num,precision){
			return own.floatFloor(num,precision);
		},
		//float向上取整 precision:保留位数
		floatCeil:function(num,precision){
			return own.floatCeil(num,precision);
		},
		//float四舍五入 precision:保留位数
		floatRound:function(num,precision){
			return own.floatRound(num,precision);
		},
		//四舍五入
		formatCurrency: function(num) {
			return own.formatCurrency(num);
		}
	}
},{
	//获取参数精度，如果为整数则精度为0  
	_getPrecision: function(arg) {
		if (arg.toString().indexOf(".") == -1) {
			return 0;
		} else {
			return arg.toString().split(".")[1].length;
		}
	},
	//获取小数的整数形式  
	_getIntFromFloat: function(arg) {
		if (arg.toString().indexOf(".") == -1) {
			return arg;
		} else {
			return Number(arg.toString().replace(".", ""));
		}
	},
	//乘法  
	floatMultiply: function(arg1, arg2) {
		var precision1 = this._getPrecision(arg1);
		var precision2 = this._getPrecision(arg2);
		var tempPrecision = 0;

		tempPrecision += precision1;
		tempPrecision += precision2;
		var int1 = this._getIntFromFloat(arg1);
		var int2 = this._getIntFromFloat(arg2);
		return (int1 * int2) /Math.pow(10, tempPrecision);
	},
	//加法  
	floatAdd: function(arg1, arg2) {
		var precision1 = this._getPrecision(arg1);
		var precision2 = this._getPrecision(arg2);
		var temp = Math.pow(10, Math.max(precision1, precision2));
		return (this.floatMultiply(arg1, temp) + this.floatMultiply(arg2, temp)) / temp;
	},
	//减法  
	//arg1 被减数  
	//arg2 减数  
	floatSubtract: function(arg1, arg2) {
		var precision1 = this._getPrecision(arg1);
		var precision2 = this._getPrecision(arg2);
		var temp = Math.pow(10, Math.max(precision1, precision2));
		return (this.floatMultiply(arg1, temp) - this.floatMultiply(arg2, temp)) / temp;
	},
	//除法  
	//arg1 被除数  
	//arg2 除数  
	floatDivide: function(arg1, arg2) {
		var precision1 = this._getPrecision(arg1);
		var precision2 = this._getPrecision(arg2);
		var int1 = this._getIntFromFloat(arg1);
		var int2 = this._getIntFromFloat(arg2);
		var result = (int1 / int2) * Math.pow(10, precision2 - precision1);
		return result;
	},
	//float向下取整 
	//num:待处理的数 precision:保留位数
	floatFloor:function(num,precision){
		var own = this;
		if (num == null || isNaN(num)) {
			return "";
		}
		precision = (null == precision ? 2:precision);
		var t1 = own.floatMultiply(num,Math.pow(10,precision));//扩大10的precision次方
		var t2 = parseInt(Math.floor(t1));//去除小数部分
		var result = own.floatDivide(t2,Math.pow(10,precision));//转换为小数
		return result.toFixed(precision);
	},
	//float向上取整 
	//num:待处理的数 precision:保留位数
	floatCeil:function(num,precision){
		var own = this;
		if (num == null || isNaN(num)) {
			return "";
		}
		precision = (null == precision ? 2:precision);
		var t1 = own.floatMultiply(num,Math.pow(10,precision));//扩大10的precision次方
		var t2 = parseInt(Math.ceil(t1));//去除小数部分
		var result = own.floatDivide(t2,Math.pow(10,precision));//转换为小数
		return result.toFixed(precision);
	},
	//float四舍五入
	//num:待处理的数 precision:保留位数
	floatRound:function(num,precision){
		var own = this;
		if (num == null || isNaN(num)) {
			return "";
		}
		precision = (null == precision ? 2:precision);
		var t1 = own.floatMultiply(num,Math.pow(10,precision));//扩大10的precision次方
		var t2 = parseInt(Math.round(t1));//去除小数部分
		var result = own.floatDivide(t2,Math.pow(10,precision));//转换为小数
		return result.toFixed(precision);
	},
	/**
	 * @description 将数值四舍五入（保留2位小数)后格式化成金额形式
	 * @param {String} num数值
	*/
    formatCurrency: function(num) {
        if (num == null || typeof num == 'undefined' || num == "" || isNaN(num)) {
            return "";
        } else {
            num = num.toString().replace(/\$|\,/g, '');
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10) cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) 
				num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
            return (((sign) ? '': '-') + num + '.' + cents);
        }
    }
});
//重写toFixed 两位小数后会出现bug
//Number.prototype.toFixed  =   function ( exponent)
//{ 
    //return  parseInt( this *  Math.pow(  10 , exponent)  +   0.5 )*Math.pow(10,-exponent);
//}
/**
 * @author echd
 * @description 格式化日期类
 * @version 1.0
 */
base.clazz('base.utils.FormartDate',function(_cfg) {
    var own = this;
    return {
        formartStrDate1:function(str) { //将20131111格式转化为2013-11-11
            return own.formartStrDate1(str)
        },
        formartStrDate2:function(str, flag) { //将20131111132632 转化为年月日(flag = s)或年月日时分秒
            return own.formartStrDate2(str, flag);
        },
        formartStr2Date:function(str) { //字符串转化为日期类型
            return own.formartStr2Date(str);
        },
		getTwoMon:function(mon) { //得到两位的月份
            return own.getTwoMon(mon);
        },
        getTwoDate:function(d) { //得到两位的月份
            return own.getTwoDate(d);
        },
		getFullTime:function(d){ //根据时间戳得到20131111132632格式日期字符串
			return own.formatFullTime(d);
		}
    }
},
{
    /**
	 * @description 将20131111格式转化为2013-11-11格式
	 * @param {String} str数值
	 */
    formartStrDate1:function(str) {
        if (str != null && typeof str != 'undefined' && str.length > 8) {
            str = str.substr(0, 8);
        }
        var reg = new RegExp("^[0-9]{8}$");
        if (reg.test(str)) {
            var d = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2);
            return d;
        } else {
            return str;
        }
    },
    /**
	 * @description 将20131111132632 转化为年月日(flag = s)或年月日时分秒
	 * @param {String} str数值
	 */
    formartStrDate2:function(str, flag) {
        var len = str.length;
        if (len < 14) {
            for (var i = 0; i < (14 - len); i++) {
                str += "0";
            }
        }
        var reg = new RegExp("^[0-9]{14}$");
        if (reg.test(str)) {
            var d = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2) + ":" + str.substr(12, 2);
            if (flag == 's') {
                d = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2);
            }
            return d;
        } else {
            return str;
        }
    },
    /**
	 * @description 字符串转化为日期类型
	 * @param {String} str数值
	 */
    formartStr2Date:function(str) {
        var date = new Date();
        var reg = new RegExp("^[0-9]{14}$");
        if (reg.test(str)) {
            date.setFullYear(parseInt(str.substr(0, 4)));
            date.setMonth(parseInt(str.substr(4, 2)) - 1);
            date.setDate(parseInt(str.substr(6, 2)));
            date.setHours(parseInt(str.substr(8, 2)));
            date.setMinutes(parseInt(str.substr(10, 2)));
            date.setSeconds(parseInt(str.substr(12, 2)));
            date;
        }
        return date;
    },
    /**
	 * @description 得到两位的月份
	 * @param {String} mon数值
	 */
    getTwoMon:function(mon) {
        var realmon = mon + 1;
        var returnmon;
        if (realmon < 10) {
            returnmon = "0" + realmon;
        } else {
            returnmon = realmon;
        }
        return returnmon;
    },
    /**
	 * @description 得到两位的月份
	 * @param {String} d数值
	 */
    getTwoDate:function(d) {
        var rd;
        if (d < 10) {
            rd = "0" + d;
        } else {
            rd = d;
        }
        return rd;
    },
	formatFullTime:function(d){
		var date = new Date();
		date.setTime(d);
		var year = date.getFullYear();
		var mon = date.getMonth();
		mon++;
		if(mon<10)
			mon = "0"+mon;
		var day = date.getDate();
		if(day<10)
			day = "0"+day;
		var hour = date.getHours();
		if(hour<10)
			hour = "0"+hour;
		var minu = date.getMinutes();
		if(minu<10)
			minu = "0"+minu;
		var seconds = date.getSeconds();
		if(seconds<10)
			seconds = "0"+seconds;
		return year+mon+day+hour+minu+seconds;
	}
});
base.clazz('base.utils.Tools',function(_cfg) {
	var own =this;
    return {
        /*深度复制对象*/
        cloneObj: function(obj1) {
            return own.cloneObj(obj1);
        },
        /** 获取传入字符串的字节长度 **/
        getByteLen: function(val) {
            return own.getByteLen(val);
        },
        /**特殊字符转义*/
        htmlEncode: function(text) {
            return own.htmlEncode(text);
        },
        /**特殊字符反转义*/
        htmlDecode: function(text) {
            return own.htmlDecode(text);
        },
        /**光标定位到文本框指定位置 */
        setSelection: function(editor, pos) {
            own.setSelection(editor, pos);
        },
        //按照不同的模式把数据转换为数组
        toArray: function(data, schema) {
            return own.toArray(data, schema);
        }
    }
},{
    /*深度复制对象*/
    cloneObj: function(obj1) {
        function F() {};
        F.prototype = obj1;
        var f = new F();
        for (var key in obj1) {
            if (typeof obj1[key] == "object") {
                f[key] = this.cloneObj(obj1[key])
            }
        }
        return f;
    },
    /**
	@description 获取传入字符串的字节长度 
	@param {String} val 需计算长度的字符串  (注意编码需为UTF-8)
	**/
    getByteLen: function(val) {
        val = val.replace(/(^\s*)|(\s*$)/g, "");
        var cArr = val.match(/[^\x00-\xff]/ig);
        var byteLen = val.length + (cArr == null ? 0 : cArr.length);
        return byteLen;
    },

    /**
	 * @description 特殊字符转义
	 * @param {String} text 需要被转义检查的字符串
	 * @return {String} 转义后的字符串
	 */
    htmlEncode: function(text) {
        if (typeof text != "string") text = text.toString();
        text = text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return text;
    },
    /**
	 * @description 特殊字符反转义
	 * @param {String} 需要被反转义检查的字符串
	 * @return {String} 反转义后的字符串
	 */
    htmlDecode: function(text) {
        if (typeof text != "string") text = text.toString();
        text = text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return text;
    },
    /**
	 * @description 光标定位到文本框指定位置 
	 * @param {Object} editor文本所在的页面元素，如某文本框，dom对象
	 * @param　{num} pos要定位的位置
	 */
    setSelection: function(editor, pos) {
        try {
            if (editor.setSelectionRange) { //火狐浏览器兼容的写法
                editor.focus();
                editor.setSelectionRange(pos, pos);
            } else if (editor.createTextRange) {
                var textRange = editor.createTextRange();
                textRange.collapse(true);
                textRange.moveEnd("character", pos);
                textRange.moveStart("character", pos);
                textRange.select();
            }
        } catch(e) {}
    },
    //按照不同的模式把数据转换为数组
    toArray: function(data, schema) {
        var line = [];
        for (var i = 0; i < data.length; i++) {
            var ele = data[i];
            var rec = [];
            for (var j = 0; j < schema.length; j++) {
                var sc = schema[j];
                if (typeof sc == 'object') {
                    if ('function' == typeof sc.__analy_line) {
                        rec = sc.__analy_line(ele);
                    } else rec.push(arguments.callee(ele[sc.__child], sc.__data));
                } else rec.push(ele[sc]);
            }
            line.push(rec);
        }
        return line;
    }
});