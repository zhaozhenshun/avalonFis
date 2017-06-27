require('avalon');
require('front-widget/page/smallBox');
avalon.component('sidebar',{
    template:__inline('./sidebar.html'),
    defaults: {
    }
});

avalon.ready(function(){
    var vm =avalon.define({
        $id:'sidebar',
        navList:[],
        isOpen:true,
        host:'',
        deleteLength:'',
        cookieDomain:'',
        menuId:'',
        parentId:'',
        homeUrl:'',
        menuRight: function(id, url, parentId){
            location.href = url;
            setCookieSide('menuId',id);
            setCookieSide('parentId',parentId);
        },
        setMenuCookie: function(id, parentId){
            setCookieSide('menuId',id);
            setCookieSide('parentId',parentId);
        },
        render:function(){
            vm.homeUrl = window.location.hash;
            if(vm.homeUrl == '#!/main/home'){
                delCookieSide('menuId');
                delCookieSide('parentId');
                $('.li-btn').find('i').addClass('arr-b');
                $('.nav-ul-1').show();
            }
        }
    });
    $service.com_sifayun_smartcourt_platform_api_IMenuService.getMenuList(function(res){
        vm.navList = res.data;
    }, function(err){
        avalon.log(err);
    });
    //处理cookiepath路径 example : .fayuan.dev
    vm.host=window.location.host;
    deleteLength = vm.host.split('.')[0].length;
    vm.host = vm.host.substr(deleteLength);
    vm.cookieDomain = vm.host.split(':')[0];
    //取出上次点击的id
    vm.menuId = getCookieSide('menuId');
    vm.parentId = getCookieSide('parentId');
    //根据id判断是否全部展示
    if (4 == vm.menuId || 5 == vm.menuId || 6 == vm.menuId || 9 == vm.menuId) 
    {
        vm.isOpen = false;
    }

    //点击收起
    $(document).on('click','.nav-open',function () {
        $('.nav').animate({
            width:'50px'
        },10);
        $('.content').animate({
            left:'50px'
        },10);
        $('.content-main').animate({
            right:'50px'
        },10);
        $(this).removeClass('nav-open').addClass('nav-hide');
        vm.isOpen = false;
    });
    //点击展开
    $(document).on('click','.nav-hide',function () {
        $('.nav').animate({
            width:'180px'
        },10);
        $('.content').animate({
            left:'180px'
        },10);
        $('.content-main').animate({
            right:'180px'
        },10);
        $(this).removeClass('nav-hide').addClass('nav-open');
        vm.isOpen = true;
    });
    $(document).on('click','.li-btn',function(){
        $(this).find('i').toggleClass('arr-b');
        $(this).siblings('.nav-ul-1').slideToggle();
        $(this).parent().siblings('li').find('i').removeClass('arr-b')
        $(this).parent().siblings('li').find('.nav-ul-1').slideUp();
    });
    //设置cookie
    function setCookieSide(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=" + vm.cookieDomain + ";path=/";
    }
    //取cookie
    function getCookieSide(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    //删除cookie
    function delCookieSide (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1000);
        var cval = getCookieSide(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";domain=" + vm.cookieDomain + ";path=";
    }
    avalon.scan(document.body);
})

