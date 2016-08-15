var detailTpl=require("../templates/detail.string");
SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.imgsrc = null;
			vm.title = null;
			vm.description = null;
		}
	}],
	bindEvents:{

		show:function(){
			var vm = this.getVM();
			//var d = this.param.data;
			$.ajax({
				url:"/footballApp/mock/liveDetail.json",
				data:{

				},
				success:function(rs){
					var data = rs.data;
					 vm.imgsrc = data.imgsrc;
					 vm.title = data.title;
					 vm.description = data.description;
				}
			})
		}
	},
	bindActions:{
		"goto.back":function(){
            SPA.open("index")
        }
	}
})