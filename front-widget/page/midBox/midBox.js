
require('avalon');
avalon.component('ms-midbox',{
    template:__inline('./midBox.html'),
    defaults:{
        title:'提示',
        icon:'warn',//yes正确、no错误、notice提示、warn警示、question答疑
        info:'确认删除该消息？删除后不可恢复！',
        isShow:false,
        btnMes:'确定',
        btnCan:'取消',
        isCanShow:true, //取消按钮默认显示
        onConfirm:function(){
            this.isShow =false;
            $('.pop-mask').hide();
        },
        onClose:function(){
            this.isShow =false;
            $('.pop-mask').hide();
        }
    }
})