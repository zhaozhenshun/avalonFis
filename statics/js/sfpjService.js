
var _loginUrl = 'server_login_url';
/**
 * 
 * 案件审核日志计入接口类
 * 
 * @author Tangsonghe
 *
 */
$service.com_sifayun_smartcourt_sfpj_api_ICaseApproveLogService = {
	/**
	 * 案件审核操作记录接口
	 * 
	 * @param approveLog 日志记录对象
	 */
	'addCaseApproveLog': function(approveLog, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICaseApproveLogService&m=addCaseApproveLog';
		postService(_url, {
			'p': JSON.stringify([approveLog])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.sfpj.api.ICaseApproveLogService'
}

/**
 * 
 * 评论内容接口类
 * 
 * @author Tangsonghe
 *
 */
$service.com_sifayun_smartcourt_sfpj_api_ICommentService = {
	/**
	 * 根据评价id查询评论内容
	 * 
	 * @param evalId 评价id
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页对象
	 * 
	 * @return
	 */
	'findCommentByEvalId': function(evalId, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=findCommentByEvalId';
		postService(_url, {
			'p': JSON.stringify([evalId, paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 查询我收到的评论
	 * 
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * @return
	 */
	'findMyReviceComments': function(paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=findMyReviceComments';
		postService(_url, {
			'p': JSON.stringify([paging])
		}, success, error, options);
	},
	/**
	 * 查询我发出的评论
	 * 
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null}
	 * @return
	 */
	'findMySendComments': function(paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=findMySendComments';
		postService(_url, {
			'p': JSON.stringify([paging])
		}, success, error, options);
	},
	/**
	 * 查看对话
	 * 
	 * @param userId 评论的用户id
	 * @param commentUserId 被评论的用户id
	 * @return 
	 */
	'findDialogue': function(userId, commentUserId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=findDialogue';
		postService(_url, {
			'p': JSON.stringify([userId, commentUserId])
		}, success, error, options);
	},
	/**
	 * 
	 * 根据评价id删除全部评论
	 * 
	 * @param evalId
	 */
	'deleteCommentByEvalId': function(evalId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=deleteCommentByEvalId';
		postService(_url, {
			'p': JSON.stringify([evalId])
		}, success, error, options);
	},
	/**
	 * 删除单个评论
	 * @param id
	 */
	'deleteCommentById': function(id, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=deleteCommentById';
		postService(_url, {
			'p': JSON.stringify([id])
		}, success, error, options);
	},
	/**
	 * 添加单个评论
	 * @param comment
	 */
	'addComment': function(comment, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ICommentService&m=addComment';
		postService(_url, {
			'p': JSON.stringify([comment])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.sfpj.api.ICommentService'
}

/**
 * 
 * 评价审核日志操作接口
 * 
 * @author Tangsonghe
 *
 */
$service.com_sifayun_smartcourt_sfpj_api_IEvaluateApproveLogService = {
	/**
	 * 
	 * 添加评价审核日志接口
	 * 
	 * @param evaluateApproveLog 审核日志记录对象
	 */
	'addApproveLog': function(evaluateApproveLog, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateApproveLogService&m=addApproveLog';
		postService(_url, {
			'p': JSON.stringify([evaluateApproveLog])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.sfpj.api.IEvaluateApproveLogService'
}

/**
 * 
 * 评价接口
 * 
 * @author Tangsonghe
 *
 */
$service.com_sifayun_smartcourt_sfpj_api_IEvaluateService = {
	/**
	 * 
	 * 根据案件id查询评价数量
	 * 
	 * @param caseId 案件id
	 * @return
	 */
	'fingEvalCountByCaseId': function(caseId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=fingEvalCountByCaseId';
		postService(_url, {
			'p': JSON.stringify([caseId])
		}, success, error, options);
	},
	/**
	 * 
	 * 查询首页评价接口
	 * 
	 * @return
	 */
	'findHomePageEvaluates': function(success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=findHomePageEvaluates';
		postService(_url, {
			'p': JSON.stringify([])
		}, success, error, options);
	},
	/**
	 * 
	 * 查询评价列表接口
	 * 
	 * @param caseType 案件类型 全部 为0，刑事2 民事 1 行政 6
	 * @param courtLevel 法院级别 全部为0 最高院 1 高院 2 中院 3 基层院 4
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * 
	 * @return
	 */
	'findEvaluates': function(caseType, courtLevel, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=findEvaluates';
		postService(_url, {
			'p': JSON.stringify([caseType, courtLevel, paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 查询评价审核菜单接口
	 * 
	 * @param state 审核类型  0 待审核 1 已通过 2 不通过
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * @return
	 */
	'findExamineEvaluates': function(state, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=findExamineEvaluates';
		postService(_url, {
			'p': JSON.stringify([state, paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 查询评价内容详情
	 * 
	 * @param id
	 * @return
	 */
	'findDetailById': function(id, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=findDetailById';
		postService(_url, {
			'p': JSON.stringify([id])
		}, success, error, options);
	},
	/**
	 * 
	 * 案件详情页面查询评价
	 * 
	 * @param caseId 案件id
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * @return
	 */
	'findEvaluateByCaseId': function(caseId, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=findEvaluateByCaseId';
		postService(_url, {
			'p': JSON.stringify([caseId, paging])
		}, success, error, options);
	},
	/**
	 * 删除评价
	 * 
	 * @param evalId 评价id
	 */
	'deleteEvaluate': function(evalId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=deleteEvaluate';
		postService(_url, {
			'p': JSON.stringify([evalId])
		}, success, error, options);
	},
	/**
	 * 添加一个评价
	 * @param evaluate 添加评价的参数
	 */
	'addEvaluate': function(evaluate, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=addEvaluate';
		postService(_url, {
			'p': JSON.stringify([evaluate])
		}, success, error, options);
	},
	/**
	 * 
	 * 审核评价
	 * 
	 * @param evalId 评价id
	 * @param result 审核结果 true 通过 false 驳回
	 */
	'approveEvaluate': function(evalId, result, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=approveEvaluate';
		postService(_url, {
			'p': JSON.stringify([evalId, result])
		}, success, error, options);
	},
	/**
	 * 
	 * 评价点赞
	 * 
	 * @param evalId 评价的id
	 */
	'prise': function(evalId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IEvaluateService&m=prise';
		postService(_url, {
			'p': JSON.stringify([evalId])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.sfpj.api.IEvaluateService'
}

/**
 * 
 * 三方评价活动接口类
 * 
 * @author Tangsonghe
 *
 */
$service.com_sifayun_smartcourt_sfpj_api_ISfpjCaseService = {
	/**
	 * 
	 * 查询主页参评案件接口
	 * 
	 * @param type 案件类型
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * @return
	 */
	'findHomePageCases': function(type, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=findHomePageCases';
		postService(_url, {
			'p': JSON.stringify([type, paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 根据caseId查询案件信息
	 * 
	 * @param caseId
	 * @return
	 */
	'findByCaseId': function(caseId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=findByCaseId';
		postService(_url, {
			'p': JSON.stringify([caseId])
		}, success, error, options);
	},
	/**
	 * 
	 * 参评案件列表接口
	 * 
	 * @param caseType 案件类型 全部 为0，刑事2 民事 1 行政 6
	 * @param courtLevel 法院级别 全部为0 最高院 1 高院 2 中院 3 基层院 4
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * @return
	 */
	'findSfpjCases': function(caseType, courtLevel, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=findSfpjCases';
		postService(_url, {
			'p': JSON.stringify([caseType, courtLevel, paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 我的参评案件列表接口
	 * 
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * 
	 * @return
	 */
	'findMySfpjCases': function(paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=findMySfpjCases';
		postService(_url, {
			'p': JSON.stringify([paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 从庭审表中选择参评案件接口（申请案件餐品接口）
	 * 
	 * @param liveState 案件类型 直播中传1 案件回顾3 
	 * @param beginTime 开庭时间---开始时间
	 * @param endTime 开庭时间---结束时间
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页
	 * @return
	 */
	'findCaseFromTingshen': function(liveState, beginTime, endTime, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=findCaseFromTingshen';
		postService(_url, {
			'p': JSON.stringify([liveState, beginTime, endTime, paging])
		}, success, error, options);
	},
	/**
	 * 
	 * 案件详情接口
	 * 
	 * @param id SfpjCase中的caseId
	 * @return
	 */
	'findDetailByCaseId': function(caseId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=findDetailByCaseId';
		postService(_url, {
			'p': JSON.stringify([caseId])
		}, success, error, options);
	},
	/**
	 * 
	 * 删除指定的案件
	 * 
	 * @param caseIds 案件id列表
	 */
	'deleteByCaseIds': function(caseIds, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=deleteByCaseIds';
		postService(_url, {
			'p': JSON.stringify([caseIds])
		}, success, error, options);
	},
	/**
	 * 
	 * 选择案件入库
	 * 
	 * @param caseId 案件id
	 * @param courtCode 案件的code
	 */
	'addSfpjCase': function(caseId, courtCode, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=addSfpjCase';
		postService(_url, {
			'p': JSON.stringify([caseId, courtCode])
		}, success, error, options);
	},
	/**
	 * 赞
	 * @param caseId    案件ID
	 */
	'favour': function(caseId, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=favour';
		postService(_url, {
			'p': JSON.stringify([caseId])
		}, success, error, options);
	},
	/**
	 * @param caseId    案件ID
	 * @param isSharp   是否清晰
	 */
	'sharp': function(caseId, isSharp, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=sharp';
		postService(_url, {
			'p': JSON.stringify([caseId, isSharp])
		}, success, error, options);
	},
	/**
	 * @param caseId    案件ID
	 * @param isSmooth  是否流畅
	 */
	'smooth': function(caseId, isSmooth, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=smooth';
		postService(_url, {
			'p': JSON.stringify([caseId, isSmooth])
		}, success, error, options);
	},
	/**
	 * 是否是院长
	 * @return true是院长， false不是院长
	 */
	'isDean': function(success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.ISfpjCaseService&m=isDean';
		postService(_url, {
			'p': JSON.stringify([])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.sfpj.api.ISfpjCaseService'
}

/**
 * 
 * 用户权限查询接口类
 * 
 * @author Tangsonghe
 *
 */
$service.com_sifayun_smartcourt_sfpj_api_IUserRightsService = {
	/**
	 * 用户身份标识
	 * 
	 * @return
	 * 0. 法院账户
	 * 1. 法院用户账户--自主注册--基础账户
	 * 2. 法院用户账户--自主注册--身份验证账户
	 *    法院用户账户--导入用户--已激活身份验证账户
	 */
	'userIdentity': function(success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.sfpj.api.IUserRightsService&m=userIdentity';
		postService(_url, {
			'p': JSON.stringify([])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.sfpj.api.IUserRightsService'
}

