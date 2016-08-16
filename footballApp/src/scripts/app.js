//引入spa类库
require("./lib/spa.min");

//引入swiper类库
require("./lib/swiper-3.3.1.min");
//引入视图文件
require("./views/index");
require("./views/home");
require("./views/find");
require("./views/my");
require("./views/guide");
require("./views/detail");
require("./views/my_con");


SPA.config({
	indexView:"index"
})

console.log("hello index")