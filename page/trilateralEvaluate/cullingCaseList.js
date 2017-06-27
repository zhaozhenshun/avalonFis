require('avalon');
avalon.ready(function () {
  var vm = avalon.define({
    $id: 'cullingCaseList',
    content: '精选评价列表页面',
    caseType: 0, //全部 为0，刑事2 民事 1 行政 6
    courtLevel: 0, //法院级别 全部为0 最高院 1 高院 2 中院 3 基层院 4,
    pageConfig: {
      currentPage: 1,
      totalPages: 8,
      onPageClick: pageClickEvent
    },
    evaluateList:[],
    caseTypeState: caseTypeState,
    caseTypeEvent: caseTypeEvent,
    courtTypeState: courtTypeState,
    courtTypeEvent: courtTypeEvent,
    totalCount: 0,
    init: init

  });

    avalon.scan(document.body);
    //过滤subTitle有无  有就显示  没就显示默认案件标题
    avalon.filters.sfpjCaseFormatData = function(sfpjCase){
      if(sfpjCase.subTitle == null) {
        if(sfpjCase.wxCase){
          return sfpjCase.wxCase.title
        }
      }
      return sfpjCase.subTitle
    }


    function init(){
  		  findEvaluates();
  	}
    function pageClickEvent(event, curpage) {
      	vm.pageConfig.currentPage = curpage;
        findEvaluates();
    }
    /**
     * 案件类型对应状态按钮
     */
    function caseTypeState(caseType){
    	if(vm.caseType == caseType) return 'on';
    	return '';
    }
    /**
     * 案件类型点击事件
     */
    function caseTypeEvent(caseType){
    	vm.caseType = caseType;
    	findEvaluates();
    }
    /**
     * 法院类型对应状态按钮
     */
    function courtTypeState(courtLevel){
    	if(vm.courtLevel == courtLevel) return 'on';
    	return '';
    }
    /**
     * 法院类型点击事件
     */
    function courtTypeEvent(courtLevel){
    	vm.courtLevel = courtLevel;
    	findEvaluates();
    }
    function findEvaluates(){
    	var paging = {"pageNumber":1,"pageSize":10};
    	paging.pageNumber = vm.pageConfig.currentPage;
      vm.evaluateList = [];
    	$service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.findEvaluates(vm.caseType, vm.courtLevel, paging, function(data){
			if (data.code == 200) {
				avalon.log(data)
        vm.evaluateList = data.data.list;
        vm.totalCount = data.data.totalCount;
        vm.pageConfig.currentPage = data.data.pageNumber;
        vm.pageConfig.totalPages = data.data.totalPage;

			}
    	}, function(err){

    	})
    }
    
    
})
module.exports.init = function(){
	avalon.vmodels["cullingCaseList"].init();
}
module.exports._template_ = __inline('./cullingCaseList.html');
