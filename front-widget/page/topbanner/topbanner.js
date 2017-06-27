require('avalon');
avalon.component('topbanner', {
    template: __inline('./topbanner.html'),
    defaults: {
        $id:'topbanner',
        mouseover:function(event) {
            // this.isShow =true;
            var self = this;
            $(event.currentTarget).find('.person-select-area,.mes-area').show();

        },
        mouseout:function(event) {
            $(event.currentTarget).find('.person-select-area,.mes-area').hide();
            // this.isShow =false;
        },
        isShow: false,
        person: 'person-select-area'
    }
});
avalon.ready(function() {

    var vm = avalon.define({
        $id:'topbanner',
        userName:'',
        messageNum:'',
        messageList:[],
        platformBaseUrl: '',
        role:'', //0管理员、1法院用户
    });

    $service.com_sifayun_smartcourt_platform_api_IUserService.currentUser(function(data) {
        vm.userName = data.data.name;
        vm.role = data.data.role;
    }, function(err) {
        avalon.log(err);
    });
    $service.com_sifayun_smartcourt_platform_api_IMessageService.searchUnRead(function(data){
        vm.messageNum = data.data
        avalon.log(data.data);
    }, function(err) {
        avalon.log(err); 
    });
    $service.com_sifayun_smartcourt_platform_api_IMessageService.findMessage('',0,'',{"pageNumber":1,"pageSize":5,"keyword":"","orderField":0},function(data){
        vm.messageList = data.data.list
        avalon.log(data.data);
    }, function(err) {
        avalon.log(err); 
    });
    $service.com_sifayun_smartcourt_platform_api_IAppService.findById('platform',function(data){
        vm.platformBaseUrl = data.data.baseUrl;
    }, function(err) {
        avalon.log(err); 
    });

    //点击收起
    $(document).on('click','.back-out',function () {
        var name = 't';
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            var value = unescape(arr[2]);

        var myDate=new Date();
        myDate.setTime(-1000);//设置时间    
        document.cookie=name + "=" + value + "; expires="+myDate.toGMTString() + ";path=/;domain=.fayuan.dev";
        location.href = vm.platformBaseUrl+"/page/login/login.html";
    });

    avalon.scan(document.body);
})