$(function(){
    var app = {
        // 程序初始化调用
        init:function(){
            this.events();
            // 初始化的时候选中首页
            $('.nav-tab .coption').eq(0).click();
        },
        // 事件绑定
        events:function(){
            var self = this;
            // nav导航hover事件
            $('.nav-tab .coption').hover(function(event){
                var name = $(this).find('.title').text();
                if(!$(this).hasClass('selected') && commonData.isHover){
                    $(this).find('.nav-tab-list').show();
                    switch (name){
                        case '走进汉邦':
                            commonData.menus = {
                                img:'../image/首页/首页-head-走进汉邦.jpg',
                                name:'走进汉邦',
                                data:[
                                    {title:'关于汉邦'},
                                    {title:'汉邦理念'},
                                    {title:'荣誉资质'},
                                    {title:'发展历程'},
                                ]
                            }
                            break;
                        case '汉邦资讯':
                            commonData.menus = {
                                img:'../image/首页/汉邦资讯.jpg',
                                name:'汉邦资讯',
                                data:[
                                    {title:'汉邦动态'},
                                    {title:'行业动态'},
                                ]
                            }
                            break;
                        case '产品中心':
                            commonData.menus = {
                                img:'../image/首页/产品中心.jpg',
                                name:'产品中心',
                                data:[
                                    {
                                        title:'液相色谱系统',
                                        children:[
                                            {
                                                title:'实验室高效液相色谱系统',
                                                childern:[
                                                    {title:'分析型'},
                                                    {title:'半制备'},
                                                    {title:'制备型'}
                                                ]
                                            },
                                            {title:'工业制备液相色谱系统'}
                                        ]
                                    },
                                    {title:'生物制药下游纯化设备'},
                                    {title:'超临界流体色谱系统'},
                                    {title:'溶剂回收'},
                                    {title:'制药工程整体解决方案'},
                                    {title:'耗材及配件'}
                                ]
                            }
                            break;
                        case '解决方案':
                            $(this).find('.nav-tab-list').hide();
                            break;
                        case '联系我们':
                            commonData.menus = {
                                img:'../image/联系我们/加入汉邦.jpg',
                                name:'联系我们',
                                data:[
                                    {title:'加入汉邦'},
                                    {title:'联系我们'}
                                ]
                            }
                            break;
                    }
                    self.renderMenus(commonData.menus);
                }
            },function(event){
                $(this).find('.nav-tab-list').hide()
            })
            // nav导航的tab切换事件
            $(document).on('click','.nav-tab .coption',function(event){
                var name = $(this).find('.title').text();
                $(this).addClass('selected').siblings().removeClass('selected');
                // tpl命名规则都是前四位中文首字母，tab切换便于匹配到相应的模板
                if(name == '首页'){
                    commonData.isHover = true
                }else{
                    commonData.isHover = false
                    $(this).find('.nav-tab-list').hide();
                }
                switch(name){
                    case '首页':
                        commonData.mainLeftList = {};
                        self.renderHomePage();
                        break;
                    case '走进汉邦':
                        commonData.mainLeftList = {
                            image:'../image/走进汉邦/icon-走进汉邦.png',
                            English:'INTO HANBON',
                            parent:'走进汉邦',
                            data:[
                                {name:'关于汉邦',tpl:'gyhb',selected:true},
                                {name:'汉邦理念',tpl:'hbln',selected:false},
                                {name:'荣誉资质',tpl:'ryzz',selected:false},
                                {name:'发展历程',tpl:'fzlc',selected:false},
                            ]
                        };
                        self.renderMainLeftTab(commonData.mainLeftList);
                        break;
                    case '汉邦资讯':
                        commonData.mainLeftList = {
                            image:'../image/汉邦资讯/icon-汉邦资讯.png',
                            English:'HANBON NEWS',
                            parent:'汉邦资讯',
                            data:[
                                {name:'汉邦动态',tpl:'hbdt',selected:true},
                                {name:'行业动态',tpl:'hydt',selected:false},
                            ]
                        };
                        self.renderMainLeftTab(commonData.mainLeftList);
                        break;
                    case '产品中心':
                        commonData.mainLeftList = {
                            image:'../image/产品中心/icon-产品中心.png',
                            English:'PRODUCT CENTER',
                            parent:'产品中心',
                            data:[
                                {name:'液相色谱系统',tpl:'yxsp',selected:true,},
                                {name:'生物制药下游纯化设备',tpl:'swzy',selected:false},
                                {name:'连续色谱系统',tpl:'lxsp',selected:false},
                                {name:'超临界流体色谱系统',tpl:'clj',selected:false},
                                {name:'溶剂回收',tpl:'rjhs',selected:false},
                                {name:'制药工程整体解决方案',tpl:'zygc',selected:false},
                                {name:'药材及配件',tpl:'ycpj',selected:false}
                            ]
                        };
                        self.renderMainLeftTab(commonData.mainLeftList);
                        break;
                    case '解决方案':
                        commonData.mainLeftList = {

                        };
                        $('.main-container .main-cont').html('<h1 style="text-align:center;margin:100px 0 200px;">暂无数据</h1>');
                        break;
                    case '联系我们':
                        commonData.mainLeftList = {
                            image:'../image/联系我们/icon-联系我们.png',
                            English:'CONTACT US',
                            parent:'联系我们',
                            data:[
                                {name:'加入汉邦',tpl:'jrhb',selected:true},
                                {name:'联系我们',tpl:'lxwm',selected:false},
                            ]
                        }
                        self.renderMainLeftTab(commonData.mainLeftList);
                        break; 
                }
            })
            // 页面中部左侧的tab切换事件
            $(document).on('click','.main-container .main-left li',function(event){
                $(this).addClass('selected').siblings().removeClass('selected');
                var tplName = $(this).data('tpl'),
                    name = $(this).find('span:eq(0)').text(),
                    parent = $(this).parent().siblings('.logo').find('h1 span').text(),
                    data = {};
                data.tpl = tplName;
                data.name = name;
                data.parent = parent;
                self.renderTpl(data);
            })
            // 点击汉邦资讯中的行业动态的标题跳转到详情
            $(document).on('click','.hydt .content li',function(event){
                $('.main-right .hydt').html(Handlebars.compile($('#newsDetail').html()));
            })
            // 点击联系我们的职位详情
            $(document).on('click','.jrhb .content .cont a',function(event){
                $('.contactDetail').show();
                $('.contactDetail .content').fadeIn();
            })
            // 关闭职位详情
            $(document).on('click','.contactDetail .ft a',function(event){
                $('.contactDetail .content').fadeOut();
                $('.contactDetail').hide();
            })
        },
        // 首页中导航下面的菜单
        renderMenus:function(res){
            $('.nav-container .nav-tab-list').html(Handlebars.compile($('#navTabList').html())(res));
            $('.nav-container .nav-tab-list .tab-right').menu({
                data:res.data
            })
        },
        // 首页:注意这里是将模板写到了index.html里，和下面的引入是一样的，供选择
        renderHomePage:function(){
            $('.main-container').html(Handlebars.compile($('#homePage').html()));
            $(".slide-container").xmSlide({
                // width:'100%',
                height: 600,
                responsiveWidth:710,
                pagination: {
                    effect: "fade"  //可换成"slide"
                },
                effect: {
                    fade: {
                        speed: 400
                    }
                },
                play: {
                    effect: "fade", //可换成"slide"
                    interval: 4000,
                    auto: true,
                    pauseOnHover: true,
                    restartDelay: 2500
                }
            });
            $(".product-slide").xmSlide({
                height:354,
                responsiveWidth:710,
                pagination: {
                    effect: "slide"  //可换成"slide"
                },
                effect: {
                    fade: {
                        speed: 400
                    }
                },
                play: {
                    effect: "slide", //可换成"slide"
                    interval: 4000,
                    auto: true,
                    pauseOnHover: true,
                    restartDelay: 2500
                }
            });
        },
        // 渲染页面中部左侧tab切换
        renderMainLeftTab:function(data){
            $.get('/template/main_left_tab.tpl',function(res){
                $('.main-container').html('');
                $('.main-container').append('<div class="main-cont"><div class="main-left"></div><div class="main-right"></div></div>');
                $('.main-container .main-cont .main-left').html(Handlebars.compile(res)(data));
                // 默认情况下，中间左侧tab选中第一个
                $('.main-container .main-cont .main-left ul li').eq(0).click();
            })
        },
        // 中间左侧的tab切换相应右侧的模板
        renderTpl:function(data){
            var self = this;
            $.get('/template/'+data.tpl+'.tpl',function(res){
                $('.main-container .main-cont .main-right').html('');
                $('.main-container .main-cont .main-right').html(Handlebars.compile(res)(data));
                self.initHbdtPage($('#hbdtPage'),50,1);
                self.initHbdtPage($('#hydtPage'),50,1);
            })
        },
        // 汉邦动态中的分页
        // total:总数；currentPage初始化的时候的页码数，可以固定传1
        initHbdtPage:function($dom,total,currentPage){
            $dom.initPage(total,currentPage,function(m){
                alert(m);
            })
        }
    };
    // 公用的数据
    var commonData = (function(){
        var data = {
            mainLeftList:null,//左侧菜单
            menus:[],//首页头部菜单
            isHover:false
        };
        return data;
    }());
    app.init();
})