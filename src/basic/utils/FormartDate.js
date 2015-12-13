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