var getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}
var setCookie = function (name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
var delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1000);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}
var getQueryString = function (field, url) {
	var href = url ? url : window.location.href;
	var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
	var string = reg.exec(href);
	return string ? string[1] : null;
}
var validateUser = function(callback){
    $service.com_sifayun_smartcourt_sfpj_api_IUserRightsService.userIdentity(function(data){
        if(data.code == 200){
            callback(data.data);
        }else{
			 window.location.href = avalon.vmodels['topbanner'].platformBaseUrl+'#!/acc/p/pInfo';
            // showPop('警告','no','验证用户请求出错....请联系客服')
        }
    },function(err){
        showPop('警告','no','网络请求出错')
    })
}
/**
 * 小弹窗
 * title
 * icon yes正确、no错误、notice提示
 * info 内容
 * 
 * @return {[type]} [description]
 */
var showPop = function(title,icon,info,callback){
    avalon.vmodels['msg-pop-box'].isShow = true;
    avalon.vmodels['msg-pop-box'].title = title;
    avalon.vmodels['msg-pop-box'].icon = icon;
    avalon.vmodels['msg-pop-box'].info = info;
    avalon.vmodels['msg-pop-box'].onConfirm = function(){
        avalon.vmodels['msg-pop-box'].isShow =false;
        $('.pop-mask').hide();
        if(callback)callback();
    };
}
/**
 * 
 * 大弹窗
 * icon     yes正确、no错误、notice提示、warn警示、question答疑 
 * @param  {Function} callback [description]
 */

var showMidPop = function(title,icon,info,callback){
    avalon.vmodels['msg-mid-box'].isShow = true;
    avalon.vmodels['msg-mid-box'].title = title;
    avalon.vmodels['msg-mid-box'].icon = icon;
    avalon.vmodels['msg-mid-box'].info = info;
    avalon.vmodels['msg-mid-box'].isCanShow = false;
    avalon.vmodels['msg-mid-box'].onConfirm = function(){
        avalon.vmodels['msg-mid-box'].isShow =false;
        $('.pop-mask').hide();
        callback();
    };
   
}

var pub ={
	getCookie:getCookie,
	setCookie:setCookie,
	delCookie:delCookie,
	getQueryString:getQueryString,
    validateUser:validateUser,
    showPop:showPop,
    showMidPop:showMidPop
}
module.exports = pub