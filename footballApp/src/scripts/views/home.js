var homeTpl=require("../templates/home.string");

//引入util文件
var util=require("../util/util");

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.livedata=[];
		}
	}],
	init:{
		vm:null,
		livelistArr:[],
		homeSwiper:null,
		hotSwiper:null,
		formatData:function(data){
			var tempArr=[];
			for(var i = 0,len = Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[2*i]);
				tempArr[i].push(data[2*i+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{
		beforeShow:function(){
			//获取视图
			var that = this;
			//获取vm
			that.vm=this.getVM();
			$.ajax({
				//url:"/footballApp/mock/livelist.json",
				url:"api/getLivelist.php",
				type:"get",
				data:{
					rtype:"origin"
				},
				success:function(rs){
					//将JSON数据挂接到VM上
					that.livelistArr = rs.data;
					that.vm.livedata = that.formatData(rs.data);
				},
				error:function(){
					console.log("请求失败");
				}


			})
		},
		show:function(){
			var that = this;
			this.hotSwiper=new Swiper("#swiper-hot",{
				loop:false,
				onSlideChangeStart:function(swiper){
					var index=swiper.activeIndex;
					//console.log(index);
					var $tags=$("#hot-slide li");
					util.setFocus($tags.eq(index));
				}
			}),
			this.homeSwiper=new Swiper("#swiper-slide",{
				loop:false,
				onSlideChangeStart:function(swiper){
					var index=swiper.activeIndex;
					//console.log(index);
					var $tags=$(".m-home nav li");
					util.setFocus($tags.eq(index));
				}
			})


			// 下拉刷新--上拉加载
        	var myScroll = this.widgets.homeListScroll;
  	
        	var scrollSize = 30;
  	
        	myScroll.scrollBy(0,-scrollSize);
  	
        	var head=$(".head img"),
        	    topImgHasClass=head.hasClass("up");
        	var foot=$(".foot img"),
        	    bottomImgHasClass=head.hasClass("down");
        	myScroll.on("scroll",function(){
        	  var y=this.y,
        	      maxY=this.maxScrollY-y;
        	      if(y>=0){
        	           !topImgHasClass && head.addClass("up");
        	           return "";
        	      }
        	      if(maxY>=0){
        	           !bottomImgHasClass && foot.addClass("down");
        	           return "";
        	      }
        	})
  	
        	myScroll.on("scrollEnd",function(){
        	  if(this.y>=-scrollSize && this.y<0){
        	        myScroll.scrollTo(0,-scrollSize);
        	        head.removeClass("up");
        	  }else if(this.y>=0){
        	        head.attr("src","/footballApp/images/ajax-loader.gif");
        	      
        	         $.ajax({
        	            //url:"/footballApp/mock/livelist.json",  mock数据
        	            url:"/api/getLivelist.php",
        	            type:"get",
        	            data:{
        	               rtype:"refresh"
        	            },
        	            success:function(rs){
        	             /*  var arr = that.livelistArr.concat(rs.data);
        	               that.vm.livedata = that.formatData(arr);
        	               that.livelistArr = arr;*/
  	
        	               that.livelistArr = rs.data.concat(that.livelistArr);
        	               that.vm.livedata = that.formatData(that.livelistArr);   
        	               //console.log(that.vm.livedata);
  							myScroll.scrollTo(0,-scrollSize);
        	            	head.removeClass("up");
        	            	head.attr("src","/footballApp/images/arrow.png");
        	              
        	            }
        	        })


        	      /*setTimeout(function(){
        	            myScroll.scrollTo(0,-scrollSize);
        	            head.removeClass("up");
        	            head.attr("src","/footballApp/images/arrow.png");
        	      },1000)*/
        	  }
        	  var maxY=this.maxScrollY-this.y;
        	  var self=this;
        	  if(maxY>-scrollSize && maxY<0){
        	        myScroll.scrollTo(0,self.maxScrollY+scrollSize);
        	        foot.removeClass("down")
        	        console.log("refresh");
        	  }else if(maxY>=0){
        	      foot.attr("src","/footballApp/images/ajax-loader.gif")
        	        // 请求加载数据
        	        $.ajax({
        	            //url:"/footballApp/mock/livelist.json",  mock数据
        	            url:"/api/getLivelist.php",
        	            type:"get",
        	            data:{
        	               rtype:"more"
        	            },
        	            success:function(rs){
        	             /*  var arr = that.livelistArr.concat(rs.data);
        	               that.vm.livedata = that.formatData(arr);
        	               that.livelistArr = arr;*/
  	
        	               that.livelistArr = that.livelistArr.concat(rs.data);
        	               that.vm.livedata = that.formatData(that.livelistArr);   
        	               //console.log(that.vm.livedata);
  	
        	               myScroll.refresh();
        	               myScroll.scrollTo(0,self.y+self.maxScrollY);
        	               foot.removeClass("down");
        	               foot.attr("src","/footballApp/images/arrow.png")
        	            }
        	        })
        	  }
        	})



		}
	},
	bindActions:{
		"tab.slider":function(e){
			var index=$(e.el).index();
			this.homeSwiper.slideTo(index);
		},
		"hot-slider":function(e){
			var index=$(e.el).index();
			this.hotSwiper.slideTo(index);
		},
        "goto.detail":function(){
            console.log(1);
            SPA.open("detail");
        }
	}
})