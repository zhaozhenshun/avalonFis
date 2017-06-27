require('avalon');
avalon.ready(function() {
  var vm = avalon.define({
    $id: 'evaluateVerify',
    content: '评价审核tab',
    state: 0, //0待审核 1已通过  2 未通过,
    tabEvent: tabEvent,
    onSearch:onSearch,
    tabState: function(idState) {
      if (idState == vm.state) return "on";
      return "";
    },
    jumpDetail: function(evalId) {
      window.location.href = "#!/evaluateDetail?evalId=" + evalId;
    },
    pageConfig: {
      currentPage: 1,
      totalPages: 1,
      onPageClick: pageClickEvent
    },
    formateEvalute: function(data) {
      return data
    },
    passEvaluteFun: passEvaluteFun, //评价审核
    totalCount: 0,
    showDataList: [], //展示数据
    reGetData:reGetData,
    refresh: init
  });
  var popVm = avalon.define({
    $id: 'layer-popBox',
    tips: "审核通过",
    evalId: '',
    pass: '',
    isShow: false,
    sureFun: function() {
      var self = this;
      approveEvaluate(self.evalId, self.pass);
    },
    cancelFun: function() {
      var self = this;
      self.isShow = false;
    }
  })
  popVm.$watch('pass', function(newVal, oldVal) {
    newVal ? popVm.tips = "审核通过" : popVm.tips = "审核未通过";
  })

  function init() {
    vm.state = 0;
    vm.pageConfig.currentPage = 1;
    changeHashPage(1);
    findExamineEvaluates();
  }

  function onSearch(event){
    findExamineEvaluates()
  }

  function reGetData() {
    vm.pageConfig.currentPage = 1;
    changeHashPage(1);
    findExamineEvaluates();
  }
  /**
   * [切换选项卡]
   * @param  0待审核 1已通过  2 未通过,
   */
  function tabEvent(id) {
    vm.state = id;
    vm.pageConfig.currentPage = 1;
    changeHashPage(1);
    findExamineEvaluates();
  }
  /**
   * 待审核   操作
   * @param  {[type]} pass   [true 通过  false不通过]
   */
  function passEvaluteFun(evalId, pass) {
    popVm.evalId = evalId;
    popVm.pass = pass;
    popVm.isShow = true;
  }
  /**
   * 分页点击事件
   */
  function pageClickEvent(event, curpage) {
    vm.pageConfig.currentPage = curpage;
    findExamineEvaluates();
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
  //显示10条
  function findExamineEvaluates() {
    var paging = {
      pageNumber: vm.pageConfig.currentPage,
      pageSize: 10,
      keyword:""
    }
    paging.keyword = $('.verify-input').val();
    $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.findExamineEvaluates(vm.state, paging, function(data) {
      if (data.code == 200) {
        avalon.log("findExamineEvaluates")
        avalon.log(data)
        vm.showDataList = data.data.list;
        vm.pageConfig.totalPages = data.data.totalPage;
        vm.pageConfig.currentPage = data.data.pageNumber;
        vm.totalCount = data.data.totalCount;
      }
    }, function(err) {

    })
  }

  function approveEvaluate(id, pass) {
    $service.com_sifayun_smartcourt_sfpj_api_IEvaluateService.approveEvaluate(id, pass, function(data) {
      if (data.code == 200) {
        popVm.isShow = false
        vm.showDataList = [];
        vm.reGetData();
      }else{
        alert('网络出错');
      }
    }, function(err) {

    })
  }
})
module.exports.init = function() {
  avalon.vmodels['evaluateVerify'].refresh();
}
module.exports._template_ = __inline('./evaluateVerify.html');