base.clazz('module.resume.Table',function(_cfg){
		this.cfg = base.cfgDefault(_cfg,{
		
		});

		var own = this;
		own.root = document.createElement('div');
		return {
			getRoot:function(){
				return own.root;
			},
			reflushData:function(data){
				own.reflushData(data)
			},
			init:function(){
				own.initHeight();
			}
		};
	},{
		initHeight:function(){
			var own = this;
			$(own.root).children().each(function(){
				var _l = $(this).children().eq(0);
				var _r = $(this).children().eq(1);
				_l.css({'height':_r.outerHeight()+'px'});
			})
		},
		reflushData:function(data){
			var own = this;
			data = data||[];
			$(own.root).empty();
			for(var k in data){
				$(own.root).append(own.createCol(data[k]));
			}
		},
		createCol:function(data){
			var own = this;
			var _div = document.createElement('div');
			var _l = own.createLeft(data.title);
			var _r = own.createRight(data.data);
			$(_div).append(_l).append(_r).ready(function(){
				$(_l).css({'height':$(_r).outerHeight()+'px'});
			});
			return _div;
		},
		createLeft:function(text){
			text = text || '';
			var _div = document.createElement('div');
			var _col = document.createElement('div');
			$(_col).css({'margin':'0px 10px'}).html(text);
			$(_div).append(_col).addClass('inline').css({
				'border-right':'2px solid #0099FF',
				'padding':'5px 0px 0px'
			});
			return _div;
		},
		createRight:function(data){
			var own = this;
			data = data || [];
			var _div = document.createElement('div');
			$(_div).addClass('inline').css({'padding':'5px 0px 0px'});

			var _left = document.createElement('div');
			$(_left).addClass('inline').css({
				'border-top':'2px solid #0099FF',
				'width':'15px','height':'10px',
				'margin':'16px 10px 0px 0px'
			});

			var _right = document.createElement('div');
			$(_right).addClass('inline');

			for(var k in data){
				var _col = own.createRightCol(data[k]);
				$(_right).append(_col);
			}
			$(_div).append(_left).append(_right);
			return _div;

		},
		createRightCol:function(data){
			var _col = document.createElement('div');
			$(_col).html(data);
			return _col;
		}
	});

    module.resume.Table.Data = [{
        title:'1990',
        data:['出生',
            '小学 ——> 初中 ——> 高中  ',
            '......']
    },{
        title:'2009',
        data:['进入新疆农业大学计算机与信息工程学院学习;',
            '学习计算机基础知识,参加学生会等;',
            '积极参加各种活动(ERP沙盘模拟等);']
    },{
        title:'2011',
        data:['获得第六届全国信息技术应用水平大赛(ITAT)C语言程序设计组三等奖;',
            '在何杰团体摄影店进行社会实践;',
            '取得”普通话“、”教育学“、”心理学“等课程证书;']
    },{
        title:'2012',
        data:['获得2011-2012年度国家励志奖学金;',
            '获得2011-2012年度中粮集团二等奖学金',
            '获得2011-2012年度三好学生标兵荣誉称号;',
            '获得Ubase数据库管理系统设计大赛三等奖;',
            '获得迎校庆网页设计大赛三等奖;',
            '参加暑期大学生三下乡社会实践及IT行业现状调研活动;',
            '参加SYB大学生创业培训并获得证书;']
    },{
        title:'2013',
        data:['参加达内科技教育集团北京中关村中心JAVA软件技术培训;',
            '毕业 -> 正式步入IT行业']
    }];