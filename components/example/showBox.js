define(["css!./showBox.scss"], function () {
   avalon.component('ms-modal', {
    template: require('text!./showBox.html'),
    defaults: {
        title: 'modal',
        isShow:false,
        cbProxy: function (ok) {
            var cbName = ok ? 'onOk': 'onCancel' 
            if (this.hasOwnProperty(cbName)) {
                var ret = this[cbName]()
                if (ret !== false || (ret && typeof ret.next === 'function')) {
                    this.isShow = false
                }
            } else {
                this.isShow = false
            }
        },
        onReady: function(){
            var el = this.$element
            // el.style.display = 'none'//强制阻止动画发生
            
            this.$watch('isShow', function(a,b){
                if(a){
                   document.body.style.overflow = 'hidden' 
                }else{
                   document.body.style.overflow = ''
                }
            })
        }
    },
    soleSlot: 'content'
})
});