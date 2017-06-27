
require('avalon');
avalon.component('ms-smallbox',{
    template:__inline('./smallBox.html'),
    defaults:{
        title:'提示',
        icon:'yes', //yes正确、no错误、notice提示,有其他的再加
        info:'提示语',
        isShow:false,
        btnMes:'确定',
        onConfirm:function($event){
            this.isShow =false;
            $('.pop-mask').hide();
        },
        onClose:function(){
            this.isShow =false;
            $('.pop-mask').hide();
        }
    }
})