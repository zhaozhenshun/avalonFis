require('avalon');
avalon.ready(function () {
    var vm = avalon.define({
        $id: 'evaluateList',
        caseType: 0, //全部 为0，刑事2 民事 1 行政 6
        courtLevel: 0, //法院级别 全部为0 最高院 1 高院 2 中院 3 基层院 4,
        pageConfig: {
            currentPage: 1,
            totalPages: 1,
            onPageClick: pageClickEvent
        },
        caseTypeState: caseTypeState,
        caseTypeEvent: caseTypeEvent,
        courtTypeState: courtTypeState,
        courtTypeEvent: courtTypeEvent,
        caseList: [],
        totalCount: 0,
        content: '热门参评案件列表',
        init: init
    });

    avalon.scan(document.body);
  	function init(){
  		  findSfpjCases();
  	}
    function pageClickEvent(event, curpage) {
      	vm.pageConfig.currentPage = curpage;
        findSfpjCases();
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
    	findSfpjCases();
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
    	findSfpjCases();
    }
    /**
     * 参评案件列表接口
     * 
     */
    function findSfpjCases() {
        var paging = {
            "pageNumber": 1,
            "pageSize": 30
        };
        paging.pageNumber = vm.currentPage;
        $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.findSfpjCases(vm.caseType, vm.courtLevel, paging, function(data) {
            if (data.code == 200) {
                avalon.log(data);
                vm.caseList = data.data.list;
                vm.totalCount = data.data.totalCount;
                vm.pageConfig.currentPage = data.data.pageNumber;
                vm.pageConfig.totalPages = data.data.totalPage;
            } else {
                avalon.log("请求出错code" + data.code);
            }
        }, function(err) {

        })
    }
})
module.exports.init = function(){

	/**
	 * 页面初始数据
	 */
	avalon.vmodels['evaluateList'].init();
}
module.exports._template_ = __inline('./evaluateList.html');