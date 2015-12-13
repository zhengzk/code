base.clazz('base.ui.Common',function() {
    var own = this;
    return {
		//转换成圆角
		toFillet:function(_ele,_flag){
			return own.toFillet(_ele,_flag);
		}
    }
},
{
	//为元素添加圆角的公共方法
	//_ele:需要添加圆角的元素 
	//_flag = true 时为元素本身添加圆角  默认:在元素外包装一层div 给div加圆角
	//return 添加圆角后的元素  _flag = true 时返回 _ele  默认:返回包含元素的_div
	toFillet:function(_ele,_flag){
		var own = this;
		var _div = _ele;
		if(!_flag){
			 _div = document.createElement('div');
			$(_div).append(_ele);
		}
		$(_div).css({'position':'relative'});
		$(_div).addClass(base.inlineDisplayClass);
		own._addCorner(_div);
		return _div;
	},
	_addCorner:function(_div){//为_div添加四个角
		var own = this;
		var _lt = own._createCorner();//左上角
		$(_lt).css({'top':'0px','left':'0px'});
		var _rt = own._createCorner();//右上角
		$(_rt).css({'top':'0px','right':'0px'});
		var _lb = own._createCorner();//左下角
		$(_lb).css({'bottom':'0px','left':'0px'});
		var _rb = own._createCorner();//右下角
		$(_rb).css({'bottom':'0px','right':'0px'});
		$(_div).append(_lt).append(_rt).append(_lb).append(_rb);
	},
	_createCorner:function(){//创建一个1x1的div
		 var _div = document.createElement('div');
		 $(_div).html('&nbsp;').css({
			 'position':'absolute',
			 'width':'1px',
			 'height':'1px',
			 'line-height':'1px',
			 'background':'white',
			  'overflow':'hidden'
		 });
		 return _div;
	}
});
var common = new base.CommonFunction();  