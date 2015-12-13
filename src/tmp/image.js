//图片处理
var Image = function(){
    var own = this;
    own.config = {
        error_url:'',
        loadingStyle:{
            'background':'url('+RELATIVE_PATH+'static/images/loading.gif) no-repeat center'
        }
    }

    return {

    }
}

Image.prototype = {
    create:function(url,width,height){
        var own = this;
        var _img = document.createElement("img");
        if(width){
            _img.style.width = width + 'px';
        }
        if(height){
            _img.style.height = height + 'px';
        }
        //$(_img).attr('width',width).attr('height',height).css({'width':width+'px','height':height+'px'}).attr('relSrc',url);
        _img.onabort = function(){
            _img.src = own.cfg.error_url;
        }

        _img.onerror = function(){
            if( _img.src == own.cfg.error_url){
                return ;
            }
            _img.src = own.cfg.error_url;
        }

        var style = own.cfg.loadingStyle;
        if('string' == typeof style){

        }else {
            for (var k in style) {
                _img.style[k] = style[k];
            }
        }

        if (undefined == url || null == url) {
            _img.src = own.cfg.error_url;
        }else{
            _img.src = url;
        }
        return _img;
    }
    //根据width和height从imageData中选取合适的url
    //getUrl:function( imgData,width,height){
    //    var getUrl = function(list){
    //        list.sort(function(a,b){
    //            return compare(a) - compare(b);
    //        });
    //        for(var k in list){
    //            var t = compare(list[k]);
    //            if(t>0){
    //                return list[k];
    //            }
    //        }
    //        return list[list.length-1];//最大一张图
    //    };
    //
    //    var compare = function(url){
    //        var attr = getAttr(url);
    //        return (attr[0] - width);
    //    };
    //
    //    var getAttr = function(url){//根据URL获取图片参数宽高缩放比
    //        var args = [];
    //        var result = url.match(new RegExp("_[0-9]+","g"));
    //        if(result != null){
    //            for(var k in result){
    //                var t = result[k]+'';
    //                var n = t.replace(/\_/g,'');
    //                args[k] = parseInt(n);
    //            }
    //        }
    //        return args;
    //    };
    //    var list = imgData.imageUrlList || [];
    //    var imgUrl = getUrl(list);
    //}
}