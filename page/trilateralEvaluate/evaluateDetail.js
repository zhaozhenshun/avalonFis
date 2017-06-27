require('avalon');
var pub = require('./pub')
avalon.ready(function () {
    var vm = avalon.define({
        $id: 'evaluateDetail',
        content: 'this is evaluateDetail.html',
        evalDetailInfo:{},
        rusultShow:false,
        commentAdd:commentAdd,
        showShrePanel:showShrePanel,
        
        init:init
    });
    vm.$watch('onReady', function() {
        //当test这个区域第一次扫描后会被执行
         $('.share-div').parent().css({'top':'45px'})
         $('.del-btn').click(function(event) {
            var evalId = getQueryString("evalId");
            deletEvalute(evalId)
         });
    })
      /**
     * 删除评价
     */
    function deletEvalute(id) {
        // midBox.config.info ="确定要删除本条评价吗？";
        // midBox.config.isShow = true;
        // midBox.config.onConfirm = function(){}
        $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.deleteEvaluate(id, function(data) {
            if (data.code == 200) {
                avalon.vmodels['msg-mid-box'].onClose = function() {
                    window.location.href = "#!/cullingCaseList";
                }


                pub.showMidPop("提示", 'notice', "删除评价成功", function() {
                    //跳转 身份绑定验证
                    window.location.href = "#!/cullingCaseList";
                })

            } else {
                pub.showPop("提示", 'notice', "只能删除自己评价信息");
            }
        }, function(err) {

        })


    }
    avalon.filters.detailFormate = function(data){
        if(data == ''||data == null){
            return "暂无详情信息"
        }
        return data;
    }
    function init(){
    	var evalId = getQueryString("evalId");
    	findDetailById(evalId);
    }
    function getQueryString(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	}
    avalon.scan(document.body);
    //点赞
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
                $comment.find('em').html(data.data);
                pub.setCookie(commentCookieId,1);
                pub.showPop("提示", 'notice', "点赞成功");
            }
        },function(err){

        })
    }

    //分享评价
    function showShrePanel(evalId){
        var shareId = "shareEvaluateDetail";
        avalon.vmodels[shareId].isShow =  avalon.vmodels[shareId].isShow ? false:true;
        var path = window.location.href;
        avalon.vmodels[shareId].path = path;
        avalon.vmodels[shareId].title = "智慧法院上线了！！！！！！！！！！！！！！！！！！";
        avalon.vmodels[shareId].wxShare();
    }
    function findDetailById(evalId){
    	$service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.findDetailById(evalId,function(data){
    		avalon.log("findDetailById");
    		if(data.code == 200){
    			vm.rusultShow = true;
    			vm.evalDetailInfo = data.data;
    			getComments(vm.evalDetailInfo.id);
    		}
    		
    	},function(err){

    	})
    }
    function getComments(id){
    	var commpentId = 'evaluateDetail-page';
    	avalon.vmodels[commpentId].isEvaluteShow = true;
        avalon.vmodels[commpentId].$service = $service;
        avalon.vmodels[commpentId].submitCallBack = refreshCallBack;
        avalon.vmodels[commpentId].evalutCommitCallBack = refreshCallBack;
    	avalon.vmodels[commpentId].refresh(id,vm.evalDetailInfo.caseId,vm.evalDetailInfo.courtCode,vm.evalDetailInfo.userId);
    
    }
    function refreshCallBack(){
    	window.location.reload();
    }

})
module.exports.init = function(){
	avalon.vmodels['evaluateDetail'].init();
}
module.exports._template_ = __inline('./evaluateDetail.html');