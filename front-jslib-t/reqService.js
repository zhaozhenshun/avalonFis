var $service = {};
var baseUrl = 'server_address?';

$service.com_sifayun_smartcourt_platform_api_ICourtService = {
	'findAreasByParentAreaCodeStandard': function(parentAreaCode, success, error, options){
    	var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findAreasByParentAreaCodeStandard';
    	postService(_url, {'p':JSON.stringify([parentAreaCode])}, success,error, options);
	},
    /**
     * 查询法院
     */
    'findByCourtCode': function (courtCode, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findByCourtCode';
        postService(_url, {
            'p': JSON.stringify([courtCode])
        }, success, error, options);
    },
    /**
     * 部门查询
     */
    'findDepartmentById': function (departmentId, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findDepartmentById';
        postService(_url, {
            'p': JSON.stringify([departmentId])
        }, success, error, options);
    },
    /**
     * 0:查询所有省
     *
     * @param parentAreaCode 上级areaCode
     */
    'findAreasByParentAreaCode': function (parentAreaCode, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findAreasByParentAreaCode';
        postService(_url, {'p': JSON.stringify([parentAreaCode])}, success, error, options);
    },
    /**
     * 查询父地区
     *
     * @param areaCode 地区码
     */
    'findParentAreaByAreaCode': function(areaCode, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findParentAreaByAreaCode';
        postService(_url, {'p':JSON.stringify([areaCode])}, success,error, options);
    },
    /**
     * @param cityCode 市areaCode
     */
    'findCourtsByCityCode': function (cityCode, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findCourtsByCityCode';
        postService(_url, {
            'p': JSON.stringify([cityCode])
        }, success, error, options);
    },
    /**
     * @param courtCode 法院code
     */
    'findDepartmentsByCourtCode': function (courtCode, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=findDepartmentsByCourtCode';
        postService(_url, {
            'p': JSON.stringify([courtCode])
        }, success, error, options);
    },
    /**
     * 当前用户所在法院的部门列表
     */
    'currentCourtDepartments': function(success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.ICourtService&m=currentCourtDepartments';
        postService(_url, {'p':JSON.stringify([])}, success,error, options);
    },
	'_interface': 'com.sifayun.smartcourt.platform.api.ICourtService'
}
$service.com_sifayun_smartcourt_platform_api_IAppService = {
    'findById': function(id, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.IAppService&m=findById';
        postService(_url, {'p':JSON.stringify([id])}, success,error, options);
    },
    'pagingEnabled': function(paging, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.IAppService&m=pagingEnabled';
        postService(_url, {'p':JSON.stringify([paging])}, success,error, options);
    },
    '_interface': 'com.sifayun.smartcourt.platform.api.IAppService'
}
/**
 * @author hebaceous
 */
$service.com_sifayun_smartcourt_platform_api_IDefinedCauseService = {
    /**
     * @param title 标题(null)
     * @param limit 条数
     */
    'findByTitleAndLimit': function(title,limit, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.IDefinedCauseService&m=findByTitleAndLimit';
        postService(_url, {'p':JSON.stringify([title,limit])}, success,error, options);
    },
    '_interface': 'com.sifayun.smartcourt.platform.api.IDefinedCauseService'
}

$service.com_sifayun_smartcourt_platform_api_IMenuService = {
    /**
     * [简要描述]：获取所有菜单
     * @author ggf
     * @date 2017年5月18日
     * @return
     */
    'getMenuList': function(success, error, options) {
        var _url ='i=com.sifayun.smartcourt.platform.api.IMenuService&m=getMenuList';
        postService(_url, {
            'p': JSON.stringify([])
        }, success, error, options);
    },
    /**
     * [简要描述]：校验 用户状态-菜单权限
     * @author ggf
     * @date 2017年5月18日 下午1:51:46
     * @param menuId
     * @return
     */
    'justifyMenuRight': function(menuId, success, error, options) {
        var _url ='i=com.sifayun.smartcourt.platform.api.IMenuService&m=justifyMenuRight';
        postService(_url, {
            'p': JSON.stringify([menuId])
        }, success, error, options);
    },
    '_interface': 'com.sifayun.smartcourt.platform.api.IMenuService '
}

/**
 * [简要描述]：消息处理服务
 * @author ggf
 * @date 2017年5月26日
 */
$service.com_sifayun_smartcourt_platform_api_IMessageService = {
	/**
	 * [简要描述]：新增消息
	 * @author ggf
	 * @date 2017年5月26日 下午4:45:24
	 * @param message{"id":123,"userId":123,"title":"title_ggf","sourceType":123,"type":123,"state":123,"readTime":null,"createTime":null,"isDelete":true}
	 * @return
	 */
	'add': function (message, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=add';
		postService(_url, {
			'p': JSON.stringify([message])
		}, success, error, options);
	},
	/**
	 * [简要描述]：删除消息 [1,2]
	 * @author ggf
	 * @date 2017年5月26日 下午4:45:37
	 * @param ids
	 * @return
	 */
	'delete': function (ids, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=delete';
		postService(_url, {
			'p': JSON.stringify([ids])
		}, success, error, options);
	},
	/**
	 * [简要描述]：消息设为已读 [1,2]
	 * @author ggf
	 * @date 2017年5月26日 下午4:45:37
	 * @param ids
	 * @return
	 */
	'isRead': function (ids, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=isRead';
		postService(_url, {
			'p': JSON.stringify([ids])
		}, success, error, options);
	},
	/**
	 * [简要描述]：根据消息id查找消息
	 * @author ggf
	 * @date 2017年5月26日 下午4:46:12
	 * @param id
	 * @return
	 */
	'findById': function (id, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=findById';
		postService(_url, {
			'p': JSON.stringify([id])
		}, success, error, options);
	},
	/**
	 * [简要描述]： 消息检索 [null,0,null,{"pageSize":5}]
	 * @author ggf
	 * @date 2017年5月26日 下午4:46:41
	 * @param sourceType 消息来源 0：平台消息，应用消息
	 * @param state 消息状态，0未读，1已读
	 * @param type 消息类型
	 * @param paging{"pageNumber":123,"pageSize":123,"keyword":"keyword_ggf","orderField":"orderField_ggf","orderDesc":true,"totalCount":123,"list":null} 分页数据
	 * @return
	 */
	'findMessage': function (sourceType, state, type, paging, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=findMessage';
		postService(_url, {
			'p': JSON.stringify([sourceType, state, type, paging])
		}, success, error, options);
	},
	/**
	 * [简要描述]：检索未读消息
	 * @author ggf
	 * @date 2017年6月2日 下午2:19:48
	 * @return
	 */
	'searchUnRead': function (success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=searchUnRead';
		postService(_url, {
			'p': JSON.stringify([])
		}, success, error, options);
	},
	/**
	 * [简要描述]：消息统计 应用消息，站内消息
	 * @author ggf
	 * @date 2017年6月5日 下午6:29:45
	 * @param sourctType 分类统计 可选
	 * @return
	 */
	'count': function (success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=count';
		postService(_url, {
			'p': JSON.stringify([])
		}, success, error, options);
	},
	/**
	 * [简要描述]：消息统计
	 * @author ggf
	 * @date 2017年6月7日 下午6:41:09
	 * @param sourceType 消息来源
	 * @param state 消息状态
	 * @return
	 */
	'countBySourceType': function (sourceType, state, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IMessageService&m=countBySourceType';
		postService(_url, {
			'p': JSON.stringify([sourceType, state])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.platform.api.IMessageService'
}

/**
 * @author hebaceous
 */
$service.com_sifayun_smartcourt_platform_api_IUserService = {
    /**
     * 查询所有性别
     */
    'sexes': function (success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=sexes';
        postService(_url, {
            'p': JSON.stringify([])
        }, success, error, options);
    },
    /**
     * code查询具体都标准码
     *
     * @param code{"id":123,"kind":"kind_ggf","kindName":"kindName_ggf","code":"code_ggf","codeName":"codeName_ggf","disabled":"disabled_ggf"}{"id":123,"kind":"kind_ggf","kindName":"kindName_ggf","code":"code_ggf","codeName":"codeName_ggf","disabled":"disabled_ggf"}{"id":123,"kind":"kind_ggf","kindName":"kindName_ggf","code":"code_ggf","codeName":"codeName_ggf","disabled":"disabled_ggf"} 00003-1(男)
     */
    'findStandardCodeByCode': function (code, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=findStandardCodeByCode';
        postService(_url, {
            'p': JSON.stringify([code])
        }, success, error, options);
    },
    /**
     * 查询所有的职务
     */
    'jobs': function (success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=jobs';
        postService(_url, {
            'p': JSON.stringify([])
        }, success, error, options);
    },
    /**
     * 查询职务
     */
    'findJobById': function (jobId, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=findJobById';
        postService(_url, {
            'p': JSON.stringify([jobId])
        }, success, error, options);
    },
    /**
     * 用户登陆
     *
     * @param loginId 用户名
     * @param pwd     密码
     */
    'login': function (loginId, pwd, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=login';
        postService(_url, {
            'p': JSON.stringify([loginId, pwd])
        }, success, error, options);
    },
    /**
     * 检测用户名
     *
     * @param loginId 用户名
     * @return true(可用)/false（不可用）
     */
    'checkLoginId': function (loginId, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=checkLoginId';
        postService(_url, {
            'p': JSON.stringify([loginId])
        }, success, error, options);
    },
    /**
     * 发送验证码(新生成6个数字，5分钟有效，最后一次为准)
     *
     * @param telephone     手机号
     * @param checkCodeType 验证码类型
     */
    'sendCheckCode': function (telephone, checkCodeType, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=sendCheckCode';
        postService(_url, {
            'p': JSON.stringify([telephone, checkCodeType])
        }, success, error, options);
    },
    /**
     * 用户注册（注册）
     *
     * @param user{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}          用户信息(telephone,pwd,name,eMail)
     * @param checkCode     手机验证码
     * @param checkCodeType 验证码类型
     */
    'register': function (user, checkCode, checkCodeType, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=register';
        postService(_url, {
            'p': JSON.stringify([user, checkCode, checkCodeType])
        }, success, error, options);
    },
    /**
     * 完善个人资料（注册）
     *
     * @param user{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}      用户信息(sex,birthday,pic)
     * @param userCourt 用户法院信息
     */
    'perfectUserData': function (user, userCourt, perfectUserDataModel, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=perfectUserData';
        postService(_url, {
            'p': JSON.stringify([user, userCourt, perfectUserDataModel])
        }, success, error, options);
    },
    /**
     * 申请身份认证（注册）
     *
     * @param idPic  身份证
     * @param jobPic 职业照
     */
    'applyIdentityAuthentication': function (idPic, jobPic, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=applyIdentityAuthentication';
        postService(_url, {
            'p': JSON.stringify([idPic, jobPic])
        }, success, error, options);
    },
    /**
     * 激活法院管理员
     *
     * @param user{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}{"id":123,"loginId":"loginId_ggf","telephone":"telephone_ggf","pwd":"pwd_ggf","name":"name_ggf","sex":"sex_ggf","birthday":null,"pic":"pic_ggf","eMail":"eMail_ggf","isActivate":true,"roleId":123,"role":123,"sourceType":123,"createTime":null,"isDelete":true,"sexName":"sexName_ggf","userCourt":null}          用户信息(telephone,name,eMail)
     * @param authCode      安全码
     * @param checkCode     手机验证码
     * @param checkCodeType 验证码类型
     */
    'activeCourt': function (user, authCode, checkCode, checkCodeType, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=activeCourt';
        postService(_url, {
            'p': JSON.stringify([user, authCode, checkCode, checkCodeType])
        }, success, error, options);
    },
    /**
     * 激活法院普通用户（导入）
     */
    'activeImportCourtUser': function (param, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=activeImportCourtUser';
        postService(_url, {
            'p': JSON.stringify([param])
        }, success, error, options);
    },
    /**
     * 完善用户生日+头像（导入）
     *
     * @param birthday 生日
     * @param pic      头像
     */
    'perfectImportCourtUserData': function (birthday, pic, success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=perfectImportCourtUserData';
        postService(_url, {
            'p': JSON.stringify([birthday, pic])
        }, success, error, options);
    },
    /**
     * 修改密码
     *
     * @param oldPwd 原密码
     * @param newPwd 新密码
     */
    'changePwd': function(oldPwd,newPwd, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=changePwd';
        postService(_url, {'p':JSON.stringify([oldPwd,newPwd])}, success,error, options);
    },
    /**
     * 当前用户信息
     */
    'currentUser': function (success, error, options) {
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=currentUser';
        postService(_url, {'p': JSON.stringify([])}, success, error, options);
    },
    /**
     * 更新个人信息
     *
     * @param user               用户(user.userCourt)
     * @param userDataExtraModel 额外信息(null?)
     */
    'update': function(user,userDataExtraModel, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=update';
        postService(_url, {'p':JSON.stringify([user,userDataExtraModel])}, success,error, options);
    },
    /**
     * 更新头像和职业照
     *
     * @param pic    头像（null?）
     * @param jobPic 职业照（null?）
     */
    'updatePicAndJobPic': function(pic,jobPic, success, error, options){
        var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=updatePicAndJobPic';
        postService(_url, {'p':JSON.stringify([pic,jobPic])}, success,error, options);
    },
	/**
	 * 4位图片验证码base64
	 */
	'generateVerifyPicture': function (success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=generateVerifyPicture';
		postService(_url, {
			'p': JSON.stringify([])
		}, success, error, options);
	},
	/**
	 * 重制密码图片验证码，手机验证码验证
	 *
	 * @param telephone              手机号
	 * @param checkCode              短信验证码
	 * @param verifyPictureCode      图片验证码
	 * @param verifyPictureCodeToken 图片验证码token
	 */
	'resetPwdCheck': function (telephone, checkCode, verifyPictureCode, verifyPictureCodeToken, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=resetPwdCheck';
		postService(_url, {
			'p': JSON.stringify([telephone, checkCode, verifyPictureCode, verifyPictureCodeToken])
		}, success, error, options);
	},
	/**
	 * 重制密码
	 *
	 * @param telephone 手机号
	 * @param pwd       新密码
	 * @param checkCode 短信验证码
	 */
	'resetPwd': function (telephone, pwd, checkCode, success, error, options) {
		var _url = 'i=com.sifayun.smartcourt.platform.api.IUserService&m=resetPwd';
		postService(_url, {
			'p': JSON.stringify([telephone, pwd, checkCode])
		}, success, error, options);
	},
	'_interface': 'com.sifayun.smartcourt.platform.api.IUserService'
}

var $loading = {
	init: function() {
		var loadH = '<div class="load-mask-opcity" id="common_loading"><img class="page-loading" src="/front-widget/static/image/common_loading.gif"></div>';
		$('body').append(loadH);
	},
	showLoading: function() {
		if ($('body').find('#common_loading').length == 0) {
			this.init();
		}
		$('#common_loading').show();
	},
	hideLoading: function() {
		$('#common_loading').hide();
	}
}

function postService(_url, param, success, error, opts) {
	var options = {
		type: 'GET',
		timeout: 10000,
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json',
		error: function(e) {},
		success: function(res) {}
	}
	$.extend(options, opts);
	_url = baseUrl + _url;
	//_url = './jsonData/' + _url.replace(/i=/,'').replace(/m=/,'').replace(/&/,'.') + '.json';
	var ajx = $.ajax({
		url: _url,
		type: options.type,
		data: param,
		timeout: options.timeout,
		contentType: options.contentType,
		beforeSend: function(xhr) {
			$loading.showLoading();
		},
		dataType: options.dataType,
		error: function(e) {
			if (error) {
				error(e);
			}
		},
		success: function(res) {
			//TODO res.code 平台相关错误处理 登录超时。。。。
			if (res.code == 401) {
				alert('登录超时，请重新登录');
				location.href = _loginUrl;
			} else if (success) {
				success(res);
			}
		},
		complete: function(XMLHttpRequest, status) {
			$loading.hideLoading();
			if (status == 'timeout') {
				ajx.abort();
				alert('请求超时.....');
			}
		}
	});
}
