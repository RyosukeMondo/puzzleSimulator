$(function(){
    /*<iframe src="../puzzles/bubbloid/bubbloid.html" name="sample" width="1000" height="1285">
    この部分はインラインフレームを使用しています。
    </iframe>
     <iframe src="../puzzles/mixupplus444/mixupplus444.html" name="sample" width="1000" height="1285">
     この部分はインラインフレームを使用しています。
     </iframe>

    */

    $('div.post>h2.title').click(function(){
        var $entry = $(this).parent().children('.entry');
        var name = $(this).children('a').html();
        name = name.replace(' ','').replace(' ','').replace(' ','');
        var $iframe = $entry.children('iframe');
        if( $iframe.attr('src') == undefined) {
            $iframe.attr('src','puzzles/'+name+'/'+name+'.html')
                .attr('name',name)
                .attr('width','1000')
                .attr('height','1285');
        }
        $entry.slideToggle();
        var $span = $(this).children('span');
        if( $span.html() == "+" ) {
            $span.html('-');
        } else {
            $span.html('+');
        }
    });
    $('div.post>h2.title').css('cursor','pointer');
});
