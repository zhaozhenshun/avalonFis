require('avalon');
require('front-jslib/qrcode/jquery.qrcode');
avalon.component('ms-share',{
    template:__inline('./share.html'),
    defaults: {
        caseid:'',//案件id
        title:'',//分享的标题
        path:'',//根目录后的路径
        //fix---by Dear
        qqShare: function() {
            var self = this;
            var url = 'http://connect.qq.com/widget/shareqq/index.html';
            var href = url + '?url=' + self.path + '&showcount=0' +
                '&desc=&summary=智慧法院&title=' + self.title + '&site=&pics=';
            href = encodeURI(href);
            return href;

        },
        sinaShare:function(){
            var url = 'http://service.weibo.com/share/share.php?appkey=1499369121';
            var self = this;
            var summary = '智慧法院';

            var href = url + '&title=' + self.title + '&url=' + '' + self.path + '' + '&pic=&searchPic=false&style=simple';

            href = encodeURI(href);
           
            return href;
        },
        wxShare: function() {
            var $wechat = $('._share_area').find('._qrcode_img');
          
            var self = this;
            var host = 'http://' + window.location.host;
            if($("._qrcode_img").html()!='') return;
            try {
                $wechat.qrcode({
                    render: 'canvas',
                    width: 100,
                    height: 100,
                    correctLevel: 0,
                    text: self.path
                });
            } catch (e) {
                $wechat.qrcode({
                    render: 'table',
                    width: 100,
                    height: 100,
                    correctLevel: 0,
                    text: self.path
                });
            }
            return "javascript:;"
        }
    }
});

