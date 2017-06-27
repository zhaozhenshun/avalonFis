require('avalon');
var pub = require('pub');
avalon.ready(function () {
      
    var vm = avalon.define({
        $id: 'caseDetail',
        content: '案件详情页面',
        init:init,
        pageConfig: {
            currentPage: 1,
            totalPages: 1,
            onPageClick: pageClickEvent
        },
        evaluteContent:'',//回复评价内容文本框
        caseInfoDetail:{}, //
        caseEvaluateList:[],
        commentShow:commentShow,
        evaluteSubmit:evaluteSubmit,
        refreshEvaluateView:refreshEvaluateView,
        clearSelect:clearSelect,
        slowSelect:slowSelect,
        agreeAdd:agreeAdd,
        clearState:clearState,
        slowState:slowState,
        onAgreeState:onAgreeState,
        deletEvalute:deletEvalute,
        onKeyup:onKeyup,
        commentAdd:commentAdd,
        showShrePanel:showShrePanel,
        onRender:function(){
             $('.share-div').parent().css({'top':'45px'})
         },
        shareConfig:{
            caseid:'',
            title:'中国公开网上线了',//分享的标题
            path:window.location.href//根目录后的路径
        },//分享插件
        evalList:[]



    });
    avalon.filters.detailFormate = function(data){
        if(data == ''||data == null){
            return "暂无详情信息";
        }
        return data;
    }
    function onKeyup(str,limit){
        vm.evaluteContent = str.length > limit ?
            str.substring(0, limit) :
            String(str)
    }
    //**
    //评价点赞
    function commentAdd(event,evalId){
        var commentCookieId = 'comment'+evalId;
        var isHasCommit = pub.getCookie(commentCookieId);
        //根据cookie判断当前有没有点赞
        if(isHasCommit && isHasCommit == 1){
            pub.showPop("提示", 'notice', "你已经点过赞了");
            return;
        }

        var $comment = $(event.currentTarget);
        $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.prise(evalId,function(data){
            if(data.code){
                $comment.find('span').html(data.data);
                pub.setCookie(commentCookieId,1);
                pub.showPop("提示", 'notice', "点赞成功");
            }
        },function(err){

        })
    }
    //分享评价
    function showShrePanel(evalId){
        var shareId = "sharelist" + evalId;
        avalon.vmodels[shareId].isShow =  avalon.vmodels[shareId].isShow ? false:true;
        var path = window.location.origin +"/"+"#!/evaluateDetail?evalId="+evalId;
        avalon.vmodels[shareId].path = path;
        avalon.vmodels[shareId].title = "智慧法院上线了！！！！！！！！！！！！！！！！！！";
        avalon.vmodels[shareId].wxShare();
    }
    var midBox = avalon.define({
        $id: 'c_midbox',
        config: {
            title:'提示',
            icon:'notice',//yes正确、no错误、notice提示、warn警示、question答疑
            info:'',
            isShow:false,
            isCanShow:true, //取消按钮默认显示
            onConfirm:function(){
                this.isShow =false;
                $('.pop-mask').hide();
            }
        }
    });
    initSDKconfig();
    function initSDKconfig() {
        vm.shareConfig.title = "智慧法院上线了！！！！！！！！！！！！！！！！！！";
        vm.shareConfig.caseid = '2333333';
        vm.shareConfig.path = window.location.href;
       
    }
    /**
     * 删除评价
     */
    function deletEvalute(id){
        // midBox.config.info ="确定要删除本条评价吗？";
        // midBox.config.isShow = true;
        // midBox.config.onConfirm = function(){}
        $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.deleteEvaluate(id, function(data) {
            if (data.code == 200) {
                vm.refreshEvaluateView();

            }else{
                pub.showPop("提示", 'notice', "只能删除自己评价信息");
            }
        }, function(err) {

        })
        
       
    }
    //cook  clear_caseId   0不清晰   1清楚   
    function clearSelect(event,index){
        //先判断本地有没有cook  有就不操作 
        var caseId = pub.getQueryString('caseId')
        var clearName = 'clear_'+caseId;
        if(pub.getCookie(clearName)){
            alert('你已经选择过了')
            return
        }
        $(event.currentTarget).addClass('on');
        pub.setCookie(clearName,index);
        clearAdd(index);
    }
    function clearState(index){
         var caseId = pub.getQueryString('caseId');
          var clearName = 'clear_'+caseId;
         if(pub.getCookie(clearName) == index) return 'on';
         return '';
    }
    function slowState(index){
         var caseId = pub.getQueryString('caseId');
         var slowName = "slow_"+caseId;
         if(pub.getCookie(slowName) == index) return 'on';
         return '';
    }
    function clearAdd(index){
        var caseId = pub.getQueryString('caseId')
        var sharp = index==0?false:true;
        $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.sharp(caseId,sharp,function(data){
            if(data.code==200){
                avalon.log("选择清晰度成功")
            }
        },function(err){

        })

    }
    function agreeAdd(event){
        var caseId = pub.getQueryString('caseId');
        var agreeName = "favour_"+caseId;
        var isAgree = onAgreeState();
        if(isAgree == 'on') {
             pub.showPop("提示", 'notice', "你已经点过赞了");
             return;
        }
        pub.setCookie(agreeName,true);
        $(event.currentTarget).addClass('on');
         $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.favour(caseId,function(data) {
            if (data.code == 200) {
                $('.agree').find('em').html(data.data);
                 pub.showPop("提示", 'notice', "点赞成功");
                avalon.log("点赞成功");
            }
        }, function(err) {

        })
    }
    function onAgreeState(){
        var caseId = pub.getQueryString('caseId');
        var agreeName = "favour_"+caseId;
        var isagree = pub.getCookie(agreeName);
        if(isagree) return 'on';
        return '';
    }
    function slowAdd(index) {
        var caseId = pub.getQueryString('caseId')
        var slow = index == 0 ? false : true;
        $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.smooth(caseId, slow, function(data) {
            if (data.code == 200) {
                avalon.log("选择清晰度成功")
            }
        }, function(err) {

        })
    }
    //cook  slow_caseId   0不流畅   1流畅
    function slowSelect(event,index){
         //先判断本地有没有cook  有就不操作 
        var caseId = pub.getQueryString('caseId')
        var slowName = 'slow_'+caseId;
        if(pub.getCookie(slowName)){
            alert('你已经选择过了')
            return
        }
        $(event.currentTarget).addClass('on');
        pub.setCookie(slowName,index);
        slowAdd(index);
    }
    function refreshEvaluateView(){
        vm.caseEvaluateList = [];
        var caseId = getQueryString('caseId');
        findEvaluateByCaseId(caseId);
        findByCaseId(caseId);
    }
    function init(){
    	var caseId = getQueryString('caseId');
    	findByCaseId(caseId);
        findEvaluateByCaseId(caseId);


    }
	function getQueryString(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	}
    function commentShow(event, evalId, courtCode, userId) {
        var compentId = 'evalute' + evalId;
        var caseId = getQueryString('caseId');
        /**
         * 用户身份验证 Identity 0法院用户  1法院基础用户  2验证通过法院基础用户
         */
       avalon.vmodels[compentId].isEvaluteShow = avalon.vmodels[compentId].isEvaluteShow ? false : true;
        avalon.vmodels[compentId].$service = $service;
        avalon.vmodels[compentId].submitCallBack = refreshCallBack;
        avalon.vmodels[compentId].evalutCommitCallBack = refreshCallBack;
        avalon.vmodels[compentId].refresh(evalId, caseId, courtCode, userId);
      


    }
    function refreshCallBack(){
        refreshEvaluateView();
    }

    /**
     * [----添加评价-------]
     */
    function evaluteSubmit(caseIdStr, courtCodeStr) {
        var str = vm.evaluteContent;
        if (str == "") {
            alert("提交的评价内容不能为空");
            return;
        }
        var evaluate = {
            caseId: caseIdStr,
            courtCode: courtCodeStr,
            content: vm.evaluteContent,
            userId: "" //暂时无
        }
        pub.validateUser(function(Identity) {
            if (Identity == 1) {
                pub.showMidPop("身份绑定验证", 'notice', "你现在还不能使用哦,请完成'身份绑定验证',验证通过后才能使用", function() {
                    //跳转 身份绑定验证
                      window.location.href = avalon.vmodels['topbanner'].platformBaseUrl+'#!/acc/p/pInfo';
                })
                return
            }
            $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.addEvaluate(evaluate, function(data) {
                avalon.log(data);
                if (data.code == 200) {
                    alert("回复成功等待审核成功后显示");
                    avalon.log("evaluteSubmit_----------------------------------------------")
                    vm.evaluteContent = '';
                    avalon.log(data);
                }
            }, function(err) {

            })

        })


    }
    function findCommentByEvalId(){
        
    }
    function pageClickEvent(event, curpage) {
        vm.pageConfig.currentPage = curpage;
        findSfpjEvelate();
    }
    avalon.scan(document.body);
    function findSfpjEvelate(){
        var caseId = getQueryString('caseId');
        findEvaluateByCaseId(caseId);
    }
    /**
     *查询案件详情
     */
    function findByCaseId(caseId){
    	$service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.findDetailByCaseId(caseId,function(data){
    		avalon.log("findByCaseId");
    		avalon.log(data);
            vm.caseInfoDetail = data.data;
    	},function(err){

    	})
    }
    function findEvaluateByCaseId(caseId){
        var paging ={
            pageNumber:1,
            pageSize:2,
            keyword:''
        }
        paging.pageNumber= vm.pageConfig.currentPage;

        $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.findEvaluateByCaseId(caseId, paging, function(data){
            avalon.log("findEvaluateByCaseId");
            avalon.log(data);
            vm.caseEvaluateList = data.data.list
        }, function(err){

        });
    }
})
module.exports.init = function(){
	avalon.vmodels['caseDetail'].init();

}
module.exports._template_ = __inline('./caseDetail.html');