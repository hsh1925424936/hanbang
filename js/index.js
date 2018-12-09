$(function(){
    var app = {
        // 程序初始化调用
        init:function(){
            this.events();
            // 初始化的时候选中产品中心
            $('.nav-tab .coption').eq(2).click();
        },
        // 事件绑定
        events:function(){
            var self = this;
            // nav导航的tab切换事件
            $(document).on('click','.nav-tab .coption',function(event){
                var name = $(this).text();
                $(this).addClass('selected').siblings().removeClass('selected');
                // tpl命名规则都是前四位中文首字母，tab切换便于匹配到相应的模板
                switch(name){
                    case '首页':
                        commonData.mainLeftList = {
                            
                        };
                        break;
                    case '走进汉邦':
                        commonData.mainLeftList = {
                            "image":'',
                            "data":[
                                {name:'关于汉邦',tpl:'gyhb',selected:true,parent:'走进汉邦'},
                                {name:'汉邦理念',tpl:'hbln',selected:false,parent:'走进汉邦'},
                                {name:'荣誉资质',tpl:'ryzz',selected:false,parent:'走进汉邦'},
                                {name:'发展历程',tpl:'fzlc',selected:false,parent:'走进汉邦'},
                            ]
                        };
                        break;
                    case '汉邦资讯':
                        commonData.mainLeftList = {
                            "image":'',
                            "data":[
                                {name:'汉邦动态',tpl:'hbdt',selected:true,parent:'汉邦资讯'},
                                {name:'行业动态',tpl:'hydt',selected:false,parent:'汉邦资讯'},
                            ]
                        };
                        break;
                    case '解决方案':
                        commonData.mainLeftList = {

                        };
                        break;
                    case '联系我们':
                        commonData.mainLeftList = {
                            "image":'',
                            "data":[
                                {name:'加入汉邦',tpl:'jrhb',selected:true,parent:'联系我们'},
                                {name:'联系我们',tpl:'lxwm',selected:false,parent:'联系我们'},
                            ]
                        }
                        break; 
                    case '产品中心':
                        commonData.mainLeftList = {
                            "image":'',
                            "data":[
                                {name:'液相色谱系统',tpl:'yxsp',selected:true,parent:'产品中心'},
                                {name:'生物制药下游纯化设备',tpl:'swzy',selected:false,parent:'产品中心'},
                                {name:'连续色谱系统',tpl:'lxsp',selected:false,parent:'产品中心'},
                                {name:'超临界流体色谱系统',tpl:'clj',selected:false,parent:'产品中心'},
                                {name:'溶剂回收',tpl:'rjhs',selected:false,parent:'产品中心'},
                                {name:'制药工程整体解决方案',tpl:'zygc',selected:false,parent:'产品中心'},
                                {name:'药材及配件',tpl:'ycpj',selected:false,parent:'产品中心'}
                            ]
                        };
                        break;
                }
                self.renderMainLeftTab(commonData.mainLeftList);
            })
            // 页面中部左侧的tab切换事件
            $(document).on('click','.main-container .main-left li',function(event){
                $(this).addClass('selected').siblings().removeClass('selected');
                var tplName = $(this).data('tpl'),
                    name = $(this).find('span:eq(0)').text(),
                    parent = $(this).data('parent'),
                    data = {};
                data.tpl = tplName;
                data.name = name;
                data.parent = parent;
                self.renderTpl(data);
            })
        },
        // 渲染页面中部左侧tab切换
        renderMainLeftTab:function(data){
            $.get('/template/main_left_tab.tpl',function(res){
                $('.main-container .main-left').html('');
                $('.main-container .main-right').html('');
                $('.main-container .main-left').html(Handlebars.compile(res)(data));
                // 默认情况下，中间左侧tab选中第一个
                $('.main-container .main-left ul li').eq(0).click();
            })
        },
        // 中间左侧的tab切换相应右侧的模板
        renderTpl:function(data){
            var self = this;
            $.get('/template/'+data.tpl+'.tpl',function(res){
                $('.main-container .main-right').html('');
                $('.main-container .main-right').html(Handlebars.compile(res)(data));
                self.initHbdtPage(50,1);
            })
        },
        // 汉邦动态中的分页
        // total:总数；currentPage初始化的时候的页码数，可以固定传1
        initHbdtPage:function(total,currentPage){
            $('#hbdtPage').initPage(total,currentPage,function(m){
                alert(m);
            })
        }
    };
    // 公用的数据
    var commonData = (function(){
        var data = {
            mainLeftList:null,
        };
        return data;
    }());
    app.init();
})