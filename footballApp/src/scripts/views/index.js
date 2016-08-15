var indexTpl=require("../templates/index.string");
//引入util文件
var util=require("../util/util");
SPA.defineView("index",{
	//定义html
	html:indexTpl,
	//引用delegated插件，用于定义tap
	plugins:["delegated"],
	//定义子视图
	modules:[{
		name:"content",//子视图的名称，用于引用的句柄
		defaultTag:"home",//默认显示的视图
		views:["home","find","my"],//定义子视图集
		container:".m-index"//主视图的容器(将子视图中的内容渲染到主视图的容器中)
	}],
	//绑定视图事件
	bindEvents:{
		//视图显示出来之前执行的回调函数
		beforeShow:function(){

		},
		//视图显示出来之后执行的回调函数
		show:function(){
			//console.log(Swiper);
		}
	},
	//绑定元素事件
	bindActions:{
		"switch.tabs":function(e,data){
			//点击页脚增加高亮   这里的e为object   通过e.el添加高亮
			util.setFocus($(e.el));
			//this是对当前视图的引用
			this.modules.content.launch(data.tag);
		
		},
		"goto.my":function(){
			SPA.open("my",{
				ani:{
					name:"dialog",
					width:300,
					height:200
				}
			});
		}
	}

})




/*var myScroll;

function loaded () {
	myScroll = new IScroll('#listScroller', { mouseWheel: true, tap: true });

	document.getElementById('me').addEventListener('tap', function () {
		this.style.background = !this.style.background ? '#a00' : '';
	}, false);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
window.onload=function(){
	loaded()
}*/