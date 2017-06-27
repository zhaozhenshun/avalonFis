require('avalon');
avalon.ready(function () {
    var vm = avalon.define({
        $id: 'evaluateIndex',
        content:"首页tab",
        caseList:[],//案件列表 显示结果12个
        caseType:0,
        evaluateList:[],//评价详情5条
        caseTypeshow:caseTypeshow,
        init:init,
        caseTypeClick:caseTypeClick
    });
    //过滤 案件标题限制15个字
    avalon.filters.formatCaseTitle = function(str){
    	if(str.length>15) return str.substr(0,15)+"..."
    	return str;
    }
    avalon.filters.formateSubTitle = function(sfpjCase){
        if(sfpjCase.subTitle ==null) return sfpjCase.wsCase.caseNo
        return sfpjCase.subTitle;

    }
    avalon.filters.wsCaseData = function(data,tip1,tip2){
         avalon.log('wsCaseData');
         avalon.log(arguments);
         var ps = data;
        for(var n =1; n< arguments.length; n++){
            if(ps[arguments[n]]) {
                ps = ps[arguments[n]]
            }else{
                avalon.log("null___")
                return {src:''}
            }
        }
         avalon.log({src:ps})
        return {src:ps}
       
    }

    function init(){
        findHomePageCases(vm.caseType);
        findHomePageEvaluates();
        valiateUser();
    }
    function caseTypeshow(caseType){
        if(vm.caseType == caseType) return 'on';
        return ''
    }
    function caseTypeClick(event,caseType){
        vm.caseType = caseType;
         vm.caseList =[];
        findHomePageCases(vm.caseType);
    }
    /**
     * 查询主页参评案件
     * 全部 为0，刑事2 民事 1 行政 6
     */
    function findHomePageCases(type){
        var page ={
            pageNumber:1,
            pageSize:12,
            keyword:''
        }
        $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.findHomePageCases(type,page,function(data){
             avalon.log("findHomePageCases_查询主页参评案件:");
             avalon.log(data);
             if(data.code==200){
                 vm.caseList = data.data
             }
        },function(err){

        })
    }
    function valiateUser() {
        $service.com_sifayun_smartcourt_sfpj_api_IUserRightsService.userIdentity(function(data) {
            if (data.code == 200) {
                if (data.data == 0) {
                    window.location.href = "#!/default"
                } 
                
            }
        }, function(err) {

        })
    }
    /**
     * [查询首页评价接口]
     */
    function findHomePageEvaluates(){
        $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.findHomePageEvaluates(function(data){
            avalon.log("findHomePageCases_查询主页参评案件:");
             avalon.log(data);
             if(data.code==200){
                vm.evaluateList = data.data;
             }
        },function(err){

        })
    }
    avalon.scan(document.body);
})
module.exports.init = function(){
    avalon.vmodels['evaluateIndex'].init();
}
module.exports._template_ = __inline('./evaluateIndex.html');