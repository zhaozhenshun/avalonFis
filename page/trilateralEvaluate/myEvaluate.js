require('avalon');
avalon.ready(function () {
    // 三方评价分页配置
    var sfpjpage = avalon.define({
        $id:'sfpjpage',
        pageConfig: {
            currentPage: 1,
            totalPages: 8,
            onPageClick: pageClickEvent
        }
    });
    // 选择参评案件分页配置
    var poppage = avalon.define({
        $id: 'poppage',
        PoppageConfig:{
            currentPage: 1,
            totalPages: 4,
            onPageClick: popPageClickEvent
        }
    });
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
    var vm = avalon.define({
        $id: 'myEvaluate',
        content: '我的参评管理tab',
        showMyEvaPop:showMyEvaPop,
        list: [],
        caseIds:[],
        keyword:'',
        tingshenKeyword: '',
        isShowPop:false,
        config: {
            title:'提示',
            icon:'yes', //yes正确、no错误、notice提示,有其他的再加
            info:'',
            isShow:false
        },
        tingshenCfg: {
            liveState: null,
            beginTime: null,
            endTime: null,
        },
        tingShenCases:{},
        
        searchCase: function() {
            sfpjpage.pageConfig.currentPage = 1;
            search();
        },
        tingShenSearch: function() {
            poppage.PoppageConfig.currentPage = 1;
            tingshenSearch();
        },
        checkAll: function(e) {
            var checked = $(e.target).prop('checked');

            var $checkbox = $('#_caseList :checkbox');
            $checkbox.prop('checked', checked);

            if (!checked) {
                vm.caseIds = [];
                return;
            }

            $checkbox.each(function(i, el) {
                vm.caseIds[i] = this.value;
            });

            avalon.log(vm.caseIds);

        },
        checkOne: function(e) {

            var $obj = $(e.target);
            var isChecked = $obj.prop('checked');
            var val = $obj.prop('value');

            if (isChecked) {
                vm.caseIds.push(val);
            }
            else {
                vm.caseIds.splice($.inArray(val, vm.caseIds), 1);
            }

            avalon.log(vm.caseIds);

            var $caseList = $('#_caseList');
            var size = $caseList.find(':checkbox').size();
            var len = $caseList.find(':checkbox:checked').size();

            $('#_allChecked').prop('checked', size == len);
        },
        deleteCases: function() {
            if (vm.caseIds.length == 0) {
                // vm.config.info = "请先选择要删除的案件";
                // vm.config.isShow = true;
                avalon.vmodels['smallBox'].info = "请先选择要删除的案件";
                avalon.vmodels['smallBox'].icon = 'warn';
                avalon.vmodels['smallBox'].isShow = true;

                return;
            }

            avalon.vmodels['midBox'].info = "确定要删除吗?";
            avalon.vmodels['midBox'].icon = '';
            avalon.vmodels['midBox'].isShow = true;
            avalon.vmodels['midBox'].onConfirm = function() {
                $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.deleteByCaseIds(vm.caseIds, function(data) {

                    avalon.vmodels['midBox'].isShow = false;
                    vm.isShowPop = false;
                    $('.pop-mask').hide();

                    if (data && data.code == 200) {
                        sfpjpage.pageConfig.currentPage = 1;
                        search();
                    }
                    else {
                        avalon.vmodels['smallBox'].info = "删除案件失败, 请稍后再试";
                        avalon.vmodels['smallBox'].icon = 'no';
                        avalon.vmodels['smallBox'].isShow = true;
                        return;
                    }
                });
            }            
        },
        addSfpjCase: function(caseId, courtCode) {

            avalon.vmodels['midBox'].info = "请再次确认您所选的案件是否正确，提交选择后将无法修改";
            avalon.vmodels['midBox'].icon = 'notice';
            avalon.vmodels['midBox'].isShow = true;
            avalon.vmodels['midBox'].onConfirm = function() {
                $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.addSfpjCase(caseId, courtCode, function(data) {

                    avalon.vmodels['midBox'].isShow = false;
                    vm.isShowPop = false;
                    $('.pop-mask').hide();
                    if (data && data.code == 200) {
                        search();                        
                    }
                });
            }
        }
    });

    function pageClickEvent(event, curpage) {
        vm.caseIds = [];
        $('#_allChecked').prop("checked", false);
      	sfpjpage.pageConfig.currentPage = curpage;
        search();
    }
    function popPageClickEvent(event,curpage){
    	poppage.PoppageConfig.currentPage = curpage;
        tingshenSearch();
    }
    function showMyEvaPop(){
        poppage.PoppageConfig.currentPage = 1;
        clearTSCfg();        
        tingshenSearch();
    	vm.isShowPop = true;
    }

    function clearTSCfg() {
        vm.tingshenCfg.liveState = null;
        vm.tingshenCfg.beginTime = null;
        vm.tingshenCfg.endTime = null;
    }

    function tingshenSearch() {
        var paging = {
            pageNumber: 1, 
            pageSize: 4,
            keyword: ''
        };

        paging.pageNumber = poppage.PoppageConfig.currentPage;
        paging.keyword = vm.tingshenKeyword;

        // 调用接口
        var liveState = vm.tingshenCfg.liveState;
        var beginTime = vm.tingshenCfg.beginTime;
        var endTime = vm.tingshenCfg.endTime;
        $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.findCaseFromTingshen(liveState, beginTime, endTime, paging, function(data) {
            avalon.log(data);
            if (data && data.code == 200) {
                var result = data.data;
                vm.tingShenCases = result.list;

                // 计算分页总数
                var pages = result.totalCount % paging.pageSize == 0 
                    ? parseInt(result.totalCount / paging.pageSize) : parseInt(result.totalCount / paging.pageSize) + 1;
                poppage.PoppageConfig.totalPages = pages;
            }
            else {
                avalon.log('选择庭审案件请求数据出错...');
            }
        })
    }

    function search(curPage) {
        // 定义后台接口参数paging分页对象
        var paging = {
            pageNumber: 1, 
            pageSize: 10,
            keyword: ''
        };

        // 设置分页
        paging.pageNumber = curPage ? curPage : sfpjpage.pageConfig.currentPage;
        paging.keyword = vm.keyword;
        vm.caseIds = [];
        $('#_caseList :checkbox').removeAttr('checked');

        // 调用接口
        $service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService.findMySfpjCases(paging, function(data) {
            avalon.log(data);
            if (data && data.code == 200) {

                // avalon.log(data);
                var result = data.data;

                // 获取后台数据list
                vm.list = result.list;

                // 计算分页总数
                var pages = result.totalCount % paging.pageSize == 0 
                    ? parseInt(result.totalCount / paging.pageSize) : parseInt(result.totalCount / paging.pageSize) + 1;
                sfpjpage.pageConfig.totalPages = pages;
            }
            else {
                avalon.log("请求数据出错");
            }
        });        
    }
    search(1);

    avalon.scan(document.body);
})

module.exports._template_ = __inline('./myEvaluate.html');