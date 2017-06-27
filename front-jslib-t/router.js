
require('avalon')
require('mmRouter')

function add (path,jspath,vm){

  avalon.router.add(path, function(){

    var path = this.path;
    var query = this.query;
    var params = this.params;
    var vm  = this.vm;

    avalon.log("router  path:" + this.path + ", mode:" + this.modepath +", query:"+ this.query + ", params:" +  this.params);

    if(this.modepath){
    	require([this.modepath],function(module){

    		vm.view = module._template_;

    		module.path = path;
    		module.query = query;
    		module.params = params;

    		if( module.init)
    		      module.init();
    	})

    }else{
    	//to 404
    	avalon.log("404 not found")

    }

 },{"modepath":jspath,"vm":vm})

}

module.exports.add = add
