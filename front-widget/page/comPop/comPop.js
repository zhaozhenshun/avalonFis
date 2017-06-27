
require('avalon');
avalon.component('ms-comPop',{
    template:__inline('./comPop.html'),
    defaults:{
        title:'弹窗标题',
        isShow:false,
        onConfirm:function(){

        },
        onClose:function(){
            this.isShow =false;
        }
    }
})