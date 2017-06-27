require('avalon');
avalon.component('ms-replayCommit', {
	template: __inline('./replayCommitCompent.html'),
	defaults: {
		$id: 'replayCommit',
		isRepalyShow: false,
		caseId: '',
		evalId: '',
		courtCode: '',
		commitId: '',
		userId: '',
		comment: '',
		parentCommentId:'',
		submitCallBack:avalon.noop,//回调
		$service:'',
		pub:require('page/trilateralEvaluate/pub'),
		onKeyup:function(str, limit) {
            this.comment = str.length > limit ?
                str.substring(0, limit) :
                String(str)
        },
		submitCommit: function() {
			var self = this;
			self.pub.validateUser(function(Identity) {
				if (Identity == 1) {
					self.pub.showMidPop("身份绑定验证", 'notice', "你现在还不能使用哦,请完成'身份绑定验证',验证通过后才能使用", function() {
						//跳转 身份绑定验证
						 window.location.href = avalon.vmodels['topbanner'].platformBaseUrl+'#!/acc/p/pInfo';
					})
					return
				}
				if (self.content == '') {
					alert('回复内容不为空');
					return;
				}
				avalon.log("caseId:" + self.caseId + "evalId：" + self.evalId + "courtCode:" + self.courtCode + "commitId" + self.commitId + "userId：" + self.userId)
				var commentParam = {
					caseId: self.caseId,
					evalId: self.evalId,
					courtCode: self.courtCode,
					commentId: self.commitId,
					commentUserId: self.userId,
					content: self.comment,
					parentCommentId: self.parentCommentId
				}
				self.$service.com_sifayun_smartcourt_sfpj_api_ICommentService.addComment(commentParam, function(data) {
					avalon.log("addComment")
					avalon.log(data);
					if (data.code == 200) {
						//回调
						self.submitCallBack();
						//刷新评论列表
						//
						// if(avalon.vmodels['caseDetail']){
						// 	avalon.vmodels['caseDetail'].caseEvaluateList = [];
						// 	avalon.vmodels['caseDetail'].refreshEvaluateView();
						// }
					}
				}, function(err) {

				})


			})

		}
	}
	
});