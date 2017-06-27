require(['jquery','avalon','mmRouter','text','front-widget/page/topbanner','front-widget/page/sidebar','front-widget/page/share/shareForList','page/contentSideBar/contentSideBar','components/evaluteCompent/evaluteCompent','components/evaluteCompent/replayCommitCompent','front-widget/page/midBox/midBox','front-widget/page/smallBox/smallBox','components/pager/pager','front-widget/page/share/share'],function($,avalon,layer){
  avalon.ready(function(){

    var vm = avalon.define({
      $id: "index_page",
      title:"Index Page",
      view:""
    });
    initPow();
    function initPow() {
      $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.isDean(function(data) {
        if (data.code == 200) {
          if (data.data) avalon.vmodels['contentSideBar'].pow = 1;
        }
      }, function(err) {

      })

    }
    function linkPlatform(){
      avalon.vmodels['sidebar'].parentId = 2;
      avalon.vmodels['sidebar'].menuId = 7;
    }
    function showState(path){
      if(path =="/evaluateHome" || path =="/evaluateList" || path =="/cullingCaseList" || path =="/caseDetail" || path =="/evaluateDetail") $(".title-content li:first-child").addClass('on').siblings().removeClass('on');
      if(path =="/myEvaluate")$(".title-content li:nth-child(2)").addClass('on').siblings().removeClass('on');
      if(path =="/evaluateVerify")$(".title-content li:last-child").addClass('on').siblings().removeClass('on');
      if(path =="/myComment")$(".title-content li:nth-child(3)").addClass('on').siblings().removeClass('on');
    }
    var routerConfig = {
      "/evaluateHome":{jspath:'page/trilateralEvaluate/evaluateIndex',template:'/page/trilateralEvaluate/evaluateIndex.html'},
      "/evaluateList":{jspath:'page/trilateralEvaluate/evaluateList',template:'/page/trilateralEvaluate/evaluateList.html'},
      "/cullingCaseList":{jspath:'page/trilateralEvaluate/cullingCaseList',template:'/page/trilateralEvaluate/cullingCaseList.html'},
      "/caseDetail":{jspath:'page/trilateralEvaluate/caseDetail',template:'/page/trilateralEvaluate/caseDetail.html'},
      "/evaluateDetail":{jspath:'page/trilateralEvaluate/evaluateDetail',template:'/page/trilateralEvaluate/evaluateDetail.html'},
      "/myEvaluate":{jspath:'page/trilateralEvaluate/myEvaluate',template:'/page/trilateralEvaluate/myEvaluate.html'},
      "/myComment":{jspath:'page/trilateralEvaluate/myComment',template:'/page/trilateralEvaluate/myComment.html'},
      "/evaluateVerify":{jspath:'page/trilateralEvaluate/evaluateVerify',template:'/page/trilateralEvaluate/evaluateVerify.html'},
      "/default":{jspath:'page/trilateralEvaluate/defualt',template:'/page/trilateralEvaluate/defualt.html'}

    }
    
    function callback(mode) {

      avalon.log("router...." + this.path)

      var cfg = routerConfig[this.path]
      var path = this.path;
      var query = this.query;
      var params = this.params;


      if (cfg) {
        require([cfg.jspath], function(module) {

          vm.view = module._template_;
          this.path, this.query, this.param
          showState(path);
          module.path = path;
          module.query = query;
          module.params = params;

          linkPlatform();
          if (module.init)
            module.init();

        })


      } else {
        //to 404
        avalon.log("404 not found")
      }
    }
    function evaluateDefault(mode){
      avalon.log("router...." + this.path)

      var cfg = routerConfig[this.path]
      var path = this.path;
      var query = this.query;
      var params = this.params;

      linkPlatform();
      vm.view = __inline('./trilateralEvaluate/default.html')

    }

  avalon.router.add("/evaluateHome", callback)//三方评价首页
  avalon.router.add("/evaluateList", callback)//热门参评案件列表 更多
  avalon.router.add("/cullingCaseList", callback)//精选评价列表 更多
  avalon.router.add("/caseDetail", callback)//案件详情
  
  avalon.router.add("/myEvaluate", callback)//我的参评管理
  avalon.router.add("/evaluateVerify", callback)//评价审核
  avalon.router.add("/evaluateDetail", callback)
  avalon.router.add("/myComment", callback);
  avalon.router.add("/default", evaluateDefault)

     //启动路由监听
     avalon.history.start({
      root: "/"
    })


     avalon.scan(document.body);
   });

    //avalon.scan(document.body);
//})

})


