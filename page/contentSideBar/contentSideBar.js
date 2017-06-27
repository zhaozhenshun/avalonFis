
require('avalon');
avalon.component('contentSideBar',{
    template:__inline('./contentSideBar.html'),
    defaults: {
    }
});

avalon.ready(function(){
    var vm = avalon.define({
        $id:'contentSideBar',
        navList:[],
        PageHome:"#!/evaluateHome",
        PageEvalute:"#!/myEvaluate",
        PageComment:"#!/myComment",
        PageVerify:"#!/evaluateVerify",
        pow:0//1不显示
    });
    valiateUser();
     function valiateUser() {
        $service.com_sifayun_smartcourt_sfpj_api_IUserRightsService.userIdentity(function(data) {
            if (data.code == 200) {
                if (data.data == 0) {
                   vm.PageHome = "#!/default";
                   vm.PageEvalute = "#!/default";
                   vm.PageComment = "#!/default"
                   vm.PageVerify = "#!/default"
                } 
                
            }
        }, function(err) {

        })
    }
    // 点击切换
    $(document).on('click','.title-content li',function(){
        $(this).addClass('on').siblings('li').removeClass('on');
    });

    //点击展开后
    $(document).on('click','.icon-left-close',function () {
        $('.content-side-bg').animate({
            width:'180px'
        });
        $('.content-main').animate({
            left:'180px'
        });
        $(".icon-left-open").show();
        $(".icon-left-close").hide();
    });
    //点击收起后
    $(document).on('click','.icon-left-open',function () {
        $('.content-side-bg').animate({
            width:'0px'
        });
        $('.content-main').animate({
            left:'0px'
        });
        $(".icon-left-open").hide();
        $(".icon-left-close").show();
    })
   
    avalon.scan(document.body);
})
