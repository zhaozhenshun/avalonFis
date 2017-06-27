// jquery的ajax封装
var boxAjax={}
boxAjax.Ajax=function(url,data,fun1,async,fun2){
  var url=""||url;
  var data=""||data;
  var fun1=""||fun1;
  var async=(async==true||async==""||async==void 0)?true:false;
  var fun2=""||fun2;
	$.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          async:async,
          data:data
        })
        .done(fun1)
        .fail(fun2);
}