;(function($){
    $.fn.menu = function(options){
        var defaults = {
            eventType1:options.eventType1 || 'mouseover',
            eventType2:options.eventType2 || 'mouseout',
            data:options.data || []
        }
        this.each(function(){
            var $this = $(this);
            var $ul = $('<ul class="menuUl"></ul>');
            $this.append($ul);
            renderList($ul,defaults.data);
            $this.find('.menuLi').mouseover(function(event){
                $(this).children('.menuDiv').show();
            })
            $this.find('.menuLi').mouseout(function(event){
                $(this).children('.menuDiv').show();
            })
        })
        function renderList($dom,data){
            $.each(data,function(index,item){
                var $li = $('<li class="menuLi"></li>');
                var $span = $('<span class="menuSpan">'+item.title+'</span>');
                var $i = $('<i></i>');
                var $div = $('<div class="menuDiv"><ul class="menuUl"></ul></div>');
                $li.append($span);
                $li.append($i);
                if(item.children && item.children.length>0){
                    $li.append($div);
                    renderList($div.find('.menuUl'),item.children);
                }else{
                    $li.addClass('no-data');
                }
                $dom.append($li);
            });
            // $dom.children('.menuLi').bind(defaults.eventType1,function(event){
            //     $(this).children('.menuDiv').show();
            // })
            // $dom.children('.menuLi').bind(defaults.eventType2,function(event){
            //     $(this).children('.menuDiv').hide();
            // })
        }
    }
})(jQuery);