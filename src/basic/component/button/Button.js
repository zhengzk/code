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