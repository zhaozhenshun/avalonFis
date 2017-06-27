require('avalon');
var compent;

avalon.component('ms-evalute', {
    template: __inline('./evaluteCompent.html'),
    defaults: {
        $id:'ms-evalute',
        isEvaluteShow: false,
        caseId:'',//案件id
        evalId:"",//评价id,
        courtCode:"",//法院id
        commitId:"",//评论id
        commitList:[],
        commentConfig:{},
        submitCallBack:avalon.noop,
        evalutCommitCallBack:avalon.noop,
        evalContent:'',
        $service:$service,
        pub:require('page/trilateralEvaluate/pub'),
        onKeyup: function(str, limit) {
            this.evalContent = str.length > limit ?
                str.substring(0, limit) :
                String(str)
        },
        replayChildCommit:function(commitIdStr,userIdStr,parentIdStr){
            /**
             * 添加评价 评论借口
             * 
             */
            var self = this;
            var commentf = {
                caseId:self.caseId,
                evalId:self.evalId,
                courtCode:self.courtCode,
                commitId:commitIdStr,
                userId:userIdStr,
                parentCommentId:parentIdStr,
                submitCallBack:self.submitCallBack,
                $service:self.$service
            }
           self.commentConfig = commentf;
        },
        onShowReplayCommit:function(id){
            var replayId = "replayCommit" + id;
            avalon.vmodels[replayId].isRepalyShow = true;
        },
        evaluteSubmit: function(event) {
            var self = this;
            /**
             * 添加评价 评论借口
             * 
             */
            /**
             * 用户身份验证 Identity 0法院用户  1法院基础用户  2验证通过法院基础用户
             */
            self.pub.validateUser(function(Identity) {
                if (Identity == 1) {
                    self.pub.showMidPop("身份绑定验证", 'notice', "你现在还不能使用哦,请完成'身份绑定验证',验证通过后才能使用", function() {
                        //跳转 身份绑定验证
                         window.location.href = avalon.vmodels['topbanner'].platformBaseUrl+'#!/acc/p/pInfo';
                    })
                    return
                }
                //----------身份通过执行逻辑------------------------------
                if (self.evalContent == '') {
                    alert('评论内容不能为空');
                    return;
                }
                var comment = {
                        caseId: self.caseId,
                        evalId: self.evalId,
                        courtCode: self.courtCode,
                        userId: "",
                        content: self.evalContent
                    }
                    //添加评论接口
                self.$service.com_sifayun_smartcourt_sfpj_api_ICommentService.addComment(comment, function(data) {
                    if (data.code == 200) {
                        // alert("添加评论成功等待审核");
                        self.evalutCommitCallBack();
                    }
                }, function(err) {

                })

            })



        },
        deleteCommit:function(id){
            var self = this;
            self.$service.com_sifayun_smartcourt_sfpj_api_ICommentService.deleteCommentById(id,function(data){
                if(data.code ==200){
                        //刷新评论列表
                        self.evalutCommitCallBack();
                        // if(avalon.vmodels['caseDetail']){
                        //     avalon.vmodels['caseDetail'].caseEvaluateList = [];
                        //     avalon.vmodels['caseDetail'].refreshEvaluateView();
                        // }
                    }
            },function(err){

            })
        },
        refresh:function(evalId,caseId,courtCode,userId){
            var paging={};
            var self = this;
            self.evalId = evalId;
            self.caseId = caseId;
            self.courtCode = courtCode;
            self.$service.com_sifayun_smartcourt_sfpj_api_ICommentService.findCommentByEvalId(evalId,{},function(data){
               if(data.code == 200){
                self.commitList = data.data.list;
               }else{
                avalon.warn("@获取评论列表出错——————————————————————————————");
                alert("@获取评论列表出错——————————————————————————————")
               }
            },function(err){

            })
           
        },
        person: 'person-select-area'
    }
    

});