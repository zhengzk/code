/**
 * Created by admin on 2015/1/22.
 */

/**
 * 公用js方法
 */
//去除空格
function trim(str) {
    if('string' != typeof str){ //非string 不做处理
        return ;
    }
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return str.replace(reExtraSpace, "$1");
}
//function ltrim(s){ return s.replace( /^(\s*|　*)/, ""); }
//function rtrim(s){ return s.replace( /(\s*|　*)$/, ""); }
//function trim(s){ return ltrim(rtrim(s));}

//获取传入字符串的字节长度
function getByteLen(val) {
    val = val || '';
    val = val.replace(/(^\s*)|(\s*$)/g, "");
    var cArr = val.match(/[^\x00-\xff]/ig);
    var byteLen = val.length + (cArr == null ? 0 : cArr.length);
    return byteLen;
}

//判断字符
//是否为空
function isEmpty(str){
    var result = false;
    if(str == "" || str == null || typeof(str) == 'undefined'){
        result = true ;
    }
    return result;
}

//是否为A-Za-z英文字母
function isLetters( str ){
    var re=/^[A-Za-z]+$/;
    if (str.match(re) == null)
        return false;
    else
        return true;
}

//是否为邮箱
function isEmail(str){
    var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (re.test(str) != true) {
        return false;
    }else{
        return true;
    }
}

//是否为手机号
function isPhone(value) {
    var patrn = /^(13|18|14|15|19)\d{9}$/;
    //var patrn = /^(([1][3][456789])|([1][5][0126789])|([1][8][23478])|([1][4][7])|([2][0][1]))\d{8}$/;
    if (value.search(patrn) == -1) {
        return false;
    }
    return true;
}

//是否为整数
function isNumber( chars ) {
    var re=/^\d*$/;
    if (chars.match(re) == null)
        return false;
    else
        return true;
}

//是否为浮点数
function isFloat( str ) {
    for(var i=0;i<str.length;i++)  {
        if ((str.charAt(i)<"0" || str.charAt(i)>"9")&& str.charAt(i) != '.'){
            return false;
        }
    }
    return true;
}

//输入框限制
//只能输入整数
function toInteger(obj,e) {
    var e = e ||window.event;
    if(e.keyCode == 8||e.keyCode == 37){
        return ;
    }
    obj.value = obj.value.replace(/[^\d]/g, ""); //清除“数字"以外的字符
    obj.value = obj.value.replace(/^[0]{1,}/g, "");//验证第一个字符是数字而不是0
}

//只能输入数字  判断不相等 避免每次都替换
function toNumber(obj) {
    var str = obj.value;
    var str1 = str.replace(/[^\d.]/g, "");//清除“数字”和“.”以外的字符
    if(str != str1){
        str = str1;
        obj.value = str;
    }

    str1 = str.replace(/^\./g, "");//验证第一个字符是数字而不是.
    if(str != str1){
        str = str1;
        obj.value = str;
    }

    str1 = str.replace(/\.{2,}/g, ".");//只保留第一个. 清除多余的.
    if(str != str1){
        str = str1;
        obj.value = str;
    }
    //obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}

//只能输入中文和英文和数字
function toText(obj){
    var str = obj.value;
    var str1 = str.replace(/[^\u4e00-\u9fa5a-zA-Z\d]/g,'');
    if(str != str1){
        str = str1;
        obj.value = str;
    }
}

//只能输入邮箱
function toEmail(obj){
    var str = obj.value;
    var str1 = str.replace(/[^_@.\-a-zA-Z\d]/g,''); //限制只能输入数字、英文和 -。@_
    if(str != str1){
        str = str1;
        obj.value = str;
    }

    str1 = str.replace(/^[_@.\-]/g,"");//验证第一个字符不是特殊字符
    if(str != str1){
        str = str1;
        obj.value = str;
    }

    str1 = str.replace(/@{1}[_@.\-]/g,"@");//去除@和_@.-的组合
    if(str != str1){
        str = str1;
        obj.value = str;
    }

    //obj.value = obj.value.replace(/[_@.\-]{1}@/g,"");//去除_@.- 和@的组合 替换内容不确定 //可借助match实现 返回一个数组
}

