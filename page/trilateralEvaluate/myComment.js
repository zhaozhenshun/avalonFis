require('avalon');
avalon.ready(function () {
    var spage = avalon.define({
        $id: 'pageSend',
        sconfig: {
            currentPage: 1,
            totalPages: 1,
            onPageClick: pageClickSend
        }        
    });
    var rpage = avalon.define({
        $id: 'pagerGet',
        rconfig: {
            currentPage: 1,
            totalPages: 1,
            onPageClick: pageClickRevice
        }
    });
    var vm = avalon.define({
        $id: 'myComment',
        content: '我的评论管理',
        tabType:1,//1 收到  2发出
        reviceEvalist:[],//收到评价列表
        sendCommentsList:[],//发出的评论列表
        tabEvent:tabEvent,
        popshow: false,
        tabState:function(val){
            var self = this;
            if(val == self.tabType) return "on";
            return "";
        },
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
        },
        dialogues:{},
		showDialogView:function(userId, commentUserId){
            // avalon.log(userId, commentUserId);

            $service.com_sifayun_smartcourt_sfpj_api_ICommentService.findDialogue(userId, commentUserId, function(data) {

                avalon.log(data);

                if (data && data.code == 200) {
                    vm.popshow = true;
                    vm.dialogues = data.data;
                }
                else {
                    avalon.log('查看对话数据失败...');
                }
            });
		},
		showCommitView: function(event) {
			var $commit = $(event.currentTarget).parents('.mycom-list').find('.mycon-reply');
			$commit.css('display') == 'none' ? $commit.show() : $commit.hide()
		},
        closeBox: function() {
            vm.dialogues = {};
            vm.popshow = false;
        },
        deleteSendInfo: function(id) {
            avalon.vmodels['midBox'].info = "确定要删除吗?"
            avalon.vmodels['midBox'].isShow = true;
            avalon.vmodels['midBox'].onConfirm = function() {
                $service.com_sifayun_smartcourt_sfpj_api_ICommentService.deleteCommentById(id, function(data) {
                    avalon.vmodels['midBox'].isShow = false;
                    $('.pop-mask').hide();
                    if (data && data.code == 200) {
                        spage.sconfig.currentPage = 1;
                        $('.mycon-reply').hide();
                        findMySendComments();
                    }
                    else{
                        avalon.log('删除数据失败.');
                    }
                });
            }
        },
		replayCommitFun:replayCommitFun,
        refresh:init,
		totalCount:999//结果数量
    });
    function init(){
        rpage.rconfig.currentPage = 1;
        spage.sconfig.currentPage = 1;
        vm.tabType = 1;
        changeHashPage(1);
        findMyReviceComments();
    }
    /**
     * [切换选项卡]
     * @param  1 收到的评论  2是发出的评论
     */
    function tabEvent(event,id){
    	// $(event.currentTarget).addClass('on').siblings().removeClass('on');
    	vm.tabType = id;
    	switch(id){
    		case 1:
    		rpage.rconfig.currentPage = 1;
    		changeHashPage(1);
    		findMyReviceComments();
    		break;
    		case 2:
    		spage.sconfig.currentPage = 1;
    		changeHashPage(1);
    		findMySendComments();
    		break;
    		default:
    		break;
    	}
    }
    /**
     * 分页点击事件
     */
    function pageClickRevice(event, curpage) {
      	rpage.rconfig.currentPage = curpage;
        findMyReviceComments();
    }

    function pageClickSend(event, curpage) {
        spage.sconfig.currentPage = curpage;
        findMySendComments();
    }

    /**
     * 回复评论
     */
	function replayCommitFun(event,caseIdStr,evalIdStr,courtCodeStr,commitIdStr,parentCommitIdStr,commentUserIdStr) {
        var $input = $(event.target).parent().find('input');
		var context = $input.val();
		var commentParam = {
			caseId: caseIdStr,
			evalId: evalIdStr,
			courtCode: courtCodeStr,
			commentId: commitIdStr,
			commentUserId: commentUserIdStr,
			content: context,
			parentCommentId: parentCommitIdStr,

		}

        $input.val('');

		$service.com_sifayun_smartcourt_sfpj_api_ICommentService.addComment(commentParam, function(data) {
			avalon.log("addComment")
			avalon.log(data);
			if (data.code == 200) {
				//刷新评论列表
                $('.mycon-reply').hide();
				findMyReviceComments();
			}
		}, function(err) {

		})
	}


    /**
     * 查询收到的评论  分页每页10条
     */
    function findMyReviceComments(){
    	var paging = {
    		pageNumber:rpage.rconfig.currentPage,
    		pageSize:10
    	}
    	$service.com_sifayun_smartcourt_sfpj_api_ICommentService.findMyReviceComments(paging,function(data){
    		avalon.log('findMyReviceComments');
    		avalon.log(data);
    		if(data.code == 200){
    			vm.totalCount = data.data.totalCount;
    			rpage.rconfig.currentPage = data.data.pageNumber;
    			rpage.rconfig.totalPages = data.data.totalPage;
    			vm.reviceEvalist = data.data.list;

    		}
    	},function(err){

    	})
    }
     /**
     * 查询发出的评论  分页每页10条
     */
    function findMySendComments(){
    	var paging = {
    		pageNumber:spage.sconfig.currentPage,
    		pageSize:10
    	}
    	$service.com_sifayun_smartcourt_sfpj_api_ICommentService.findMySendComments(paging,function(data){
			avalon.log('findMySendComments');
    		avalon.log(data);
    		if(data.code == 200){
    			vm.totalCount = data.data.totalCount;
    			spage.sconfig.currentPage = data.data.pageNumber;
    			spage.sconfig.totalPages = data.data.totalPage;
    			vm.sendCommentsList = data.data.list;
    		}
    	},function(err){

    	})
    }
	//**改变url hash 参数
	function changeHashPage(page) {
		var search = window.location.hash;
		var pageStr = getQueryString("page");
		window.location.hash = search.replace('page=' + pageStr, 'page=' + page)
	}

	function getQueryString(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	}

    avalon.scan(document.body);
})
module.exports.init =function(){
    avalon.vmodels['myComment'].refresh();
}
module.exports._template_ = __inline('./myComment.html');